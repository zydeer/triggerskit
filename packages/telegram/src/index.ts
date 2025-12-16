import type { Provider } from '@triggerskit/core'
import { actions } from './actions'
import type { TelegramConfig } from './types'

export function telegram(
  config: TelegramConfig,
): Provider<TelegramConfig, typeof actions> {
  return {
    config,
    actions,
  }
}

export default telegram
