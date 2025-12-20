import { TriggersError } from '../types/result'
import type {
  OAuthHandler,
  OAuthProviderConfig,
  OAuthState,
  OAuthStorage,
  OAuthTokens,
} from './types'

const STATE_TTL = 600 // 10 minutes for OAuth state
const STATE_PREFIX = 'oauth:state:'
const TOKENS_PREFIX = 'oauth:tokens:'

/** Generate a cryptographically secure random string */
function generateState(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

/** Normalize OAuth token response to standard format */
function normalizeTokens(data: Record<string, unknown>): OAuthTokens {
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

/** Make OAuth token request with proper auth headers */
async function requestTokens(
  tokenUrl: string,
  params: URLSearchParams,
  config: OAuthProviderConfig,
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

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers,
    body: params.toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new TriggersError(`OAuth request failed: ${error}`)
  }

  return normalizeTokens(await response.json())
}

/**
 * Create a reusable OAuth 2.0 handler
 * Provider-agnostic - works with GitHub, Slack, Google, etc.
 */
export function createOAuth(
  config: OAuthProviderConfig,
  storage: OAuthStorage,
  namespace: string,
): OAuthHandler {
  const stateKey = (state: string) => `${namespace}:${STATE_PREFIX}${state}`
  const tokensKey = (key: string) => `${namespace}:${TOKENS_PREFIX}${key}`

  const getAuthorizationUrl: OAuthHandler['getAuthorizationUrl'] = async (
    options,
  ) => {
    const state = options?.state ?? generateState()
    const scopes = options?.scopes ?? config.scopes ?? []

    await storage.set<OAuthState>(
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
      params.set('scope', scopes.join(' '))
    }

    return { url: `${config.authorizationUrl}?${params}`, state }
  }

  const exchangeCode: OAuthHandler['exchangeCode'] = async (code, state) => {
    const stored = await storage.get<OAuthState>(stateKey(state))
    if (!stored) throw new TriggersError('Invalid or expired OAuth state')

    await storage.delete(stateKey(state))

    return requestTokens(
      config.tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
      }),
      config,
    )
  }

  const refreshAccessToken: OAuthHandler['refreshAccessToken'] = (
    refreshToken,
  ) =>
    requestTokens(
      config.tokenUrl,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      config,
    )

  const storeTokens: OAuthHandler['storeTokens'] = (key, tokens, ttl) =>
    storage.set(tokensKey(key), tokens, ttl)

  const deleteTokens: OAuthHandler['deleteTokens'] = (key) =>
    storage.delete(tokensKey(key))

  const getTokens: OAuthHandler['getTokens'] = async (key) => {
    const tokens = await storage.get<OAuthTokens>(tokensKey(key))
    if (!tokens) return null

    // Auto-refresh if expired
    if (tokens.expiresAt && tokens.expiresAt <= Date.now()) {
      if (tokens.refreshToken) {
        try {
          const newTokens = await refreshAccessToken(tokens.refreshToken)
          await storeTokens(key, newTokens)
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
  }

  const hasValidTokens: OAuthHandler['hasValidTokens'] = async (key) =>
    (await getTokens(key)) !== null

  return {
    getAuthorizationUrl,
    exchangeCode,
    refreshAccessToken,
    getTokens,
    storeTokens,
    deleteTokens,
    hasValidTokens,
  }
}
