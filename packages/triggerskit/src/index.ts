import type { TriggersConfig, TriggersKit } from '@triggerskit/core/types'
import { handleWebhook } from './webhooks'

export function triggers<TConfig extends TriggersConfig>(
  config: TConfig,
): TriggersKit<TConfig> {
  const providers = config.providers

  return {
    ...providers,
    handleWebhook: handleWebhook(providers),
  } as TriggersKit<TConfig>
}

export default triggers
