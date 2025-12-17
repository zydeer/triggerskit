import type { ActionContext } from '@triggerskit/core/types'

export type TelegramErrorDetails = { errorCode: number }

/**
 * Configuration options for the Telegram provider.
 */
export type TelegramConfig = {
  /**
   * Bot token obtained from @BotFather on Telegram.
   */
  token: string
  /**
   * Base URL for Telegram API. Defaults to 'https://api.telegram.org'.
   */
  baseUrl?: string
  /**
   * Request timeout in milliseconds. Defaults to 30000 (30 seconds).
   */
  timeout?: number
}

export type TelegramContext = ActionContext
