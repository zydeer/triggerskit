import * as sha2 from '@oslojs/crypto/sha2'
import * as encoding from '@oslojs/encoding'
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
 * PKCE parameters for OAuth 2.0 (RFC 7636).
 */
export interface PKCEParams {
  /** The code challenge derived from code_verifier */
  codeChallenge: string
  /** The code challenge method (S256 or plain) */
  codeChallengeMethod: 'S256' | 'plain'
}

/**
 * Defines how to perform OAuth for a specific provider.
 */
export interface OAuthFlow<TTokens extends OAuthTokens = OAuthTokens> {
  /**
   * Build the authorization URL users will be redirected to.
   * @param state - The state parameter for CSRF protection
   * @param scopes - Optional array of OAuth scopes to request
   * @param pkce - Optional PKCE parameters if PKCE is enabled
   */
  getAuthorizationUrl(
    state: string,
    scopes?: string[],
    pkce?: PKCEParams,
  ): string

  /**
   * Exchange the authorization code for tokens.
   * @param code - The authorization code from the OAuth callback
   * @param codeVerifier - Optional PKCE code verifier if PKCE is enabled
   */
  exchangeCode(code: string, codeVerifier?: string): Promise<TTokens>

  /**
   * Refresh an expired token. Optional - not all providers support refresh.
   * @param refreshToken - The refresh token to use
   */
  refreshToken?(refreshToken: string): Promise<TTokens>
}

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
  /** Namespace for storage keys (e.g., 'github', 'slack') */
  namespace: string
  /** User ID for storing tokens (each user gets isolated tokens) */
  tokenKey: string
  /** Enable PKCE (RFC 7636). Default: false */
  usePKCE?: boolean
}

export interface BaseOAuthConfig {
  /** Storage backend for tokens */
  storage: Storage
}

const STATE_TTL = 600
const STATE_PREFIX = 'oauth:state:'
const TOKENS_PREFIX = 'oauth:tokens:'

interface StoredState {
  state: string
  ts: number
  codeVerifier?: string
}

export function createS256CodeChallenge(codeVerifier: string): string {
  const codeChallengeBytes = sha2.sha256(new TextEncoder().encode(codeVerifier))
  return encoding.encodeBase64urlNoPadding(codeChallengeBytes)
}

export function generateCodeVerifier(): string {
  const randomValues = new Uint8Array(32)
  crypto.getRandomValues(randomValues)
  return encoding.encodeBase64urlNoPadding(randomValues)
}

export function generateState(): string {
  const randomValues = new Uint8Array(32)
  crypto.getRandomValues(randomValues)
  return encoding.encodeBase64urlNoPadding(randomValues)
}

export function createOAuth<TTokens extends OAuthTokens = OAuthTokens>(
  options: OAuthOptions<TTokens>,
): OAuth<TTokens> {
  const { flow, storage, namespace, tokenKey, usePKCE = false } = options

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

      let pkceParams: PKCEParams | undefined
      let codeVerifier: string | undefined

      if (usePKCE) {
        codeVerifier = generateCodeVerifier()
        const codeChallenge = createS256CodeChallenge(codeVerifier)
        pkceParams = {
          codeChallenge,
          codeChallengeMethod: 'S256',
        }
      }

      await storage.set(
        stateKey(state),
        { state, ts: Date.now(), codeVerifier } satisfies StoredState,
        STATE_TTL,
      )

      const url = flow.getAuthorizationUrl(state, opts?.scopes, pkceParams)
      return { url, state }
    },

    async handleCallback(code, state) {
      try {
        const stored = await storage.get<StoredState>(stateKey(state))
        if (!stored) {
          return err({ message: 'Invalid or expired OAuth state' })
        }

        await storage.delete(stateKey(state))
        const tokens = await flow.exchangeCode(code, stored.codeVerifier)
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
    getAuthorizationUrl(state, requestScopes, pkce) {
      const url = new URL(authUrl)
      url.searchParams.set('client_id', clientId)
      url.searchParams.set('redirect_uri', redirectUri)
      url.searchParams.set('response_type', 'code')
      url.searchParams.set('state', state)

      const finalScopes = requestScopes ?? scopes
      if (finalScopes?.length) {
        url.searchParams.set('scope', finalScopes.join(' '))
      }

      if (pkce) {
        url.searchParams.set('code_challenge', pkce.codeChallenge)
        url.searchParams.set('code_challenge_method', pkce.codeChallengeMethod)
      }

      return url.toString()
    },

    async exchangeCode(code, codeVerifier) {
      const bodyParams: Record<string, string> = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      }

      if (codeVerifier) {
        bodyParams.code_verifier = codeVerifier
      }

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(bodyParams),
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
