import type {
  ProviderInstance,
  WebhookContext,
  WebhookResult,
} from '@triggerskit/core/types'
import { type Result, TriggersError } from '@triggerskit/core/types'

export type WebhookHandler<
  TProviders extends Record<string, ProviderInstance>,
> = (request: Request) => Promise<Result<WebhookResult<TProviders>>>

export function createWebhookHandler<
  TProviders extends Record<string, ProviderInstance>,
>(providers: TProviders): WebhookHandler<TProviders> {
  return async (
    request: Request,
  ): Promise<Result<WebhookResult<TProviders>>> => {
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

    for (const [name, provider] of Object.entries(providers) as [
      keyof TProviders & string,
      ProviderInstance,
    ][]) {
      const isMatch = await provider.detector.detect(context)
      if (!isMatch) continue

      const result = await provider.detector.handleWebhook(request)

      if (result.error) {
        return { data: null, error: result.error }
      }

      return {
        data: { provider: name, payload: result.data },
        error: null,
      } as Result<WebhookResult<TProviders>>
    }

    return {
      data: null,
      error: new TriggersError('No matching provider found for this webhook'),
    }
  }
}
