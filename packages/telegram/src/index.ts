import { createEmitter } from '@triggerskit/core'
import { createActions, createWebhookActions } from './actions'
import { createTelegramClient } from './client'
import type { TelegramEvents } from './events'
import type { TelegramConfig, TelegramProvider } from './types'
import { createWebhookHandler, detectTelegram } from './webhook'

/**
 * Create a Telegram bot provider instance.
 *
 * @example
 * ```ts
 * const bot = telegram({ token: 'BOT_TOKEN' })
 *
 * // Send a message
 * const result = await bot.actions.sendMessage({
 *   chat_id: 123456789,
 *   text: 'Hello, World!'
 * })
 *
 * // Listen for messages
 * bot.on('message', (msg) => {
 *   console.log('New message:', msg.text)
 * })
 * ```
 */
export function telegram(config: TelegramConfig): TelegramProvider {
  const http = createTelegramClient(config)
  const emitter = createEmitter<TelegramEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  return {
    name: 'telegram',
    actions: createActions(http),
    webhooks: createWebhookActions(http, handleWebhook),
    on: emitter.on,
    http,
    detect: detectTelegram,
  }
}

export type { TelegramEvents } from './events'
export type {
  DeleteWebhookParams,
  SetWebhookParams,
  TelegramActions,
  TelegramConfig,
  TelegramErrorDetails,
  TelegramProvider,
  TelegramWebhooks,
} from './types'
