import { error } from './error'
import type { Result } from './result'
import { err, fail, ok } from './result'
import type { Storage } from './storage'

export interface OAuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  expiresAt?: number
  tokenType?: string
  scope?: string
  [key: string]: unknown // Allow provider-specific fields
}

export interface OAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
  authorizationUrl: string
  tokenUrl: string
  authMethod?: 'body' | 'header'
  scopeSeparator?: string // Default is ' ', but some providers use ','
  additionalAuthParams?: Record<string, string> // For provider-specific auth params
  additionalTokenParams?: Record<string, string> // For provider-specific token params
  tokenResponseTransform?: (
    data: Record<string, unknown>,
  ) => Record<string, unknown>
}

export interface BaseOAuth {
  /** Get authorization URL for OAuth flow */
  getAuthUrl(options?: {
    state?: string
    scopes?: string[]
    additionalParams?: Record<string, string>
  }): Promise<{ url: string; state: string }>
  /** Handle OAuth callback - exchange code for tokens */
  handleCallback(
    code: string,
    state: string,
  ): Promise<Result<{ success: true }>>
  /** Check if OAuth tokens are available and valid */
  isAuthenticated(): Promise<boolean>
  /** Revoke/delete stored tokens */
  revokeTokens(): Promise<void>
}

export interface OAuthClient {
  getAuthUrl(options?: {
    state?: string
    scopes?: string[]
    additionalParams?: Record<string, string>
  }): Promise<{ url: string; state: string }>
  exchangeCode(code: string, state: string): Promise<Result<OAuthTokens>>
  getTokens(key: string): Promise<OAuthTokens | null>
  storeTokens(key: string, tokens: OAuthTokens): Promise<void>
  deleteTokens(key: string): Promise<void>
  hasValidTokens(key: string): Promise<boolean>
}

const STATE_TTL = 600
const STATE_PREFIX = 'oauth:state:'
const TOKENS_PREFIX = 'oauth:tokens:'

function generateState(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

function normalizeTokens(
  data: Record<string, unknown>,
  transform?: (data: Record<string, unknown>) => Record<string, unknown>,
): OAuthTokens {
  const transformed = transform ? transform(data) : data
  const expiresIn =
    typeof transformed.expires_in === 'number'
      ? transformed.expires_in
      : undefined

  const tokens: OAuthTokens = {
    accessToken: transformed.access_token as string,
    refreshToken: transformed.refresh_token as string | undefined,
    expiresIn,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
    tokenType: transformed.token_type as string | undefined,
    scope: transformed.scope as string | undefined,
  }

  // Include any additional fields from the response
  for (const [key, value] of Object.entries(transformed)) {
    if (!(key in tokens) && !key.includes('_')) {
      tokens[key] = value
    }
  }

  return tokens
}

async function requestTokens(
  tokenUrl: string,
  params: URLSearchParams,
  config: OAuthConfig,
): Promise<OAuthTokens> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  }

  if (config.authMethod === 'header') {
    headers.Authorization = `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`
  } else {
    params.set('client_id', config.clientId)
    params.set('client_secret', config.clientSecret)
  }

  // Add any additional token params
  if (config.additionalTokenParams) {
    for (const [key, value] of Object.entries(config.additionalTokenParams)) {
      params.set(key, value)
    }
  }

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers,
    body: params.toString(),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw error(
      `OAuth token request failed: ${errorText}`,
      undefined,
      'OAUTH_ERROR',
    )
  }

  return normalizeTokens(await response.json(), config.tokenResponseTransform)
}

/**
 * Create a standardized OAuth interface for providers
 */
export function createProviderOAuth(
  client: OAuthClient,
  tokenKey: string,
): BaseOAuth {
  return {
    getAuthUrl: (options) => client.getAuthUrl(options),

    async handleCallback(code, state) {
      try {
        const result = await client.exchangeCode(code, state)
        if (!result.ok) return result

        await client.storeTokens(tokenKey, result.data)
        return ok({ success: true })
      } catch (e) {
        return fail(e)
      }
    },

    isAuthenticated: () => client.hasValidTokens(tokenKey),
    revokeTokens: () => client.deleteTokens(tokenKey),
  }
}

export function createOAuthClient(
  config: OAuthConfig,
  storage: Storage,
  namespace: string,
): OAuthClient {
  const stateKey = (state: string) => `${namespace}:${STATE_PREFIX}${state}`
  const tokensKey = (key: string) => `${namespace}:${TOKENS_PREFIX}${key}`

  const refreshAccessToken = (refreshToken: string) =>
    requestTokens(
      config.tokenUrl,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      config,
    )

  return {
    async getAuthUrl(options) {
      const state = options?.state ?? generateState()
      const scopes = options?.scopes ?? config.scopes ?? []

      await storage.set(
        stateKey(state),
        { state, createdAt: Date.now() },
        STATE_TTL,
      )

      const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: 'code',
        state,
      })

      if (scopes.length > 0) {
        const separator = config.scopeSeparator ?? ' '
        params.set('scope', scopes.join(separator))
      }

      // Add any additional auth params
      if (config.additionalAuthParams) {
        for (const [key, value] of Object.entries(
          config.additionalAuthParams,
        )) {
          params.set(key, value)
        }
      }

      // Add any additional params from options
      if (options?.additionalParams) {
        for (const [key, value] of Object.entries(options.additionalParams)) {
          params.set(key, value)
        }
      }

      return { url: `${config.authorizationUrl}?${params}`, state }
    },

    async exchangeCode(code, state): Promise<Result<OAuthTokens>> {
      try {
        const stored = await storage.get<{ state: string }>(stateKey(state))
        if (!stored) {
          return err(
            error('Invalid or expired OAuth state', undefined, 'INVALID_STATE'),
          )
        }

        await storage.delete(stateKey(state))

        const tokens = await requestTokens(
          config.tokenUrl,
          new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: config.redirectUri,
          }),
          config,
        )

        return ok(tokens)
      } catch (e) {
        return fail(e)
      }
    },

    async getTokens(key) {
      const tokens = await storage.get<OAuthTokens>(tokensKey(key))
      if (!tokens) return null

      if (tokens.expiresAt && tokens.expiresAt <= Date.now()) {
        if (tokens.refreshToken) {
          try {
            const newTokens = await refreshAccessToken(tokens.refreshToken)
            await storage.set(tokensKey(key), newTokens)
            return newTokens
          } catch {
            await storage.delete(tokensKey(key))
            return null
          }
        }
        await storage.delete(tokensKey(key))
        return null
      }

      return tokens
    },

    async storeTokens(key, tokens) {
      await storage.set(tokensKey(key), tokens)
    },

    async deleteTokens(key) {
      await storage.delete(tokensKey(key))
    },

    async hasValidTokens(key) {
      return (await this.getTokens(key)) !== null
    },
  }
}
