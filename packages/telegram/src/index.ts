import type { ProviderInstance, Result } from '@triggerskit/core/types'
import { type GetMeData, getMe } from './actions/get-me'
import {
  type SendMessageData,
  type SendMessageParams,
  sendMessage,
} from './actions/send-message'
import { createRequest } from './request'
import type { TelegramConfig } from './types'

export type TelegramActions = {
  /**
   * A simple method for testing your bot's authentication token.
   *
   * Requires no parameters. Returns basic information about the bot in form of a User object.
   *
   * @returns Promise resolving to a Result containing the bot's User information
   *
   * @see https://core.telegram.org/bots/api#getme
   *
   * @example
   * ```typescript
   * const result = await kit.telegram.actions.getMe()
   * if (result.data) {
   *   console.log('Bot username:', result.data.username)
   * }
   * ```
   */
  getMe: () => Promise<Result<GetMeData>>

  /**
   * Sends a text message to a specified chat.
   *
   * @param params - Message parameters including chat ID, text, and optional formatting/markup
   * @returns Promise resolving to a Result containing the sent Message
   *
   * @see https://core.telegram.org/bots/api#sendmessage
   *
   * @example
   * ```typescript
   * // Simple message
   * const result = await kit.telegram.actions.sendMessage({
   *   chatId: 123456789,
   *   text: 'Hello, World!'
   * })
   *
   * // With formatting
   * const result = await kit.telegram.actions.sendMessage({
   *   chatId: '@channel',
   *   text: '<b>Bold</b> text',
   *   parseMode: 'HTML'
   * })
   * ```
   */
  sendMessage: (params: SendMessageParams) => Promise<Result<SendMessageData>>
}

export function telegram(
  config: TelegramConfig,
): ProviderInstance<'telegram', TelegramActions> {
  const request = createRequest(config)
  const ctx = { request }

  return {
    provider: 'telegram' as const,
    actions: {
      getMe: getMe(ctx),
      sendMessage: sendMessage(ctx),
    },
    request,
  }
}

export type { GetMeData } from './actions/get-me'
export type { SendMessageData, SendMessageParams } from './actions/send-message'

export type {
  CallbackGame,
  Chat,
  ChatAdministratorRights,
  CopyTextButton,
  ForceReply,
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  KeyboardButton,
  KeyboardButtonPollType,
  KeyboardButtonRequestChat,
  KeyboardButtonRequestUsers,
  LinkPreviewOptions,
  LoginUrl,
  Message,
  MessageEntity,
  ParseMode,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ReplyMarkup,
  ReplyParameters,
  SwitchInlineQueryChosenChat,
  TelegramConfig,
  TelegramContext,
  TelegramErrorDetails,
  User,
  WebAppInfo,
} from './types'
