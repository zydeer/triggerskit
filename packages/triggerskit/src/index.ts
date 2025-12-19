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
