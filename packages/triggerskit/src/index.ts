import type { ProviderInstance } from '@triggerskit/core/types'
import { createWebhookHandler, type WebhookHandler } from './webhooks'

export type TriggersKit<TProviders extends Record<string, ProviderInstance>> =
  TProviders & {
    handle: WebhookHandler<TProviders>
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
