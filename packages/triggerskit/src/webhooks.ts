import {
  type ProviderInstance,
  TriggersError,
  type WebhookContext,
  type WebhookHandleResult,
} from '@triggerskit/core/types'

export async function handleWebhook(
  providers: Record<string, ProviderInstance>,
): Promise<WebhookHandleResult> {
  return async (request: Request) => {
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
      if (!provider.detector) continue

      const isMatch = await provider.detector.detect(context)
      if (isMatch) {
        const result = await provider.detector.handleWebhook(request)

        return {
          provider: name,
          data: result.data,
          error: result.error,
        }
      }
    }

    return {
      error: new TriggersError('No matching provider found for this webhook'),
    }
  }
}
