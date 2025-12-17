import type { TriggersConfig, TriggersKit } from '@triggerskit/core'

export function triggers<TConfig extends TriggersConfig>(
  config: TConfig,
): TriggersKit<TConfig> {
  return {
    ...config,
    enableLogger(enabled = true) {
      if (enabled) console.log('[triggerskit] Logger enabled')
    },
  }
}

export default triggers
