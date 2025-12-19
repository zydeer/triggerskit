import type { WebhookDetector } from './webhook'

export type RequestFn = <T = unknown>(
  path: string,
  init?: RequestInit,
) => Promise<T>

export type ActionContext<TExtra = object> = { request: RequestFn } & TExtra

export type ProviderInstance<
  TName extends string = string,
  TActions extends Record<string, (...args: never[]) => unknown> = Record<
    string,
    (...args: never[]) => unknown
  >,
  TWebhookData = unknown,
> = {
  readonly provider: TName
  readonly actions: TActions
  readonly request: RequestFn
  readonly detector?: WebhookDetector<TWebhookData>
}

export type TriggersConfig = {
  providers: Record<string, ProviderInstance>
}

export type TriggersKit<TConfig extends TriggersConfig> =
  TConfig['providers'] & {
    /**
     * Unified webhook handler that auto-detects the provider and routes the request.
     *
     * Iterates through all registered providers and calls the first matching detector.
     *
     * @param request - Incoming webhook request
     * @returns Result with provider name and handler data, or error if no match
     *
     * @example
     * ```typescript
     * // Single endpoint for all webhooks
     * app.post('/webhook', async (request) => {
     *   const result = await kit.handleWebhook(request)
     *
     *   if (result.data) {
     *     console.log(`Handled by: ${result.data.provider}`)
     *   }
     *
     *   return new Response('OK')
     * })
     * ```
     */
    handleWebhook: (request: Request) => Promise<WebhookHandleResult>
  }

export type WebhookHandleResult<TData = unknown> = {
  provider?: string
  data?: TData
  error?: Error
}
