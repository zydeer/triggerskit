import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type {
  LinkPreviewOptions,
  Message,
  MessageEntity,
  ParseMode,
  ReplyMarkup,
  ReplyParameters,
  TelegramContext,
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
  result: {
    message_id: number
    message_thread_id?: number
    from?: {
      id: number
      is_bot: boolean
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
      added_to_attachment_menu?: boolean
    }
    sender_chat?: {
      id: number
      type: 'private' | 'group' | 'supergroup' | 'channel'
      title?: string
      username?: string
      first_name?: string
      last_name?: string
      is_forum?: boolean
    }
    date: number
    chat: {
      id: number
      type: 'private' | 'group' | 'supergroup' | 'channel'
      title?: string
      username?: string
      first_name?: string
      last_name?: string
      is_forum?: boolean
    }
    text?: string
    entities?: Array<{
      type: string
      offset: number
      length: number
      url?: string
      user?: {
        id: number
        is_bot: boolean
        first_name: string
        last_name?: string
        username?: string
      }
      language?: string
      custom_emoji_id?: string
    }>
  }
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
        body.entities = params.entities.map(transformEntityToApi)
      }

      if (params.linkPreviewOptions !== undefined) {
        body.link_preview_options = transformLinkPreviewOptionsToApi(
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
        body.reply_parameters = transformReplyParametersToApi(
          params.replyParameters,
        )
      }

      if (params.replyMarkup !== undefined) {
        body.reply_markup = transformReplyMarkupToApi(params.replyMarkup)
      }

      const response = await ctx.request<TelegramApiResponse>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      return ok(transformResponseToMessage(response.result))
    } catch (e) {
      return fail(e)
    }
  }
}

function transformEntityToApi(entity: MessageEntity): Record<string, unknown> {
  const result: Record<string, unknown> = {
    type: entityTypeToSnakeCase(entity.type),
    offset: entity.offset,
    length: entity.length,
  }

  if (entity.url !== undefined) result.url = entity.url
  if (entity.user !== undefined) {
    result.user = {
      id: entity.user.id,
      is_bot: entity.user.isBot,
      first_name: entity.user.firstName,
      ...(entity.user.lastName && { last_name: entity.user.lastName }),
      ...(entity.user.username && { username: entity.user.username }),
    }
  }
  if (entity.language !== undefined) result.language = entity.language
  if (entity.customEmojiId !== undefined)
    result.custom_emoji_id = entity.customEmojiId

  return result
}

function entityTypeToSnakeCase(type: MessageEntity['type']): string {
  const typeMap: Record<MessageEntity['type'], string> = {
    mention: 'mention',
    hashtag: 'hashtag',
    cashtag: 'cashtag',
    botCommand: 'bot_command',
    url: 'url',
    email: 'email',
    phoneNumber: 'phone_number',
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'strikethrough',
    spoiler: 'spoiler',
    blockquote: 'blockquote',
    expandableBlockquote: 'expandable_blockquote',
    code: 'code',
    pre: 'pre',
    textLink: 'text_link',
    textMention: 'text_mention',
    customEmoji: 'custom_emoji',
  }
  return typeMap[type]
}

function entityTypeToCamelCase(type: string): MessageEntity['type'] {
  const typeMap: Record<string, MessageEntity['type']> = {
    mention: 'mention',
    hashtag: 'hashtag',
    cashtag: 'cashtag',
    bot_command: 'botCommand',
    url: 'url',
    email: 'email',
    phone_number: 'phoneNumber',
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'strikethrough',
    spoiler: 'spoiler',
    blockquote: 'blockquote',
    expandable_blockquote: 'expandableBlockquote',
    code: 'code',
    pre: 'pre',
    text_link: 'textLink',
    text_mention: 'textMention',
    custom_emoji: 'customEmoji',
  }
  return typeMap[type] ?? 'mention'
}

function transformLinkPreviewOptionsToApi(
  options: LinkPreviewOptions,
): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  if (options.isDisabled !== undefined) result.is_disabled = options.isDisabled
  if (options.url !== undefined) result.url = options.url
  if (options.preferSmallMedia !== undefined)
    result.prefer_small_media = options.preferSmallMedia
  if (options.preferLargeMedia !== undefined)
    result.prefer_large_media = options.preferLargeMedia
  if (options.showAboveText !== undefined)
    result.show_above_text = options.showAboveText

  return result
}

function transformReplyParametersToApi(
  params: ReplyParameters,
): Record<string, unknown> {
  const result: Record<string, unknown> = {
    message_id: params.messageId,
  }

  if (params.chatId !== undefined) result.chat_id = params.chatId
  if (params.allowSendingWithoutReply !== undefined)
    result.allow_sending_without_reply = params.allowSendingWithoutReply
  if (params.quote !== undefined) result.quote = params.quote
  if (params.quoteParseMode !== undefined)
    result.quote_parse_mode = params.quoteParseMode
  if (params.quoteEntities !== undefined)
    result.quote_entities = params.quoteEntities.map(transformEntityToApi)
  if (params.quotePosition !== undefined)
    result.quote_position = params.quotePosition

  return result
}

function transformReplyMarkupToApi(
  markup: ReplyMarkup,
): Record<string, unknown> {
  // InlineKeyboardMarkup
  if ('inlineKeyboard' in markup) {
    return {
      inline_keyboard: markup.inlineKeyboard.map((row) =>
        row.map((button) => {
          const result: Record<string, unknown> = { text: button.text }

          if (button.url !== undefined) result.url = button.url
          if (button.callbackData !== undefined)
            result.callback_data = button.callbackData
          if (button.webApp !== undefined) result.web_app = button.webApp
          if (button.loginUrl !== undefined) {
            result.login_url = {
              url: button.loginUrl.url,
              ...(button.loginUrl.forwardText && {
                forward_text: button.loginUrl.forwardText,
              }),
              ...(button.loginUrl.botUsername && {
                bot_username: button.loginUrl.botUsername,
              }),
              ...(button.loginUrl.requestWriteAccess !== undefined && {
                request_write_access: button.loginUrl.requestWriteAccess,
              }),
            }
          }
          if (button.switchInlineQuery !== undefined)
            result.switch_inline_query = button.switchInlineQuery
          if (button.switchInlineQueryCurrentChat !== undefined)
            result.switch_inline_query_current_chat =
              button.switchInlineQueryCurrentChat
          if (button.switchInlineQueryChosenChat !== undefined) {
            result.switch_inline_query_chosen_chat = {
              ...(button.switchInlineQueryChosenChat.query && {
                query: button.switchInlineQueryChosenChat.query,
              }),
              ...(button.switchInlineQueryChosenChat.allowUserChats !==
                undefined && {
                allow_user_chats:
                  button.switchInlineQueryChosenChat.allowUserChats,
              }),
              ...(button.switchInlineQueryChosenChat.allowBotChats !==
                undefined && {
                allow_bot_chats:
                  button.switchInlineQueryChosenChat.allowBotChats,
              }),
              ...(button.switchInlineQueryChosenChat.allowGroupChats !==
                undefined && {
                allow_group_chats:
                  button.switchInlineQueryChosenChat.allowGroupChats,
              }),
              ...(button.switchInlineQueryChosenChat.allowChannelChats !==
                undefined && {
                allow_channel_chats:
                  button.switchInlineQueryChosenChat.allowChannelChats,
              }),
            }
          }
          if (button.copyText !== undefined)
            result.copy_text = { text: button.copyText.text }
          if (button.callbackGame !== undefined)
            result.callback_game = button.callbackGame
          if (button.pay !== undefined) result.pay = button.pay

          return result
        }),
      ),
    }
  }

  if ('keyboard' in markup) {
    const result: Record<string, unknown> = {
      keyboard: markup.keyboard.map((row) =>
        row.map((button) => {
          const btn: Record<string, unknown> = { text: button.text }

          if (button.requestUsers !== undefined) {
            btn.request_users = {
              request_id: button.requestUsers.requestId,
              ...(button.requestUsers.userIsBot !== undefined && {
                user_is_bot: button.requestUsers.userIsBot,
              }),
              ...(button.requestUsers.userIsPremium !== undefined && {
                user_is_premium: button.requestUsers.userIsPremium,
              }),
              ...(button.requestUsers.maxQuantity !== undefined && {
                max_quantity: button.requestUsers.maxQuantity,
              }),
              ...(button.requestUsers.requestName !== undefined && {
                request_name: button.requestUsers.requestName,
              }),
              ...(button.requestUsers.requestUsername !== undefined && {
                request_username: button.requestUsers.requestUsername,
              }),
              ...(button.requestUsers.requestPhoto !== undefined && {
                request_photo: button.requestUsers.requestPhoto,
              }),
            }
          }
          if (button.requestChat !== undefined) {
            btn.request_chat = {
              request_id: button.requestChat.requestId,
              chat_is_channel: button.requestChat.chatIsChannel,
              ...(button.requestChat.chatIsForum !== undefined && {
                chat_is_forum: button.requestChat.chatIsForum,
              }),
              ...(button.requestChat.chatHasUsername !== undefined && {
                chat_has_username: button.requestChat.chatHasUsername,
              }),
              ...(button.requestChat.chatIsCreated !== undefined && {
                chat_is_created: button.requestChat.chatIsCreated,
              }),
              ...(button.requestChat.botIsMember !== undefined && {
                bot_is_member: button.requestChat.botIsMember,
              }),
              ...(button.requestChat.requestTitle !== undefined && {
                request_title: button.requestChat.requestTitle,
              }),
              ...(button.requestChat.requestUsername !== undefined && {
                request_username: button.requestChat.requestUsername,
              }),
              ...(button.requestChat.requestPhoto !== undefined && {
                request_photo: button.requestChat.requestPhoto,
              }),
            }
          }
          if (button.requestContact !== undefined)
            btn.request_contact = button.requestContact
          if (button.requestLocation !== undefined)
            btn.request_location = button.requestLocation
          if (button.requestPoll !== undefined)
            btn.request_poll = { type: button.requestPoll.type }
          if (button.webApp !== undefined) btn.web_app = button.webApp

          return btn
        }),
      ),
    }

    if (markup.isPersistent !== undefined)
      result.is_persistent = markup.isPersistent
    if (markup.resizeKeyboard !== undefined)
      result.resize_keyboard = markup.resizeKeyboard
    if (markup.oneTimeKeyboard !== undefined)
      result.one_time_keyboard = markup.oneTimeKeyboard
    if (markup.inputFieldPlaceholder !== undefined)
      result.input_field_placeholder = markup.inputFieldPlaceholder
    if (markup.selective !== undefined) result.selective = markup.selective

    return result
  }

  if ('removeKeyboard' in markup) {
    const result: Record<string, unknown> = {
      remove_keyboard: markup.removeKeyboard,
    }
    if (markup.selective !== undefined) result.selective = markup.selective
    return result
  }

  if ('forceReply' in markup) {
    const result: Record<string, unknown> = {
      force_reply: markup.forceReply,
    }
    if (markup.inputFieldPlaceholder !== undefined)
      result.input_field_placeholder = markup.inputFieldPlaceholder
    if (markup.selective !== undefined) result.selective = markup.selective
    return result
  }

  return {}
}

function transformResponseToMessage(
  result: TelegramApiResponse['result'],
): Message {
  const message: Message = {
    messageId: result.message_id,
    date: result.date,
    chat: {
      id: result.chat.id,
      type: result.chat.type,
      ...(result.chat.title && { title: result.chat.title }),
      ...(result.chat.username && { username: result.chat.username }),
      ...(result.chat.first_name && { firstName: result.chat.first_name }),
      ...(result.chat.last_name && { lastName: result.chat.last_name }),
      ...(result.chat.is_forum !== undefined && {
        isForum: result.chat.is_forum,
      }),
    },
  }

  if (result.message_thread_id !== undefined) {
    message.messageThreadId = result.message_thread_id
  }

  if (result.from) {
    message.from = {
      id: result.from.id,
      isBot: result.from.is_bot,
      firstName: result.from.first_name,
      ...(result.from.last_name && { lastName: result.from.last_name }),
      ...(result.from.username && { username: result.from.username }),
      ...(result.from.language_code && {
        languageCode: result.from.language_code,
      }),
      ...(result.from.is_premium !== undefined && {
        isPremium: result.from.is_premium,
      }),
      ...(result.from.added_to_attachment_menu !== undefined && {
        addedToAttachmentMenu: result.from.added_to_attachment_menu,
      }),
    }
  }

  if (result.sender_chat) {
    message.senderChat = {
      id: result.sender_chat.id,
      type: result.sender_chat.type,
      ...(result.sender_chat.title && { title: result.sender_chat.title }),
      ...(result.sender_chat.username && {
        username: result.sender_chat.username,
      }),
      ...(result.sender_chat.first_name && {
        firstName: result.sender_chat.first_name,
      }),
      ...(result.sender_chat.last_name && {
        lastName: result.sender_chat.last_name,
      }),
      ...(result.sender_chat.is_forum !== undefined && {
        isForum: result.sender_chat.is_forum,
      }),
    }
  }

  if (result.text !== undefined) {
    message.text = result.text
  }

  if (result.entities) {
    message.entities = result.entities.map((entity) => ({
      type: entityTypeToCamelCase(entity.type),
      offset: entity.offset,
      length: entity.length,
      ...(entity.url && { url: entity.url }),
      ...(entity.user && {
        user: {
          id: entity.user.id,
          isBot: entity.user.is_bot,
          firstName: entity.user.first_name,
          ...(entity.user.last_name && { lastName: entity.user.last_name }),
          ...(entity.user.username && { username: entity.user.username }),
        },
      }),
      ...(entity.language && { language: entity.language }),
      ...(entity.custom_emoji_id && { customEmojiId: entity.custom_emoji_id }),
    }))
  }

  return message
}
