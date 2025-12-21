import type { EventHandler, EventMap, Unsubscribe } from './events'
import type { HttpClient } from './http'
import type { OAuth } from './oauth'
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
 * Base provider interface for all integrations.
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
 * Provider with OAuth support.
 */
export interface OAuthProvider<
  TName extends string = string,
  TActions extends ActionsMap = ActionsMap,
  TEvents extends EventMap = EventMap,
  TWebhookPayload = unknown,
  TWebhooks extends
    ProviderWebhooks<TWebhookPayload> = ProviderWebhooks<TWebhookPayload>,
  TOAuth extends OAuth = OAuth,
> extends Provider<TName, TActions, TEvents, TWebhookPayload, TWebhooks> {
  readonly oauth: TOAuth
}

export type WebhookPayload<T> =
  T extends Provider<string, any, EventMap, infer P> ? P : unknown

export type ProviderActions<T> =
  T extends Provider<string, infer A, any> ? A : never

export type ProviderEvents<T> =
  T extends Provider<string, any, infer E> ? E : never
