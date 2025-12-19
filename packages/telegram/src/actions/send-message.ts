import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext } from '..'
import { type ApiMessage, fromApi, toApi } from '../api'
import type {
  LinkPreviewOptions,
  Message,
  MessageEntity,
  ParseMode,
  ReplyMarkup,
  ReplyParameters,
} from '../types'

/**
 * Parameters for sending a text message via Telegram Bot API.
 *
 * Use this method to send text messages. On success, the sent {@link Message} is returned.
 *
 * @see https://core.telegram.org/bots/api#sendmessage
 */
export type SendMessageParams = {
  /**
   * Unique identifier for the target chat or username of the target channel
   * (in the format `@channelusername`).
   *
   * @example
   * ```typescript
   * // Using chat ID
   * chatId: 123456789
   *
   * // Using channel username
   * chatId: '@my_channel'
   * ```
   */
  chatId: number | string

  /**
   * Text of the message to be sent, 1-4096 characters after entities parsing.
   *
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  text: string

  /**
   * Unique identifier of the business connection on behalf of which the message will be sent.
   *
   * Use this when your bot is connected to a Telegram Business account.
   *
   * @see https://core.telegram.org/bots/api#business-connection
   */
  businessConnectionId?: string

  /**
   * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   *
   * @see https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups
   */
  messageThreadId?: number

  /**
   * Mode for parsing entities in the message text.
   *
   * - `Markdown` - Legacy Markdown-style formatting (limited)
   * - `MarkdownV2` - Extended Markdown-style formatting (recommended)
   * - `HTML` - HTML-style formatting
   *
   * @see https://core.telegram.org/bots/api#formatting-options
   *
   * @example
   * ```typescript
   * // MarkdownV2 example
   * {
   *   text: '*bold* _italic_ ~strikethrough~ ||spoiler||',
   *   parseMode: 'MarkdownV2'
   * }
   *
   * // HTML example
   * {
   *   text: '<b>bold</b> <i>italic</i> <s>strikethrough</s> <tg-spoiler>spoiler</tg-spoiler>',
   *   parseMode: 'HTML'
   * }
   * ```
   */
  parseMode?: ParseMode

  /**
   * A list of special entities that appear in the message text,
   * which can be specified instead of `parseMode`.
   *
   * Use this for fine-grained control over text formatting.
   *
   * @see https://core.telegram.org/bots/api#messageentity
   */
  entities?: MessageEntity[]

  /**
   * Link preview generation options for the message.
   *
   * @see https://core.telegram.org/bots/api#linkpreviewoptions
   *
   * @example
   * ```typescript
   * // Disable link preview
   * {
   *   text: 'Check out https://example.com',
   *   linkPreviewOptions: { isDisabled: true }
   * }
   *
   * // Show large preview above text
   * {
   *   text: 'Check out https://example.com',
   *   linkPreviewOptions: {
   *     preferLargeMedia: true,
   *     showAboveText: true
   *   }
   * }
   * ```
   */
  linkPreviewOptions?: LinkPreviewOptions

  /**
   * Sends the message silently. Users will receive a notification with no sound.
   *
   * @example
   * ```typescript
   * {
   *   chatId: 123456789,
   *   text: 'Silent notification',
   *   disableNotification: true
   * }
   * ```
   */
  disableNotification?: boolean

  /**
   * Protects the contents of the sent message from forwarding and saving.
   *
   * When enabled, users cannot forward or save the message content.
   */
  protectContent?: boolean

  /**
   * Pass `true` to allow up to 1000 messages per second, ignoring broadcasting limits
   * for a fee of 0.1 Telegram Stars per message.
   *
   * The relevant Stars will be withdrawn from the bot's balance.
   *
   * @see https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once
   */
  allowPaidBroadcast?: boolean

  /**
   * Unique identifier of the message effect to be added to the message; for private chats only.
   *
   * Message effects add animations/reactions to messages.
   */
  messageEffectId?: string

  /**
   * Description of the message to reply to.
   *
   * @see https://core.telegram.org/bots/api#replyparameters
   *
   * @example
   * ```typescript
   * // Simple reply
   * {
   *   chatId: 123456789,
   *   text: 'This is a reply',
   *   replyParameters: { messageId: 42 }
   * }
   *
   * // Reply with quote
   * {
   *   chatId: 123456789,
   *   text: 'Replying to specific text',
   *   replyParameters: {
   *     messageId: 42,
   *     quote: 'the specific text to quote'
   *   }
   * }
   * ```
   */
  replyParameters?: ReplyParameters

  /**
   * Additional interface options.
   *
   * A JSON-serialized object for:
   * - An {@link InlineKeyboardMarkup inline keyboard}
   * - A {@link ReplyKeyboardMarkup custom reply keyboard}
   * - Instructions to {@link ReplyKeyboardRemove remove a reply keyboard}
   * - Instructions to {@link ForceReply force a reply} from the user
   *
   * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
   *
   * @example
   * ```typescript
   * // Inline keyboard
   * {
   *   replyMarkup: {
   *     inlineKeyboard: [[
   *       { text: '👍', callbackData: 'like' },
   *       { text: '👎', callbackData: 'dislike' }
   *     ]]
   *   }
   * }
   *
   * // Reply keyboard
   * {
   *   replyMarkup: {
   *     keyboard: [[
   *       { text: 'Option A' },
   *       { text: 'Option B' }
   *     ]],
   *     resizeKeyboard: true,
   *     oneTimeKeyboard: true
   *   }
   * }
   * ```
   */
  replyMarkup?: ReplyMarkup
}

/**
 * Response data returned after successfully sending a message.
 *
 * Contains the full sent {@link Message} object with all its properties.
 *
 * @see https://core.telegram.org/bots/api#message
 */
export type SendMessageData = Message

type TelegramApiResponse = {
  ok: boolean
  result: ApiMessage
}

export function sendMessage(ctx: TelegramContext) {
  return async (
    params: SendMessageParams,
  ): Promise<Result<SendMessageData>> => {
    try {
      const body: Record<string, unknown> = {
        chat_id: params.chatId,
        text: params.text,
      }

      if (params.businessConnectionId !== undefined) {
        body.business_connection_id = params.businessConnectionId
      }

      if (params.messageThreadId !== undefined) {
        body.message_thread_id = params.messageThreadId
      }

      if (params.parseMode !== undefined) {
        body.parse_mode = params.parseMode
      }

      if (params.entities !== undefined) {
        body.entities = params.entities.map(toApi.messageEntity)
      }

      if (params.linkPreviewOptions !== undefined) {
        body.link_preview_options = toApi.linkPreviewOptions(
          params.linkPreviewOptions,
        )
      }

      if (params.disableNotification !== undefined) {
        body.disable_notification = params.disableNotification
      }

      if (params.protectContent !== undefined) {
        body.protect_content = params.protectContent
      }

      if (params.allowPaidBroadcast !== undefined) {
        body.allow_paid_broadcast = params.allowPaidBroadcast
      }

      if (params.messageEffectId !== undefined) {
        body.message_effect_id = params.messageEffectId
      }

      if (params.replyParameters !== undefined) {
        body.reply_parameters = toApi.replyParameters(params.replyParameters)
      }

      if (params.replyMarkup !== undefined) {
        body.reply_markup = toApi.replyMarkup(params.replyMarkup)
      }

      const response = await ctx.request<TelegramApiResponse>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      return ok(fromApi.message(response.result))
    } catch (e) {
      return fail(e)
    }
  }
}
