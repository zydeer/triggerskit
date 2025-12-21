import type { EventHandler, EventMap, Unsubscribe } from './events'
import type { HttpClient } from './http'
import type { OAuth, OAuthTokens } from './oauth'
import type { Result } from './result'

export interface WebhookContext {
  headers: Headers
  body: unknown
  url: URL
  request: Request
}

export interface ProviderWebhooks<TPayload> {
  handle(request: Request): Promise<Result<TPayload>>
}

export type ActionsMap = {
  [key: string]: (...args: never[]) => Promise<Result<unknown>>
}

/**
 * Base provider interface (token-based auth).
 */
export interface Provider<
  TName extends string = string,
  TActions extends ActionsMap = ActionsMap,
  TEvents extends EventMap = EventMap,
  TWebhookPayload = unknown,
  TWebhooks extends
    ProviderWebhooks<TWebhookPayload> = ProviderWebhooks<TWebhookPayload>,
> {
  readonly name: TName
  readonly actions: TActions
  readonly webhooks: TWebhooks
  readonly on: <K extends keyof TEvents>(
    event: K,
    handler: EventHandler<TEvents[K]>,
  ) => Unsubscribe
  readonly http: HttpClient
  detect(ctx: WebhookContext): boolean | Promise<boolean>
}

/**
 * Provider with OAuth support (multi-user).
 * Use forUser(userId) to get authenticated actions - root-level actions/http are not available.
 */
export interface OAuthProvider<
  TName extends string = string,
  TActions extends ActionsMap = ActionsMap,
  TEvents extends EventMap = EventMap,
  TWebhookPayload = unknown,
  TWebhooks extends
    ProviderWebhooks<TWebhookPayload> = ProviderWebhooks<TWebhookPayload>,
  TTokens extends OAuthTokens = OAuthTokens,
  TOAuth extends OAuth<TTokens> = OAuth<TTokens>,
> {
  readonly name: TName
  readonly webhooks: TWebhooks
  readonly on: <K extends keyof TEvents>(
    event: K,
    handler: EventHandler<TEvents[K]>,
  ) => Unsubscribe
  detect(ctx: WebhookContext): boolean | Promise<boolean>

  /**
   * Get a user-scoped client with OAuth tokens.
   *
   * @example
   * ```ts
   * const user = kit.gh.forUser(session.userId)
   * if (await user.oauth.isAuthenticated()) {
   *   const repos = await user.actions.listRepos()
   * }
   * ```
   */
  forUser(userId: string): {
    readonly actions: TActions
    readonly oauth: TOAuth
    readonly http: HttpClient
  }
}

export type WebhookPayload<T> =
  T extends Provider<string, any, EventMap, infer P> ? P : unknown

export type ProviderActions<T> =
  T extends Provider<string, infer A, any> ? A : never

export type ProviderEvents<T> =
  T extends Provider<string, any, infer E> ? E : never
