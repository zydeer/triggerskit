/**
 * OAuth 2.0 token response (standard fields)
 */
export type OAuthTokens = {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  expiresAt?: number
  tokenType?: string
  scope?: string
}

/**
 * Provider-specific OAuth configuration
 */
export type OAuthProviderConfig = {
  /** OAuth authorization endpoint */
  authorizationUrl: string
  /** OAuth token endpoint */
  tokenUrl: string
  /** Client ID */
  clientId: string
  /** Client secret */
  clientSecret: string
  /** Redirect URI */
  redirectUri: string
  /** OAuth scopes */
  scopes?: string[]
  /** How to send client credentials: 'body' | 'header' (default: 'body') */
  authMethod?: 'body' | 'header'
}

/**
 * Minimal storage interface for OAuth (compatible with StorageAdapter)
 */
export type OAuthStorage = {
  get: <T = unknown>(key: string) => Promise<T | null>
  set: <T = unknown>(key: string, value: T, ttl?: number) => Promise<void>
  delete: (key: string) => Promise<void>
}

/**
 * OAuth state for authorization flow
 */
export type OAuthState = {
  state: string
  codeVerifier?: string
  createdAt: number
}

/**
 * OAuth handler returned by createOAuth
 */
export type OAuthHandler = {
  /** Generate authorization URL for user redirect */
  getAuthorizationUrl: (options?: {
    state?: string
    scopes?: string[]
  }) => Promise<{ url: string; state: string }>
  /** Exchange authorization code for tokens */
  exchangeCode: (code: string, state: string) => Promise<OAuthTokens>
  /** Refresh access token using refresh token */
  refreshAccessToken: (refreshToken: string) => Promise<OAuthTokens>
  /** Get stored tokens (auto-refreshes if expired) */
  getTokens: (key: string) => Promise<OAuthTokens | null>
  /** Store tokens */
  storeTokens: (key: string, tokens: OAuthTokens, ttl?: number) => Promise<void>
  /** Delete stored tokens */
  deleteTokens: (key: string) => Promise<void>
  /** Check if tokens exist and are valid */
  hasValidTokens: (key: string) => Promise<boolean>
}
