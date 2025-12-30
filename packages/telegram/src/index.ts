import { createEmitter } from '@triggerskit/core/events'
import { createActions, createWebhookActions } from './actions'
import { createTelegramClient } from './client'
import type { TelegramEvents } from './events'
import type { TelegramConfig } from './types'
import { createWebhookHandler, detectTelegram } from './webhook'

/**
 * Create a Telegram bot provider instance.
 */
export function telegram(config: TelegramConfig) {
  const http = createTelegramClient(config)
  const emitter = createEmitter<TelegramEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  return {
    name: 'telegram' as const,
    actions: createActions(http),
    webhooks: createWebhookActions(http, handleWebhook),
    on: emitter.on,
    http,
    detect: detectTelegram,
  }
}

export type { DeleteWebhookParams, SetWebhookParams } from './actions'
export type {
  Animation,
  Audio,
  CallbackQuery,
  Chat,
  ChosenInlineResult,
  Contact,
  Dice,
  Document,
  ForceReply,
  Game,
  GetMeData,
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  InlineQuery,
  KeyboardButton,
  Location,
  MaskPosition,
  Message,
  MessageEntity,
  ParseMode,
  PhotoSize,
  Poll,
  PollAnswer,
  PollOption,
  PreCheckoutQuery,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ReplyMarkup,
  SendMessageParams,
  ShippingQuery,
  Sticker,
  StickerSet,
  Update,
  User,
  Venue,
  Video,
  VideoNote,
  Voice,
  WebhookInfo,
} from './schemas'

export default telegram
