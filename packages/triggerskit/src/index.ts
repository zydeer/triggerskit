import {
  error,
  type Provider,
  type Result,
  type WebhookContext,
  type WebhookPayload,
} from '@triggerskit/core'

/** Map of provider name to provider instance */
export type Providers = Record<string, Provider>

/** Webhook result with provider identification */
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
      error: error(
        'No matching provider found for this webhook',
        undefined,
        'NO_PROVIDER_MATCH',
      ),
    }
  }
}

/**
 * Create a unified TriggersKit instance from multiple providers.
 *
 * @example
 * ```ts
 * import { triggers } from 'triggerskit'
 * import { telegram } from '@triggerskit/telegram'
 * import { github } from '@triggerskit/github'
 *
 * const kit = triggers({
 *   providers: {
 *     telegram: telegram({ token: 'BOT_TOKEN' }),
 *     github: github({ token: 'ghp_xxxx' }),
 *   }
 * })
 *
 * // Access providers directly
 * await kit.telegram.actions.sendMessage({ chat_id: 123, text: 'Hi!' })
 * await kit.github.actions.getUser()
 *
 * // Handle webhooks from any provider
 * const result = await kit.handle(request)
 * if (result.ok) {
 *   console.log(`Received webhook from ${result.data.provider}`)
 * }
 * ```
 */
export function triggers<T extends Providers>(config: {
  providers: T
}): TriggersKit<T> {
  return {
    ...config.providers,
    handle: createWebhookHandler(config.providers),
  }
}

export default triggers
