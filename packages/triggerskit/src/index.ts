import type { ProviderInstance } from '@triggerskit/core/types'
import { createWebhookHandler, type WebhookHandler } from './webhooks'

export type ExtractProviderNames<
  TProviders extends Record<string, ProviderInstance>,
> = keyof TProviders & string

export type TriggersKit<TProviders extends Record<string, ProviderInstance>> =
  TProviders & {
    /**
     * Unified webhook handler that auto-detects the provider and routes the request.
     *
     * @param request - Incoming webhook request
     * @returns Result with provider name and parsed data, or error if no match
     */
    handle: WebhookHandler<ExtractProviderNames<TProviders>>
  }

/**
 * Creates a TriggersKit instance with unified provider management.
 *
 * @template TProviders - Record of provider instances
 * @param config - Configuration with provider instances
 * @returns TriggersKit instance with all providers and unified webhook handler
 *
 * @example
 * ```typescript
 * import { triggers } from 'triggerskit'
 * import { telegram } from '@triggerskit/telegram'
 *
 * const kit = triggers({
 *   providers: {
 *     telegram: telegram({ token: 'BOT_TOKEN' }),
 *   },
 * })
 *
 * // Access providers
 * await kit.telegram.actions.sendMessage({ chat_id: 123, text: 'Hello!' })
 *
 * // Unified webhook handling
 * const result = await kit.handle(request)
 * if (result.data) {
 *   console.log(`Handled by: ${result.data.provider}`)
 * }
 * ```
 */
export function triggers<
  TProviders extends Record<string, ProviderInstance>,
>(config: { providers: TProviders }): TriggersKit<TProviders> {
  const { providers } = config

  return {
    ...providers,
    handle: createWebhookHandler(providers),
  } as TriggersKit<TProviders>
}

export default triggers
