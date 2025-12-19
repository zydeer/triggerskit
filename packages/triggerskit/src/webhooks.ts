import type {
  ProviderInstance,
  WebhookContext,
  WebhookHandleResult,
} from '@triggerskit/core/types'
import { TriggersError } from '@triggerskit/core/types'

export type WebhookHandler<TProvider extends string = string> = (
  request: Request,
) => Promise<WebhookHandleResult<TProvider>>

export function createWebhookHandler<TProviderName extends string>(
  providers: Record<TProviderName, ProviderInstance>,
): WebhookHandler<TProviderName> {
  return async (
    request: Request,
  ): Promise<WebhookHandleResult<TProviderName>> => {
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
      TProviderName,
      ProviderInstance,
    ][]) {
      const isMatch = await provider.detector.detect(context)
      if (!isMatch) continue

      const result = await provider.detector.handleWebhook(request)

      if (result.error) {
        return { data: null, error: result.error }
      }

      return {
        data: { provider: name, data: result.data },
        error: null,
      }
    }

    return {
      data: null,
      error: new TriggersError('No matching provider found for this webhook'),
    }
  }
}
