import type { TriggersConfig, TriggersKit } from '@triggerskit/core/types'

export function triggers<TConfig extends TriggersConfig>(
  config: TConfig,
): TriggersKit<TConfig> {
  return config.providers
}

export default triggers
