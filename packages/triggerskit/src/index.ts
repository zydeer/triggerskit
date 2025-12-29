import type {
  OAuthProvider,
  Provider,
  WebhookContext,
  WebhookPayload,
} from '@triggerskit/core/provider'
import type { Result } from '@triggerskit/core/result'

type ProvidersMap = Record<string, Provider | OAuthProvider>

/**
 * The result of processing a webhook request.
 * Contains the provider name and the parsed webhook payload.
 */
type WebhookResult<T extends ProvidersMap> = {
  [K in keyof T & string]: {
    /** The name of the provider that matched this webhook */
    provider: K
    /** The parsed webhook payload specific to this provider */
    payload: WebhookPayload<T[K]>
  }
}[keyof T & string]

type ProcessWebhook<T extends ProvidersMap> = (
  request: Request,
) => Promise<Result<WebhookResult<T>>>

type OAuthProvidersOnly<T extends ProvidersMap> = {
  [K in keyof T as T[K] extends OAuthProvider ? K : never]: T[K]
}

/**
 * Parameters for OAuth authorization initiation.
 */
type AuthorizeParams<T extends ProvidersMap = ProvidersMap> = {
  /** The provider name (must be one of the configured OAuth provider keys) */
  provider: keyof OAuthProvidersOnly<T> & string
  /** The user ID for whom the OAuth flow is being initiated */
  userId: string
}

type Authorize<T extends ProvidersMap = ProvidersMap> = (
  params: AuthorizeParams<T>,
) => Promise<Response>

type OAuthCallbackParams<T extends ProvidersMap = ProvidersMap> = {
  /** The provider name (must be one of the configured OAuth provider keys) */
  provider: keyof OAuthProvidersOnly<T> & string
  /** The user ID for whom the OAuth flow is being completed */
  userId: string
  /** The callback URL containing OAuth code and state parameters */
  callbackUrl: string | URL
}

type OAuthCallback<T extends ProvidersMap = ProvidersMap> = (
  params: OAuthCallbackParams<T>,
) => {
  /**
   * Chains a success callback that will be invoked after successful OAuth authentication.
   * @param callback - A function that returns a Response to be sent on successful authentication
   * @returns A promise that resolves to a Response (from callback on success, or an error response on failure)
   */
  onSuccess: (callback: () => Response) => Promise<Response>
}

/**
 * This allows you to reference the exact provider names you've configured in your Kit.
 *
 * @example
 * ```ts
 * const kit = triggers({
 *   providers: {
 *     github: github({ ... }),
 *     slack: slack({ ... })
 *   }
 * })
 *
 * type MyProviderName = ProviderName<typeof kit>
 * // "github" | "slack"
 * ```
 */
export type ProviderName<T> = T extends Kit<infer P> ? keyof P & string : never

/**
 * This allows you to reference only the OAuth provider names you've configured in your Kit.
 * Excludes providers that don't support OAuth (like token-based providers).
 *
 * @example
 * ```ts
 * const kit = triggers({
 *   providers: {
 *     github: github({ oauth: { ... } }),  // OAuth provider
 *     telegram: telegram({ token: '...' })  // Token-based provider
 *   }
 * })
 *
 * type MyOAuthProviderName = OAuthProviderName<typeof kit>
 * // "github" (telegram is excluded)
 * ```
 */
export type OAuthProviderName<T> =
  T extends Kit<infer P> ? keyof OAuthProvidersOnly<P> & string : never

export type Kit<T extends ProvidersMap> = T & {
  /**
   * Processes incoming webhook requests and routes them to the appropriate provider.
   * @param request - The incoming webhook request
   * @returns A promise that resolves to a Result containing the provider name and parsed payload
   */
  processWebhook: ProcessWebhook<T>
  /**
   * Initiates OAuth authorization by generating an authorization URL.
   * Automatically handles OAuth security features:
   * - Generates and stores a cryptographically secure state parameter for CSRF protection
   * - If PKCE is enabled for the provider, automatically generates code verifier and code challenge (S256)
   * - Stores state and PKCE parameters with TTL for secure validation on callback
   * @param params - The OAuth parameters including provider and userId
   * @returns A promise that resolves to a Response redirecting to the OAuth provider's authorization page
   */
  authorize: Authorize<T>
  /**
   * Processes OAuth callback after user authorization.
   * Performs complete OAuth callback validation and token exchange:
   * - Validates the state parameter against stored state (prevents CSRF attacks)
   * - Verifies state hasn't expired (600 second TTL)
   * - If PKCE was used, retrieves and validates the stored code verifier
   * - Exchanges the authorization code for access tokens using the code verifier if PKCE is enabled
   * - Stores the obtained tokens securely for the user
   * - Invokes the success callback on successful authentication
   * @param params - The OAuth callback parameters including provider, userId, and callbackUrl
   * @returns An object with an onSuccess method that accepts a callback function returning a Response
   */
  oauthCallback: OAuthCallback<T>
}

export function triggers<T extends ProvidersMap>(config: {
  providers: T
}): Kit<T> {
  return {
    ...config.providers,
    processWebhook: createWebhookHandler(config.providers),
    authorize: createOAuthHandler(config.providers),
    oauthCallback: createOAuthCallbackHandler(config.providers),
  }
}

function createWebhookHandler<T extends ProvidersMap>(
  providers: T,
): ProcessWebhook<T> {
  return async (request) => {
    const clonedRequest = request.clone()

    let body: unknown = null
    try {
      body = await clonedRequest.json()
    } catch {}

    const context: WebhookContext = {
      headers: request.headers,
      body,
      url: new URL(request.url),
      request: request.clone(),
    }

    for (const [name, provider] of Object.entries(providers)) {
      const isMatch = await provider.detect(context)
      if (!isMatch) continue

      const result = await provider.webhooks.handle(request)

      if (!result.ok) {
        return { ok: false, error: result.error }
      }

      return {
        ok: true,
        data: { provider: name, payload: result.data } as WebhookResult<T>,
      }
    }

    return {
      ok: false,
      error: { message: 'No matching provider found for this webhook' },
    }
  }
}

function createOAuthHandler<T extends ProvidersMap>(
  providers: T,
): Authorize<T> {
  return async ({ provider, userId }) => {
    if (!userId) {
      return new Response('User ID is required but was not provided', {
        status: 400,
      })
    }

    if (!provider) {
      return new Response('OAuth provider is required but was not specified', {
        status: 400,
      })
    }

    const providerConfig = providers[provider]
    if (!providerConfig) {
      return new Response(
        `Provider '${provider}' is not configured or does not exist`,
        { status: 404 },
      )
    }

    if (!('forUser' in providerConfig)) {
      return new Response(
        `Provider '${provider}' does not support OAuth authentication`,
        { status: 501 },
      )
    }

    try {
      const oauthProvider = providerConfig as OAuthProvider
      const user = oauthProvider.forUser(userId)
      const result = await user.oauth.getAuthUrl()

      return Response.redirect(result.url)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      return new Response(
        `Failed to generate OAuth authorization URL: ${errorMessage}`,
        { status: 500 },
      )
    }
  }
}

function createOAuthCallbackHandler<T extends ProvidersMap>(
  providers: T,
): OAuthCallback<T> {
  return ({ provider, userId, callbackUrl }) => {
    return {
      onSuccess: async (callback) => {
        if (!userId) {
          return new Response('User ID is required but was not provided', {
            status: 400,
          })
        }

        if (!provider) {
          return new Response(
            'OAuth provider is required but was not specified',
            {
              status: 400,
            },
          )
        }

        const providerConfig = providers[provider]
        if (!providerConfig) {
          return new Response(
            `Provider '${provider}' is not configured or does not exist`,
            { status: 404 },
          )
        }

        if (!('forUser' in providerConfig)) {
          return new Response(
            `Provider '${provider}' does not support OAuth authentication`,
            { status: 501 },
          )
        }

        const url =
          typeof callbackUrl === 'string'
            ? new URL(callbackUrl)
            : new URL(callbackUrl.toString())
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state')

        if (!code || !state) {
          const missing = []
          if (!code) missing.push('code')
          if (!state) missing.push('state')

          return new Response(
            `OAuth callback is missing required parameters: ${missing.join(', ')}`,
            { status: 400 },
          )
        }

        try {
          const oauthProvider = providerConfig as OAuthProvider
          const user = oauthProvider.forUser(userId)
          const result = await user.oauth.handleCallback(code, state)

          if (!result.ok) {
            return new Response(
              `OAuth authentication failed: ${result.error.message}`,
              { status: 401 },
            )
          }

          return callback()
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error'
          return new Response(
            `Failed to process OAuth callback: ${errorMessage}`,
            {
              status: 500,
            },
          )
        }
      },
    }
  }
}

export default triggers
