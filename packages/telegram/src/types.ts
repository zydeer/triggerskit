import type { ProviderInstance } from '@triggerskit/core'

/**
 * Telegram provider configuration
 */
export type TelegramConfig = {
  /** Telegram Bot API token */
  token: string
  /** Optional base URL for API (useful for testing) */
  baseUrl?: string
}

/**
 * Parameters for sendMessage
 */
export type SendMessageParams = {
  /** Unique identifier for the target chat */
  chat_id: number | string
  /** Text of the message to be sent */
  text: string
  /** Optional parse mode (Markdown, HTML, etc.) */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'
}

/**
 * Result of sendMessage
 */
export type SendMessageResult = {
  ok: boolean
  message_id: number
}

/**
 * Result of getMe
 */
export type GetMeResult = {
  ok: boolean
  id: number
  is_bot: boolean
  first_name: string
  username?: string
}

/**
 * Telegram provider methods
 */
export type TelegramMethods = {
  sendMessage: (params: SendMessageParams) => Promise<SendMessageResult>
  getMe: () => Promise<GetMeResult>
}

export type TelegramInstance = ProviderInstance<'telegram', TelegramMethods>
