import type {
  BaseProvider,
  ProviderInstance,
  TriggersConfig,
  TriggersKit,
} from '@triggerskit/core'

export type { TriggersConfig, TriggersKit, BaseProvider, ProviderInstance }

/**
 * Create a triggers kit with multiple provider instances
 *
 * @example
 * ```ts
 * import { triggers } from 'triggerskit'
 * import { telegram } from '@triggerskit/telegram'
 *
 * export const kit = triggers({
 *   supportBot: telegram({ token: 'BOT_TOKEN' }),
 * })
 *
 * // Usage
 * await kit.supportBot.sendMessage({ chat_id: 123, text: 'Hello!' })
 * ```
 */
export function triggers<TConfig extends TriggersConfig>(
  config: TConfig,
): TriggersKit<TConfig> {
  let loggerEnabled = false

  function enableLogger(enabled = true): void {
    loggerEnabled = enabled
    if (loggerEnabled) {
      console.log('[triggerskit] Logger enabled')
    }
  }

  return {
    ...config,
    enableLogger,
  }
}

export default triggers
