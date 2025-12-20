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

/**
 * Generate a cryptographically secure random string
 */
function generateState(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
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
  const { authMethod = 'body' } = config

  const stateKey = (state: string) => `${namespace}:${STATE_PREFIX}${state}`
  const tokensKey = (key: string) => `${namespace}:${TOKENS_PREFIX}${key}`

  async function getAuthorizationUrl(options?: {
    state?: string
    scopes?: string[]
  }): Promise<{ url: string; state: string }> {
    const state = options?.state ?? generateState()
    const scopes = options?.scopes ?? config.scopes ?? []

    // Store state for validation
    const oauthState: OAuthState = {
      state,
      createdAt: Date.now(),
    }
    await storage.set(stateKey(state), oauthState, STATE_TTL)

    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      state,
    })

    if (scopes.length > 0) {
      params.set('scope', scopes.join(' '))
    }

    return {
      url: `${config.authorizationUrl}?${params.toString()}`,
      state,
    }
  }

  async function exchangeCode(
    code: string,
    state: string,
  ): Promise<OAuthTokens> {
    // Validate state
    const storedState = await storage.get<OAuthState>(stateKey(state))
    if (!storedState) {
      throw new TriggersError('Invalid or expired OAuth state')
    }

    // Clean up state
    await storage.delete(stateKey(state))

    // Exchange code for tokens
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirectUri,
    })

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    }

    if (authMethod === 'header') {
      const credentials = btoa(`${config.clientId}:${config.clientSecret}`)
      headers.Authorization = `Basic ${credentials}`
    } else {
      params.set('client_id', config.clientId)
      params.set('client_secret', config.clientSecret)
    }

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers,
      body: params.toString(),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new TriggersError(`OAuth token exchange failed: ${error}`)
    }

    const data = await response.json()
    return normalizeTokens(data)
  }

  async function refreshAccessToken(
    refreshToken: string,
  ): Promise<OAuthTokens> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    }

    if (authMethod === 'header') {
      const credentials = btoa(`${config.clientId}:${config.clientSecret}`)
      headers.Authorization = `Basic ${credentials}`
    } else {
      params.set('client_id', config.clientId)
      params.set('client_secret', config.clientSecret)
    }

    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers,
      body: params.toString(),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new TriggersError(`OAuth token refresh failed: ${error}`)
    }

    const data = await response.json()
    return normalizeTokens(data)
  }

  async function getTokens(key: string): Promise<OAuthTokens | null> {
    const tokens = await storage.get<OAuthTokens>(tokensKey(key))
    if (!tokens) return null

    // Check if tokens are expired and need refresh
    if (tokens.expiresAt && tokens.expiresAt <= Date.now()) {
      if (tokens.refreshToken) {
        try {
          const newTokens = await refreshAccessToken(tokens.refreshToken)
          await storeTokens(key, newTokens)
          return newTokens
        } catch {
          // Refresh failed, return null
          await storage.delete(tokensKey(key))
          return null
        }
      }
      // No refresh token, token is expired
      await storage.delete(tokensKey(key))
      return null
    }

    return tokens
  }

  async function storeTokens(
    key: string,
    tokens: OAuthTokens,
    ttl?: number,
  ): Promise<void> {
    await storage.set(tokensKey(key), tokens, ttl)
  }

  async function deleteTokens(key: string): Promise<void> {
    await storage.delete(tokensKey(key))
  }

  async function hasValidTokens(key: string): Promise<boolean> {
    const tokens = await getTokens(key)
    return tokens !== null
  }

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

/**
 * Normalize OAuth token response to standard format
 */
function normalizeTokens(data: Record<string, unknown>): OAuthTokens {
  const expiresIn =
    typeof data.expires_in === 'number' ? data.expires_in : undefined
  const expiresAt = expiresIn ? Date.now() + expiresIn * 1000 : undefined

  return {
    accessToken: data.access_token as string,
    refreshToken: data.refresh_token as string | undefined,
    expiresIn,
    expiresAt,
    tokenType: data.token_type as string | undefined,
    scope: data.scope as string | undefined,
  }
}
