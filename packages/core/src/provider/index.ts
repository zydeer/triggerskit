import type { ZodType } from 'zod'
import type { OAuthHandler, OAuthStorage, OAuthTokens } from '../oauth'
import { createOAuth } from '../oauth'
import type {
  EventHandler,
  EventMap,
  Events,
  Unsubscribe,
} from '../types/events'
import { createEvents } from '../types/events'
import type { Result } from '../types/result'
import { TriggersError } from '../types/result'
import type { WebhookContext, WebhookDetector } from '../types/webhook'
import { fetchWithTimeout } from '../utils/fetch'
import { fail, ok, safeParse } from '../utils/result'

// === Types ===

export type ProviderConfig = {
  baseUrl: string
  timeout?: number
}

export type TokenProvider =
  | { type: 'static'; token: string }
  | { type: 'oauth'; handler: OAuthHandler; tokenKey: string }

export type RequestFn = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

export type CreateRequestOptions = {
  baseUrl: string
  timeout?: number
  getToken: () => Promise<string | null>
  headers?: Record<string, string>
  transformError?: (data: unknown, status: number) => TriggersError
}

export type WebhookEventHandler<TEvents extends EventMap, TData> = {
  schema: ZodType<TData>
  detect: (ctx: WebhookContext) => boolean | Promise<boolean>
  getEventType?: (req: Request, body: unknown) => string | undefined
  eventHandlers?: Partial<Record<keyof TEvents, ZodType>>
}

export type OAuthConfig = {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
}

export type OAuthProviderOptions = {
  authorizationUrl: string
  tokenUrl: string
  authMethod?: 'body' | 'header'
}

export type ProviderOAuth = {
  /** Get authorization URL for OAuth flow */
  getAuthorizationUrl: (options?: {
    state?: string
    scopes?: string[]
  }) => Promise<{ url: string; state: string }>
  /** Handle OAuth callback - exchange code for tokens */
  handleCallback: (
    code: string,
    state: string,
  ) => Promise<Result<{ success: true }>>
  /** Check if OAuth tokens are available and valid */
  isAuthenticated: () => Promise<boolean>
  /** Revoke/delete stored tokens */
  revokeTokens: () => Promise<void>
}

// === Utilities ===

/**
 * Create a request function with common patterns
 */
export function createRequest(options: CreateRequestOptions): RequestFn {
  const {
    baseUrl,
    timeout,
    getToken,
    headers: defaultHeaders,
    transformError,
  } = options

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const url = path.startsWith('http') ? path : `${baseUrl}${path}`
    const token = await getToken()

    if (!token) {
      throw new TriggersError(
        'No authentication token available. Either provide a token or complete OAuth flow.',
      )
    }

    try {
      const response = await fetchWithTimeout(url, {
        ...init,
        timeout,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...defaultHeaders,
          ...init?.headers,
        },
      })

      if (response.status === 204) return undefined as T

      const data = await response.json()

      if (!response.ok) {
        throw (
          transformError?.(data, response.status) ??
          new TriggersError(data.message ?? 'API error')
        )
      }

      return data as T
    } catch (e) {
      if (e instanceof TriggersError) throw e
      if (e instanceof Error && e.name === 'AbortError')
        throw new TriggersError('Request timed out')
      throw new TriggersError('Network request failed')
    }
  }
}

/**
 * Create OAuth utilities for a provider
 */
export function createProviderOAuth(
  handler: OAuthHandler,
  tokenKey: string,
): ProviderOAuth {
  return {
    getAuthorizationUrl: handler.getAuthorizationUrl,
    async handleCallback(
      code: string,
      state: string,
    ): Promise<Result<{ success: true }>> {
      try {
        const tokens = await handler.exchangeCode(code, state)
        await handler.storeTokens(tokenKey, tokens)
        return ok({ success: true })
      } catch (e) {
        return fail(e)
      }
    },
    isAuthenticated: () => handler.hasValidTokens(tokenKey),
    revokeTokens: () => handler.deleteTokens(tokenKey),
  }
}

/**
 * Create webhook handler and detector
 */
export function createWebhookHandler<TEvents extends EventMap, TData>(
  config: WebhookEventHandler<TEvents, TData>,
  events: Events<TEvents>,
): {
  handler: (req: Request) => Promise<Result<TData>>
  detector: WebhookDetector<TData>
} {
  const handler = async (req: Request): Promise<Result<TData>> => {
    try {
      const body = await req.json()
      const eventType = config.getEventType?.(req, body)

      // Parse with specific schema if available
      const schema =
        eventType && config.eventHandlers?.[eventType as keyof TEvents]
          ? // biome-ignore lint/style/noNonNullAssertion: expected to be defined
            config.eventHandlers[eventType as keyof TEvents]!
          : config.schema

      const result = safeParse(schema as ZodType<TData>, body)
      if (result.error) return result

      // Emit event if handler exists
      if (eventType && config.eventHandlers?.[eventType as keyof TEvents]) {
        events.emit(
          eventType as keyof TEvents,
          result.data as TEvents[keyof TEvents],
        )
      }

      return ok(result.data)
    } catch (e) {
      return fail(e)
    }
  }

  return {
    handler,
    detector: { detect: config.detect, handleWebhook: handler },
  }
}

/**
 * Setup OAuth handler from config
 */
export function setupOAuth(
  oauth: OAuthConfig | undefined,
  storage: OAuthStorage | undefined,
  namespace: string,
  options: OAuthProviderOptions,
): OAuthHandler | undefined {
  if (!oauth || !storage) return undefined

  return createOAuth(
    {
      authorizationUrl: options.authorizationUrl,
      tokenUrl: options.tokenUrl,
      clientId: oauth.clientId,
      clientSecret: oauth.clientSecret,
      redirectUri: oauth.redirectUri,
      scopes: oauth.scopes,
      authMethod: options.authMethod ?? 'body',
    },
    storage,
    namespace,
  )
}

/**
 * Create token getter for request function
 */
export function createTokenGetter(
  staticToken: string | undefined,
  oauth: OAuthHandler | undefined,
  tokenKey: string,
): () => Promise<string | null> {
  return async () => {
    if (staticToken) return staticToken
    if (oauth) {
      const tokens = await oauth.getTokens(tokenKey)
      return tokens?.accessToken ?? null
    }
    return null
  }
}

// Re-export types and functions that providers commonly need
export { createEvents, fail, ok, safeParse }
export type {
  EventHandler,
  EventMap,
  Events,
  Result,
  Unsubscribe,
  WebhookContext,
  WebhookDetector,
}
export type { OAuthHandler, OAuthStorage, OAuthTokens }
