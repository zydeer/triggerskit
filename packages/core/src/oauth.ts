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
  [key: string]: unknown
}

/**
 * Defines how to perform OAuth for a specific provider.
 * Implement this interface to create custom OAuth flows.
 */
export interface OAuthFlow {
  /** Build the authorization URL users will be redirected to. */
  getAuthorizationUrl(state: string, scopes?: string[]): string

  /** Exchange the authorization code for tokens. */
  exchangeCode(code: string): Promise<OAuthTokens>

  /** Refresh an expired token. Optional - not all providers support refresh. */
  refreshToken?(refreshToken: string): Promise<OAuthTokens>
}

/**
 * OAuth interface returned by createOAuth.
 */
export interface OAuth {
  /** Get the authorization URL to redirect users to. */
  getAuthUrl(options?: {
    state?: string
    scopes?: string[]
  }): Promise<{ url: string; state: string }>

  /** Handle the OAuth callback. Call this when the user returns with a code. */
  handleCallback(
    code: string,
    state: string,
  ): Promise<Result<{ success: true }>>

  /** Check if there are valid tokens stored. */
  isAuthenticated(): Promise<boolean>

  /** Delete stored tokens. */
  revokeTokens(): Promise<void>

  /** Get the current access token. Automatically refreshes if expired. */
  getAccessToken(): Promise<string | null>

  /** Get all stored tokens. */
  getTokens(): Promise<OAuthTokens | null>

  /** Store tokens manually. */
  storeTokens(tokens: OAuthTokens): Promise<void>
}

export interface OAuthOptions {
  flow: OAuthFlow
  storage: Storage
  namespace: string
  tokenKey?: string
}

export interface StandardOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  authUrl: string
  tokenUrl: string
  scopes?: string[]
}

const STATE_TTL = 600
const STATE_PREFIX = 'oauth:state:'
const TOKENS_PREFIX = 'oauth:tokens:'

function generateState(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Normalize a snake_case token response to camelCase OAuthTokens.
 */
export function normalizeTokens(data: Record<string, unknown>): OAuthTokens {
  const expiresIn =
    typeof data.expires_in === 'number' ? data.expires_in : undefined

  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string | undefined,
    expiresIn,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
    tokenType: data.token_type as string | undefined,
    scope: data.scope as string | undefined,
  }
}

/**
 * Create an OAuth handler from a flow definition.
 *
 * @example
 * ```ts
 * const oauth = createOAuth({
 *   flow: standardOAuthFlow({ clientId, clientSecret, redirectUri, authUrl, tokenUrl }),
 *   storage: memoryStorage(),
 *   namespace: 'github',
 * })
 *
 * const { url } = await oauth.getAuthUrl()
 * await oauth.handleCallback(code, state)
 * const token = await oauth.getAccessToken()
 * ```
 */
export function createOAuth(options: OAuthOptions): OAuth {
  const { flow, storage, namespace, tokenKey = 'default' } = options

  const stateKey = (state: string) => `${namespace}:${STATE_PREFIX}${state}`
  const tokensKey = () => `${namespace}:${TOKENS_PREFIX}${tokenKey}`

  const getTokens = async (): Promise<OAuthTokens | null> => {
    const tokens = await storage.get<OAuthTokens>(tokensKey())
    if (!tokens) return null

    if (tokens.expiresAt && tokens.expiresAt <= Date.now()) {
      if (tokens.refreshToken && flow.refreshToken) {
        try {
          const newTokens = await flow.refreshToken(tokens.refreshToken)
          await storage.set(tokensKey(), newTokens)
          return newTokens
        } catch {
          await storage.delete(tokensKey())
          return null
        }
      }
      await storage.delete(tokensKey())
      return null
    }

    return tokens
  }

  return {
    async getAuthUrl(opts) {
      const state = opts?.state ?? generateState()
      await storage.set(stateKey(state), { state, ts: Date.now() }, STATE_TTL)
      const url = flow.getAuthorizationUrl(state, opts?.scopes)
      return { url, state }
    },

    async handleCallback(code, state) {
      try {
        const stored = await storage.get<{ state: string }>(stateKey(state))
        if (!stored) {
          return err({ message: 'Invalid or expired OAuth state' })
        }

        await storage.delete(stateKey(state))
        const tokens = await flow.exchangeCode(code)
        await storage.set(tokensKey(), tokens)

        return ok({ success: true })
      } catch (e) {
        return fail(e)
      }
    },

    async isAuthenticated() {
      const tokens = await getTokens()
      return tokens !== null
    },

    async revokeTokens() {
      await storage.delete(tokensKey())
    },

    async getAccessToken() {
      const tokens = await getTokens()
      return tokens?.accessToken ?? null
    },

    getTokens,

    async storeTokens(tokens) {
      await storage.set(tokensKey(), tokens)
    },
  }
}

/**
 * Create a standard OAuth 2.0 flow. Works for most providers.
 *
 * @example
 * ```ts
 * const flow = standardOAuthFlow({
 *   clientId: 'xxx',
 *   clientSecret: 'xxx',
 *   redirectUri: 'https://app.com/callback',
 *   authUrl: 'https://github.com/login/oauth/authorize',
 *   tokenUrl: 'https://github.com/login/oauth/access_token',
 *   scopes: ['repo', 'user'],
 * })
 * ```
 */
export function standardOAuthFlow(config: StandardOAuthConfig): OAuthFlow {
  const { clientId, clientSecret, redirectUri, authUrl, tokenUrl, scopes } =
    config

  return {
    getAuthorizationUrl(state, requestScopes) {
      const url = new URL(authUrl)
      url.searchParams.set('client_id', clientId)
      url.searchParams.set('redirect_uri', redirectUri)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('state', state)

      const finalScopes = requestScopes ?? scopes
      if (finalScopes?.length) {
        url.searchParams.set('scope', finalScopes.join(' '))
      }

      return url.toString()
    },

    async exchangeCode(code) {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw { message: `Token exchange failed: ${text}` }
      }

      return normalizeTokens(await response.json())
    },

    async refreshToken(refreshToken) {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw { message: `Token refresh failed: ${text}` }
      }

      return normalizeTokens(await response.json())
    },
  }
}
