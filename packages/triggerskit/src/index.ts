import type {
  OAuthProvider,
  Provider,
  WebhookContext,
  WebhookPayload,
} from '@triggerskit/core/provider'
import type { Result } from '@triggerskit/core/result'

export type Providers = Record<string, Provider | OAuthProvider>

export type WebhookResult<T extends Providers> = {
  [K in keyof T & string]: {
    provider: K
    payload: WebhookPayload<T[K]>
  }
}[keyof T & string]

export type TriggersKit<T extends Providers> = T & {
  handle(request: Request): Promise<Result<WebhookResult<T>>>
}

function createWebhookHandler<T extends Providers>(providers: T) {
  return async (request: Request): Promise<Result<WebhookResult<T>>> => {
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

export function triggers<T extends Providers>(config: {
  providers: T
}): TriggersKit<T> {
  return {
    ...config.providers,
    handle: createWebhookHandler(config.providers),
  }
}

export default triggers
