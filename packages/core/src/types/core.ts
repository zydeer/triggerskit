import type { EventHandler, EventMap, Unsubscribe } from './events'
import type { Result } from './result'
import type { WebhookContext, WebhookDetector } from './webhook'

export type RequestFn = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

export type ActionContext<TExtra = object> = { request: RequestFn } & TExtra

export type ProviderWebhooks<TData = unknown> = {
  handle: (request: Request) => Promise<Result<TData>>
}

export type ProviderInstance<
  TName extends string = string,
  TActions extends Record<string, (...args: never[]) => unknown> = Record<
    string,
    (...args: never[]) => unknown
  >,
  TWebhookData = unknown,
  TEvents extends EventMap = EventMap,
  TWebhooks extends
    ProviderWebhooks<TWebhookData> = ProviderWebhooks<TWebhookData>,
> = {
  readonly provider: TName
  readonly actions: TActions
  readonly webhooks: TWebhooks
  readonly on: <K extends keyof TEvents>(
    event: K,
    handler: EventHandler<TEvents[K]>,
  ) => Unsubscribe
  readonly request: RequestFn
  readonly detector: WebhookDetector<TWebhookData>
}

export type ExtractWebhookData<T> =
  // biome-ignore lint/suspicious/noExplicitAny: needed for type extraction
  T extends ProviderInstance<string, any, infer TData, any, any>
    ? TData
    : unknown

export type WebhookResult<TProviders extends Record<string, ProviderInstance>> =
  {
    [K in keyof TProviders & string]: {
      provider: K
      payload: ExtractWebhookData<TProviders[K]>
    }
  }[keyof TProviders & string]

export type { WebhookContext }
