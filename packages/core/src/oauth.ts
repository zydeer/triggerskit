import type { Result } from './result'
import { err, ok } from './result'
import type { Storage } from './storage'

export interface OAuthTokens {
  /** The access token for API requests */
  accessToken: string
  /** Optional refresh token for obtaining new access tokens */
  refreshToken?: string
  /** Token expiration time in seconds */
  expiresIn?: number
  /** Absolute timestamp (ms) when the token expires */
  expiresAt?: number
  /** Token type (usually 'Bearer') */
  tokenType?: string
  /** Space-delimited list of granted scopes */
  scope?: string
}

/**
 * Defines how to perform OAuth for a specific provider.
 */
export interface OAuthFlow<TTokens extends OAuthTokens = OAuthTokens> {
  /**
   * Build the authorization URL users will be redirected to.
   * @param state - The state parameter for CSRF protection
   * @param scopes - Optional array of OAuth scopes to request
   */
  getAuthorizationUrl(state: string, scopes?: string[]): string

  /**
   * Exchange the authorization code for tokens.
   * @param code - The authorization code from the OAuth callback
   */
  exchangeCode(code: string): Promise<TTokens>

  /**
   * Refresh an expired token. Optional - not all providers support refresh.
   * @param refreshToken - The refresh token to use
   */
  refreshToken?(refreshToken: string): Promise<TTokens>
}

/**
 * OAuth interface returned by createOAuth.
 */
export interface OAuth<TTokens extends OAuthTokens = OAuthTokens> {
  /**
   * Get the authorization URL to redirect users to.
   *
   * @param options - Optional configuration
   * @param options.state - Custom state value for CSRF protection. Auto-generated if not provided.
   * @param options.scopes - OAuth scopes to request. Provider-specific.
   * @returns Object containing:
   *   - `url`: The full authorization URL to redirect the user to
   *   - `state`: The state value to verify on callback
   */
  getAuthUrl(options?: {
    state?: string
    scopes?: string[]
  }): Promise<{ url: string; state: string }>

  /**
   * Handle the OAuth callback. Call this when the user returns with a code.
   * @param code - The authorization code from the OAuth provider
   * @param state - The state value to verify against stored state
   * @returns Result indicating success or error with message
   */
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
  getTokens(): Promise<TTokens | null>

  /**
   * Store tokens manually.
   * @param tokens - The OAuth tokens to store
   */
  storeTokens(tokens: TTokens): Promise<void>
}

export interface OAuthOptions<TTokens extends OAuthTokens = OAuthTokens> {
  /** The OAuth flow implementation for the provider */
  flow: OAuthFlow<TTokens>
  /** Storage backend for tokens and state */
  storage: Storage
  /** Namespace for storage keys to avoid collisions */
  namespace: string
  /** Custom key for storing tokens (defaults to 'default') */
  tokenKey?: string
}

export interface BaseOAuthConfig {
  /** Storage backend for tokens */
  storage: Storage
  /** Custom key for storing tokens (default varies by provider) */
  tokenKey?: string
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
 * Create an OAuth handler from a flow definition.
 */
export function createOAuth<TTokens extends OAuthTokens = OAuthTokens>(
  options: OAuthOptions<TTokens>,
): OAuth<TTokens> {
  const { flow, storage, namespace, tokenKey = 'default' } = options

  const stateKey = (state: string) => `${namespace}:${STATE_PREFIX}${state}`
  const tokensKey = () => `${namespace}:${TOKENS_PREFIX}${tokenKey}`

  const getTokens = async (): Promise<TTokens | null> => {
    const tokens = await storage.get<TTokens>(tokensKey())
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
        return err(e)
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

interface StandardOAuthConfig {
  /** OAuth client ID from the provider */
  clientId: string
  /** OAuth client secret from the provider */
  clientSecret: string
  /** Redirect URI registered with the provider */
  redirectUri: string
  /** Provider's authorization endpoint URL */
  authUrl: string
  /** Provider's token exchange endpoint URL */
  tokenUrl: string
  /** Default scopes to request */
  scopes?: string[]
}

/**
 * Create a standard OAuth 2.0 flow.
 */
export function standardOAuthFlow(
  config: StandardOAuthConfig,
): OAuthFlow<OAuthTokens> {
  const { clientId, clientSecret, redirectUri, authUrl, tokenUrl, scopes } =
    config

  const normalizeTokens = (data: any): OAuthTokens => {
    const expiresIn =
      typeof data.expires_in === 'number' ? data.expires_in : undefined

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn,
      expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
      tokenType: data.token_type,
      scope: data.scope,
    }
  }

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
