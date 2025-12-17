import type {
  Chat,
  LinkPreviewOptions,
  Message,
  MessageEntity,
  ReplyMarkup,
  ReplyParameters,
  User,
} from './types'

export type ApiUser = {
  id: number
  is_bot: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  added_to_attachment_menu?: boolean
  can_join_groups?: boolean
  can_read_all_group_messages?: boolean
  supports_inline_queries?: boolean
  can_connect_to_business?: boolean
  has_main_web_app?: boolean
}

export type ApiChat = {
  id: number
  type: 'private' | 'group' | 'supergroup' | 'channel'
  title?: string
  username?: string
  first_name?: string
  last_name?: string
  is_forum?: boolean
}

export type ApiMessageEntity = {
  type: string
  offset: number
  length: number
  url?: string
  user?: ApiUser
  language?: string
  custom_emoji_id?: string
}

export type ApiMessage = {
  message_id: number
  message_thread_id?: number
  from?: ApiUser
  sender_chat?: ApiChat
  date: number
  chat: ApiChat
  text?: string
  entities?: ApiMessageEntity[]
}

const ENTITY_TYPE_TO_API: Record<MessageEntity['type'], string> = {
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

const ENTITY_TYPE_FROM_API: Record<string, MessageEntity['type']> = {
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

export const fromApi = {
  user(api: ApiUser): User {
    return {
      id: api.id,
      isBot: api.is_bot,
      firstName: api.first_name,
      ...(api.last_name !== undefined && { lastName: api.last_name }),
      ...(api.username !== undefined && { username: api.username }),
      ...(api.language_code !== undefined && {
        languageCode: api.language_code,
      }),
      ...(api.is_premium !== undefined && { isPremium: api.is_premium }),
      ...(api.added_to_attachment_menu !== undefined && {
        addedToAttachmentMenu: api.added_to_attachment_menu,
      }),
      ...(api.can_join_groups !== undefined && {
        canJoinGroups: api.can_join_groups,
      }),
      ...(api.can_read_all_group_messages !== undefined && {
        canReadAllGroupMessages: api.can_read_all_group_messages,
      }),
      ...(api.supports_inline_queries !== undefined && {
        supportsInlineQueries: api.supports_inline_queries,
      }),
      ...(api.can_connect_to_business !== undefined && {
        canConnectToBusiness: api.can_connect_to_business,
      }),
      ...(api.has_main_web_app !== undefined && {
        hasMainWebApp: api.has_main_web_app,
      }),
    }
  },

  chat(api: ApiChat): Chat {
    return {
      id: api.id,
      type: api.type,
      ...(api.title !== undefined && { title: api.title }),
      ...(api.username !== undefined && { username: api.username }),
      ...(api.first_name !== undefined && { firstName: api.first_name }),
      ...(api.last_name !== undefined && { lastName: api.last_name }),
      ...(api.is_forum !== undefined && { isForum: api.is_forum }),
    }
  },

  messageEntity(api: ApiMessageEntity): MessageEntity {
    return {
      type: ENTITY_TYPE_FROM_API[api.type] ?? 'mention',
      offset: api.offset,
      length: api.length,
      ...(api.url !== undefined && { url: api.url }),
      ...(api.user !== undefined && { user: fromApi.user(api.user) }),
      ...(api.language !== undefined && { language: api.language }),
      ...(api.custom_emoji_id !== undefined && {
        customEmojiId: api.custom_emoji_id,
      }),
    }
  },

  message(api: ApiMessage): Message {
    return {
      messageId: api.message_id,
      date: api.date,
      chat: fromApi.chat(api.chat),
      ...(api.message_thread_id !== undefined && {
        messageThreadId: api.message_thread_id,
      }),
      ...(api.from !== undefined && { from: fromApi.user(api.from) }),
      ...(api.sender_chat !== undefined && {
        senderChat: fromApi.chat(api.sender_chat),
      }),
      ...(api.text !== undefined && { text: api.text }),
      ...(api.entities !== undefined && {
        entities: api.entities.map(fromApi.messageEntity),
      }),
    }
  },
}

export const toApi = {
  user(user: User): ApiUser {
    return {
      id: user.id,
      is_bot: user.isBot,
      first_name: user.firstName,
      ...(user.lastName !== undefined && { last_name: user.lastName }),
      ...(user.username !== undefined && { username: user.username }),
      ...(user.languageCode !== undefined && {
        language_code: user.languageCode,
      }),
      ...(user.isPremium !== undefined && { is_premium: user.isPremium }),
      ...(user.addedToAttachmentMenu !== undefined && {
        added_to_attachment_menu: user.addedToAttachmentMenu,
      }),
      ...(user.canJoinGroups !== undefined && {
        can_join_groups: user.canJoinGroups,
      }),
      ...(user.canReadAllGroupMessages !== undefined && {
        can_read_all_group_messages: user.canReadAllGroupMessages,
      }),
      ...(user.supportsInlineQueries !== undefined && {
        supports_inline_queries: user.supportsInlineQueries,
      }),
      ...(user.canConnectToBusiness !== undefined && {
        can_connect_to_business: user.canConnectToBusiness,
      }),
      ...(user.hasMainWebApp !== undefined && {
        has_main_web_app: user.hasMainWebApp,
      }),
    }
  },

  messageEntity(entity: MessageEntity): Record<string, unknown> {
    return {
      type: ENTITY_TYPE_TO_API[entity.type],
      offset: entity.offset,
      length: entity.length,
      ...(entity.url !== undefined && { url: entity.url }),
      ...(entity.user !== undefined && { user: toApi.user(entity.user) }),
      ...(entity.language !== undefined && { language: entity.language }),
      ...(entity.customEmojiId !== undefined && {
        custom_emoji_id: entity.customEmojiId,
      }),
    }
  },

  linkPreviewOptions(options: LinkPreviewOptions): Record<string, unknown> {
    return {
      ...(options.isDisabled !== undefined && {
        is_disabled: options.isDisabled,
      }),
      ...(options.url !== undefined && { url: options.url }),
      ...(options.preferSmallMedia !== undefined && {
        prefer_small_media: options.preferSmallMedia,
      }),
      ...(options.preferLargeMedia !== undefined && {
        prefer_large_media: options.preferLargeMedia,
      }),
      ...(options.showAboveText !== undefined && {
        show_above_text: options.showAboveText,
      }),
    }
  },

  replyParameters(params: ReplyParameters): Record<string, unknown> {
    return {
      message_id: params.messageId,
      ...(params.chatId !== undefined && { chat_id: params.chatId }),
      ...(params.allowSendingWithoutReply !== undefined && {
        allow_sending_without_reply: params.allowSendingWithoutReply,
      }),
      ...(params.quote !== undefined && { quote: params.quote }),
      ...(params.quoteParseMode !== undefined && {
        quote_parse_mode: params.quoteParseMode,
      }),
      ...(params.quoteEntities !== undefined && {
        quote_entities: params.quoteEntities.map(toApi.messageEntity),
      }),
      ...(params.quotePosition !== undefined && {
        quote_position: params.quotePosition,
      }),
    }
  },

  replyMarkup(markup: ReplyMarkup): Record<string, unknown> {
    if ('inlineKeyboard' in markup) {
      return {
        inline_keyboard: markup.inlineKeyboard.map((row) =>
          row.map((button) => ({
            text: button.text,
            ...(button.url !== undefined && { url: button.url }),
            ...(button.callbackData !== undefined && {
              callback_data: button.callbackData,
            }),
            ...(button.webApp !== undefined && { web_app: button.webApp }),
            ...(button.loginUrl !== undefined && {
              login_url: {
                url: button.loginUrl.url,
                ...(button.loginUrl.forwardText !== undefined && {
                  forward_text: button.loginUrl.forwardText,
                }),
                ...(button.loginUrl.botUsername !== undefined && {
                  bot_username: button.loginUrl.botUsername,
                }),
                ...(button.loginUrl.requestWriteAccess !== undefined && {
                  request_write_access: button.loginUrl.requestWriteAccess,
                }),
              },
            }),
            ...(button.switchInlineQuery !== undefined && {
              switch_inline_query: button.switchInlineQuery,
            }),
            ...(button.switchInlineQueryCurrentChat !== undefined && {
              switch_inline_query_current_chat:
                button.switchInlineQueryCurrentChat,
            }),
            ...(button.switchInlineQueryChosenChat !== undefined && {
              switch_inline_query_chosen_chat: {
                ...(button.switchInlineQueryChosenChat.query !== undefined && {
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
              },
            }),
            ...(button.copyText !== undefined && {
              copy_text: { text: button.copyText.text },
            }),
            ...(button.callbackGame !== undefined && {
              callback_game: button.callbackGame,
            }),
            ...(button.pay !== undefined && { pay: button.pay }),
          })),
        ),
      }
    }

    if ('keyboard' in markup) {
      return {
        keyboard: markup.keyboard.map((row) =>
          row.map((button) => ({
            text: button.text,
            ...(button.requestUsers !== undefined && {
              request_users: {
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
              },
            }),
            ...(button.requestChat !== undefined && {
              request_chat: {
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
              },
            }),
            ...(button.requestContact !== undefined && {
              request_contact: button.requestContact,
            }),
            ...(button.requestLocation !== undefined && {
              request_location: button.requestLocation,
            }),
            ...(button.requestPoll !== undefined && {
              request_poll: { type: button.requestPoll.type },
            }),
            ...(button.webApp !== undefined && { web_app: button.webApp }),
          })),
        ),
        ...(markup.isPersistent !== undefined && {
          is_persistent: markup.isPersistent,
        }),
        ...(markup.resizeKeyboard !== undefined && {
          resize_keyboard: markup.resizeKeyboard,
        }),
        ...(markup.oneTimeKeyboard !== undefined && {
          one_time_keyboard: markup.oneTimeKeyboard,
        }),
        ...(markup.inputFieldPlaceholder !== undefined && {
          input_field_placeholder: markup.inputFieldPlaceholder,
        }),
        ...(markup.selective !== undefined && { selective: markup.selective }),
      }
    }

    if ('removeKeyboard' in markup) {
      return {
        remove_keyboard: markup.removeKeyboard,
        ...(markup.selective !== undefined && { selective: markup.selective }),
      }
    }

    if ('forceReply' in markup) {
      return {
        force_reply: markup.forceReply,
        ...(markup.inputFieldPlaceholder !== undefined && {
          input_field_placeholder: markup.inputFieldPlaceholder,
        }),
        ...(markup.selective !== undefined && { selective: markup.selective }),
      }
    }

    return {}
  },
}
