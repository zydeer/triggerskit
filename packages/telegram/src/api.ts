import type {
  BusinessConnection,
  BusinessMessagesDeleted,
  CallbackQuery,
  Chat,
  ChatBoost,
  ChatBoostRemoved,
  ChatBoostSource,
  ChatBoostUpdated,
  ChatInviteLink,
  ChatJoinRequest,
  ChatMember,
  ChatMemberUpdated,
  ChosenInlineResult,
  InlineQuery,
  LinkPreviewOptions,
  Location,
  Message,
  MessageEntity,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  OrderInfo,
  PaidMediaPurchased,
  Poll,
  PollAnswer,
  PollOption,
  PreCheckoutQuery,
  ReactionCount,
  ReactionType,
  ReplyMarkup,
  ReplyParameters,
  ShippingAddress,
  ShippingQuery,
  Update,
  User,
  WebhookInfo,
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

export type ApiCallbackQuery = {
  id: string
  from: ApiUser
  message?: ApiMessage
  inline_message_id?: string
  chat_instance: string
  data?: string
  game_short_name?: string
}

export type ApiUpdate = {
  update_id: number
  // Message updates
  message?: ApiMessage
  edited_message?: ApiMessage
  channel_post?: ApiMessage
  edited_channel_post?: ApiMessage
  // Business updates
  business_connection?: ApiBusinessConnection
  business_message?: ApiMessage
  edited_business_message?: ApiMessage
  deleted_business_messages?: ApiBusinessMessagesDeleted
  // Reaction updates
  message_reaction?: ApiMessageReactionUpdated
  message_reaction_count?: ApiMessageReactionCountUpdated
  // Inline mode updates
  inline_query?: ApiInlineQuery
  chosen_inline_result?: ApiChosenInlineResult
  // Callback query
  callback_query?: ApiCallbackQuery
  // Payment updates
  shipping_query?: ApiShippingQuery
  pre_checkout_query?: ApiPreCheckoutQuery
  purchased_paid_media?: ApiPaidMediaPurchased
  // Poll updates
  poll?: ApiPoll
  poll_answer?: ApiPollAnswer
  // Chat member updates
  my_chat_member?: ApiChatMemberUpdated
  chat_member?: ApiChatMemberUpdated
  chat_join_request?: ApiChatJoinRequest
  // Chat boost updates
  chat_boost?: ApiChatBoostUpdated
  removed_chat_boost?: ApiChatBoostRemoved
}

export type ApiWebhookInfo = {
  url: string
  has_custom_certificate: boolean
  pending_update_count: number
  ip_address?: string
  last_error_date?: number
  last_error_message?: string
  last_synchronization_error_date?: number
  max_connections?: number
  allowed_updates?: string[]
}

export type ApiLocation = {
  latitude: number
  longitude: number
  horizontal_accuracy?: number
  live_period?: number
  heading?: number
  proximity_alert_radius?: number
}

export type ApiInlineQuery = {
  id: string
  from: ApiUser
  query: string
  offset: string
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel'
  location?: ApiLocation
}

export type ApiChosenInlineResult = {
  result_id: string
  from: ApiUser
  location?: ApiLocation
  inline_message_id?: string
  query: string
}

export type ApiShippingAddress = {
  country_code: string
  state: string
  city: string
  street_line1: string
  street_line2: string
  post_code: string
}

export type ApiShippingQuery = {
  id: string
  from: ApiUser
  invoice_payload: string
  shipping_address: ApiShippingAddress
}

export type ApiOrderInfo = {
  name?: string
  phone_number?: string
  email?: string
  shipping_address?: ApiShippingAddress
}

export type ApiPreCheckoutQuery = {
  id: string
  from: ApiUser
  currency: string
  total_amount: number
  invoice_payload: string
  shipping_option_id?: string
  order_info?: ApiOrderInfo
}

export type ApiPollOption = {
  text: string
  text_entities?: ApiMessageEntity[]
  voter_count: number
}

export type ApiPoll = {
  id: string
  question: string
  question_entities?: ApiMessageEntity[]
  options: ApiPollOption[]
  total_voter_count: number
  is_closed: boolean
  is_anonymous: boolean
  type: 'regular' | 'quiz'
  allows_multiple_answers: boolean
  correct_option_id?: number
  explanation?: string
  explanation_entities?: ApiMessageEntity[]
  open_period?: number
  close_date?: number
}

export type ApiPollAnswer = {
  poll_id: string
  voter_chat?: ApiChat
  user?: ApiUser
  option_ids: number[]
}

export type ApiChatInviteLink = {
  invite_link: string
  creator: ApiUser
  creates_join_request: boolean
  is_primary: boolean
  is_revoked: boolean
  name?: string
  expire_date?: number
  member_limit?: number
  pending_join_request_count?: number
  subscription_period?: number
  subscription_price?: number
}

export type ApiChatMemberOwner = {
  status: 'creator'
  user: ApiUser
  is_anonymous: boolean
  custom_title?: string
}

export type ApiChatMemberAdministrator = {
  status: 'administrator'
  user: ApiUser
  can_be_edited: boolean
  is_anonymous: boolean
  can_manage_chat: boolean
  can_delete_messages: boolean
  can_manage_video_chats: boolean
  can_restrict_members: boolean
  can_promote_members: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_post_stories: boolean
  can_edit_stories: boolean
  can_delete_stories: boolean
  can_post_messages?: boolean
  can_edit_messages?: boolean
  can_pin_messages?: boolean
  can_manage_topics?: boolean
  custom_title?: string
}

export type ApiChatMemberMember = {
  status: 'member'
  user: ApiUser
  until_date?: number
}

export type ApiChatMemberRestricted = {
  status: 'restricted'
  user: ApiUser
  is_member: boolean
  can_send_messages: boolean
  can_send_audios: boolean
  can_send_documents: boolean
  can_send_photos: boolean
  can_send_videos: boolean
  can_send_video_notes: boolean
  can_send_voice_notes: boolean
  can_send_polls: boolean
  can_send_other_messages: boolean
  can_add_web_page_previews: boolean
  can_change_info: boolean
  can_invite_users: boolean
  can_pin_messages: boolean
  can_manage_topics: boolean
  until_date: number
}

export type ApiChatMemberLeft = {
  status: 'left'
  user: ApiUser
}

export type ApiChatMemberBanned = {
  status: 'kicked'
  user: ApiUser
  until_date: number
}

export type ApiChatMember =
  | ApiChatMemberOwner
  | ApiChatMemberAdministrator
  | ApiChatMemberMember
  | ApiChatMemberRestricted
  | ApiChatMemberLeft
  | ApiChatMemberBanned

export type ApiChatMemberUpdated = {
  chat: ApiChat
  from: ApiUser
  date: number
  old_chat_member: ApiChatMember
  new_chat_member: ApiChatMember
  invite_link?: ApiChatInviteLink
  via_join_request?: boolean
  via_chat_folder_invite_link?: boolean
}

export type ApiChatJoinRequest = {
  chat: ApiChat
  from: ApiUser
  user_chat_id: number
  date: number
  bio?: string
  invite_link?: ApiChatInviteLink
}

export type ApiReactionTypeEmoji = {
  type: 'emoji'
  emoji: string
}

export type ApiReactionTypeCustomEmoji = {
  type: 'custom_emoji'
  custom_emoji_id: string
}

export type ApiReactionTypePaid = {
  type: 'paid'
}

export type ApiReactionType =
  | ApiReactionTypeEmoji
  | ApiReactionTypeCustomEmoji
  | ApiReactionTypePaid

export type ApiReactionCount = {
  type: ApiReactionType
  total_count: number
}

export type ApiMessageReactionUpdated = {
  chat: ApiChat
  message_id: number
  user?: ApiUser
  actor_chat?: ApiChat
  date: number
  old_reaction: ApiReactionType[]
  new_reaction: ApiReactionType[]
}

export type ApiMessageReactionCountUpdated = {
  chat: ApiChat
  message_id: number
  date: number
  reactions: ApiReactionCount[]
}

export type ApiChatBoostSourcePremium = {
  source: 'premium'
  user: ApiUser
}

export type ApiChatBoostSourceGiftCode = {
  source: 'gift_code'
  user: ApiUser
}

export type ApiChatBoostSourceGiveaway = {
  source: 'giveaway'
  giveaway_message_id: number
  user?: ApiUser
  prize_star_count?: number
  is_unclaimed?: boolean
}

export type ApiChatBoostSource =
  | ApiChatBoostSourcePremium
  | ApiChatBoostSourceGiftCode
  | ApiChatBoostSourceGiveaway

export type ApiChatBoost = {
  boost_id: string
  add_date: number
  expiration_date: number
  source: ApiChatBoostSource
}

export type ApiChatBoostUpdated = {
  chat: ApiChat
  boost: ApiChatBoost
}

export type ApiChatBoostRemoved = {
  chat: ApiChat
  boost_id: string
  remove_date: number
  source: ApiChatBoostSource
}

export type ApiBusinessConnection = {
  id: string
  user: ApiUser
  user_chat_id: number
  date: number
  can_reply: boolean
  is_enabled: boolean
}

export type ApiBusinessMessagesDeleted = {
  business_connection_id: string
  chat: ApiChat
  message_ids: number[]
}

export type ApiPaidMediaPurchased = {
  from: ApiUser
  paid_media_payload: string
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

  callbackQuery(api: ApiCallbackQuery): CallbackQuery {
    return {
      id: api.id,
      from: fromApi.user(api.from),
      chatInstance: api.chat_instance,
      ...(api.message !== undefined && {
        message: fromApi.message(api.message),
      }),
      ...(api.inline_message_id !== undefined && {
        inlineMessageId: api.inline_message_id,
      }),
      ...(api.data !== undefined && { data: api.data }),
      ...(api.game_short_name !== undefined && {
        gameShortName: api.game_short_name,
      }),
    }
  },

  location(api: ApiLocation): Location {
    return {
      latitude: api.latitude,
      longitude: api.longitude,
      ...(api.horizontal_accuracy !== undefined && {
        horizontalAccuracy: api.horizontal_accuracy,
      }),
      ...(api.live_period !== undefined && { livePeriod: api.live_period }),
      ...(api.heading !== undefined && { heading: api.heading }),
      ...(api.proximity_alert_radius !== undefined && {
        proximityAlertRadius: api.proximity_alert_radius,
      }),
    }
  },

  inlineQuery(api: ApiInlineQuery): InlineQuery {
    return {
      id: api.id,
      from: fromApi.user(api.from),
      query: api.query,
      offset: api.offset,
      ...(api.chat_type !== undefined && { chatType: api.chat_type }),
      ...(api.location !== undefined && {
        location: fromApi.location(api.location),
      }),
    }
  },

  chosenInlineResult(api: ApiChosenInlineResult): ChosenInlineResult {
    return {
      resultId: api.result_id,
      from: fromApi.user(api.from),
      query: api.query,
      ...(api.location !== undefined && {
        location: fromApi.location(api.location),
      }),
      ...(api.inline_message_id !== undefined && {
        inlineMessageId: api.inline_message_id,
      }),
    }
  },

  shippingAddress(api: ApiShippingAddress): ShippingAddress {
    return {
      countryCode: api.country_code,
      state: api.state,
      city: api.city,
      streetLine1: api.street_line1,
      streetLine2: api.street_line2,
      postCode: api.post_code,
    }
  },

  shippingQuery(api: ApiShippingQuery): ShippingQuery {
    return {
      id: api.id,
      from: fromApi.user(api.from),
      invoicePayload: api.invoice_payload,
      shippingAddress: fromApi.shippingAddress(api.shipping_address),
    }
  },

  orderInfo(api: ApiOrderInfo): OrderInfo {
    return {
      ...(api.name !== undefined && { name: api.name }),
      ...(api.phone_number !== undefined && { phoneNumber: api.phone_number }),
      ...(api.email !== undefined && { email: api.email }),
      ...(api.shipping_address !== undefined && {
        shippingAddress: fromApi.shippingAddress(api.shipping_address),
      }),
    }
  },

  preCheckoutQuery(api: ApiPreCheckoutQuery): PreCheckoutQuery {
    return {
      id: api.id,
      from: fromApi.user(api.from),
      currency: api.currency,
      totalAmount: api.total_amount,
      invoicePayload: api.invoice_payload,
      ...(api.shipping_option_id !== undefined && {
        shippingOptionId: api.shipping_option_id,
      }),
      ...(api.order_info !== undefined && {
        orderInfo: fromApi.orderInfo(api.order_info),
      }),
    }
  },

  pollOption(api: ApiPollOption): PollOption {
    return {
      text: api.text,
      voterCount: api.voter_count,
      ...(api.text_entities !== undefined && {
        textEntities: api.text_entities.map(fromApi.messageEntity),
      }),
    }
  },

  poll(api: ApiPoll): Poll {
    return {
      id: api.id,
      question: api.question,
      options: api.options.map(fromApi.pollOption),
      totalVoterCount: api.total_voter_count,
      isClosed: api.is_closed,
      isAnonymous: api.is_anonymous,
      type: api.type,
      allowsMultipleAnswers: api.allows_multiple_answers,
      ...(api.question_entities !== undefined && {
        questionEntities: api.question_entities.map(fromApi.messageEntity),
      }),
      ...(api.correct_option_id !== undefined && {
        correctOptionId: api.correct_option_id,
      }),
      ...(api.explanation !== undefined && { explanation: api.explanation }),
      ...(api.explanation_entities !== undefined && {
        explanationEntities: api.explanation_entities.map(
          fromApi.messageEntity,
        ),
      }),
      ...(api.open_period !== undefined && { openPeriod: api.open_period }),
      ...(api.close_date !== undefined && { closeDate: api.close_date }),
    }
  },

  pollAnswer(api: ApiPollAnswer): PollAnswer {
    return {
      pollId: api.poll_id,
      optionIds: api.option_ids,
      ...(api.voter_chat !== undefined && {
        voterChat: fromApi.chat(api.voter_chat),
      }),
      ...(api.user !== undefined && { user: fromApi.user(api.user) }),
    }
  },

  chatInviteLink(api: ApiChatInviteLink): ChatInviteLink {
    return {
      inviteLink: api.invite_link,
      creator: fromApi.user(api.creator),
      createsJoinRequest: api.creates_join_request,
      isPrimary: api.is_primary,
      isRevoked: api.is_revoked,
      ...(api.name !== undefined && { name: api.name }),
      ...(api.expire_date !== undefined && { expireDate: api.expire_date }),
      ...(api.member_limit !== undefined && { memberLimit: api.member_limit }),
      ...(api.pending_join_request_count !== undefined && {
        pendingJoinRequestCount: api.pending_join_request_count,
      }),
      ...(api.subscription_period !== undefined && {
        subscriptionPeriod: api.subscription_period,
      }),
      ...(api.subscription_price !== undefined && {
        subscriptionPrice: api.subscription_price,
      }),
    }
  },

  chatMember(api: ApiChatMember): ChatMember {
    switch (api.status) {
      case 'creator':
        return {
          status: 'creator',
          user: fromApi.user(api.user),
          isAnonymous: api.is_anonymous,
          ...(api.custom_title !== undefined && {
            customTitle: api.custom_title,
          }),
        }
      case 'administrator':
        return {
          status: 'administrator',
          user: fromApi.user(api.user),
          canBeEdited: api.can_be_edited,
          isAnonymous: api.is_anonymous,
          canManageChat: api.can_manage_chat,
          canDeleteMessages: api.can_delete_messages,
          canManageVideoChats: api.can_manage_video_chats,
          canRestrictMembers: api.can_restrict_members,
          canPromoteMembers: api.can_promote_members,
          canChangeInfo: api.can_change_info,
          canInviteUsers: api.can_invite_users,
          canPostStories: api.can_post_stories,
          canEditStories: api.can_edit_stories,
          canDeleteStories: api.can_delete_stories,
          ...(api.can_post_messages !== undefined && {
            canPostMessages: api.can_post_messages,
          }),
          ...(api.can_edit_messages !== undefined && {
            canEditMessages: api.can_edit_messages,
          }),
          ...(api.can_pin_messages !== undefined && {
            canPinMessages: api.can_pin_messages,
          }),
          ...(api.can_manage_topics !== undefined && {
            canManageTopics: api.can_manage_topics,
          }),
          ...(api.custom_title !== undefined && {
            customTitle: api.custom_title,
          }),
        }
      case 'member':
        return {
          status: 'member',
          user: fromApi.user(api.user),
          ...(api.until_date !== undefined && { untilDate: api.until_date }),
        }
      case 'restricted':
        return {
          status: 'restricted',
          user: fromApi.user(api.user),
          isMember: api.is_member,
          canSendMessages: api.can_send_messages,
          canSendAudios: api.can_send_audios,
          canSendDocuments: api.can_send_documents,
          canSendPhotos: api.can_send_photos,
          canSendVideos: api.can_send_videos,
          canSendVideoNotes: api.can_send_video_notes,
          canSendVoiceNotes: api.can_send_voice_notes,
          canSendPolls: api.can_send_polls,
          canSendOtherMessages: api.can_send_other_messages,
          canAddWebPagePreviews: api.can_add_web_page_previews,
          canChangeInfo: api.can_change_info,
          canInviteUsers: api.can_invite_users,
          canPinMessages: api.can_pin_messages,
          canManageTopics: api.can_manage_topics,
          untilDate: api.until_date,
        }
      case 'left':
        return {
          status: 'left',
          user: fromApi.user(api.user),
        }
      case 'kicked':
        return {
          status: 'kicked',
          user: fromApi.user(api.user),
          untilDate: api.until_date,
        }
    }
  },

  chatMemberUpdated(api: ApiChatMemberUpdated): ChatMemberUpdated {
    return {
      chat: fromApi.chat(api.chat),
      from: fromApi.user(api.from),
      date: api.date,
      oldChatMember: fromApi.chatMember(api.old_chat_member),
      newChatMember: fromApi.chatMember(api.new_chat_member),
      ...(api.invite_link !== undefined && {
        inviteLink: fromApi.chatInviteLink(api.invite_link),
      }),
      ...(api.via_join_request !== undefined && {
        viaJoinRequest: api.via_join_request,
      }),
      ...(api.via_chat_folder_invite_link !== undefined && {
        viaChatFolderInviteLink: api.via_chat_folder_invite_link,
      }),
    }
  },

  chatJoinRequest(api: ApiChatJoinRequest): ChatJoinRequest {
    return {
      chat: fromApi.chat(api.chat),
      from: fromApi.user(api.from),
      userChatId: api.user_chat_id,
      date: api.date,
      ...(api.bio !== undefined && { bio: api.bio }),
      ...(api.invite_link !== undefined && {
        inviteLink: fromApi.chatInviteLink(api.invite_link),
      }),
    }
  },

  reactionType(api: ApiReactionType): ReactionType {
    switch (api.type) {
      case 'emoji':
        return { type: 'emoji', emoji: api.emoji }
      case 'custom_emoji':
        return { type: 'customEmoji', customEmojiId: api.custom_emoji_id }
      case 'paid':
        return { type: 'paid' }
    }
  },

  reactionCount(api: ApiReactionCount): ReactionCount {
    return {
      type: fromApi.reactionType(api.type),
      totalCount: api.total_count,
    }
  },

  messageReactionUpdated(
    api: ApiMessageReactionUpdated,
  ): MessageReactionUpdated {
    return {
      chat: fromApi.chat(api.chat),
      messageId: api.message_id,
      date: api.date,
      oldReaction: api.old_reaction.map(fromApi.reactionType),
      newReaction: api.new_reaction.map(fromApi.reactionType),
      ...(api.user !== undefined && { user: fromApi.user(api.user) }),
      ...(api.actor_chat !== undefined && {
        actorChat: fromApi.chat(api.actor_chat),
      }),
    }
  },

  messageReactionCountUpdated(
    api: ApiMessageReactionCountUpdated,
  ): MessageReactionCountUpdated {
    return {
      chat: fromApi.chat(api.chat),
      messageId: api.message_id,
      date: api.date,
      reactions: api.reactions.map(fromApi.reactionCount),
    }
  },

  chatBoostSource(api: ApiChatBoostSource): ChatBoostSource {
    switch (api.source) {
      case 'premium':
        return { source: 'premium', user: fromApi.user(api.user) }
      case 'gift_code':
        return { source: 'giftCode', user: fromApi.user(api.user) }
      case 'giveaway':
        return {
          source: 'giveaway',
          giveawayMessageId: api.giveaway_message_id,
          ...(api.user !== undefined && { user: fromApi.user(api.user) }),
          ...(api.prize_star_count !== undefined && {
            prizeStarCount: api.prize_star_count,
          }),
          ...(api.is_unclaimed !== undefined && {
            isUnclaimed: api.is_unclaimed,
          }),
        }
    }
  },

  chatBoost(api: ApiChatBoost): ChatBoost {
    return {
      boostId: api.boost_id,
      addDate: api.add_date,
      expirationDate: api.expiration_date,
      source: fromApi.chatBoostSource(api.source),
    }
  },

  chatBoostUpdated(api: ApiChatBoostUpdated): ChatBoostUpdated {
    return {
      chat: fromApi.chat(api.chat),
      boost: fromApi.chatBoost(api.boost),
    }
  },

  chatBoostRemoved(api: ApiChatBoostRemoved): ChatBoostRemoved {
    return {
      chat: fromApi.chat(api.chat),
      boostId: api.boost_id,
      removeDate: api.remove_date,
      source: fromApi.chatBoostSource(api.source),
    }
  },

  businessConnection(api: ApiBusinessConnection): BusinessConnection {
    return {
      id: api.id,
      user: fromApi.user(api.user),
      userChatId: api.user_chat_id,
      date: api.date,
      canReply: api.can_reply,
      isEnabled: api.is_enabled,
    }
  },

  businessMessagesDeleted(
    api: ApiBusinessMessagesDeleted,
  ): BusinessMessagesDeleted {
    return {
      businessConnectionId: api.business_connection_id,
      chat: fromApi.chat(api.chat),
      messageIds: api.message_ids,
    }
  },

  paidMediaPurchased(api: ApiPaidMediaPurchased): PaidMediaPurchased {
    return {
      from: fromApi.user(api.from),
      paidMediaPayload: api.paid_media_payload,
    }
  },

  update(api: ApiUpdate): Update {
    return {
      updateId: api.update_id,
      // Message updates
      ...(api.message !== undefined && {
        message: fromApi.message(api.message),
      }),
      ...(api.edited_message !== undefined && {
        editedMessage: fromApi.message(api.edited_message),
      }),
      ...(api.channel_post !== undefined && {
        channelPost: fromApi.message(api.channel_post),
      }),
      ...(api.edited_channel_post !== undefined && {
        editedChannelPost: fromApi.message(api.edited_channel_post),
      }),
      // Business updates
      ...(api.business_connection !== undefined && {
        businessConnection: fromApi.businessConnection(api.business_connection),
      }),
      ...(api.business_message !== undefined && {
        businessMessage: fromApi.message(api.business_message),
      }),
      ...(api.edited_business_message !== undefined && {
        editedBusinessMessage: fromApi.message(api.edited_business_message),
      }),
      ...(api.deleted_business_messages !== undefined && {
        deletedBusinessMessages: fromApi.businessMessagesDeleted(
          api.deleted_business_messages,
        ),
      }),
      // Reaction updates
      ...(api.message_reaction !== undefined && {
        messageReaction: fromApi.messageReactionUpdated(api.message_reaction),
      }),
      ...(api.message_reaction_count !== undefined && {
        messageReactionCount: fromApi.messageReactionCountUpdated(
          api.message_reaction_count,
        ),
      }),
      // Inline mode updates
      ...(api.inline_query !== undefined && {
        inlineQuery: fromApi.inlineQuery(api.inline_query),
      }),
      ...(api.chosen_inline_result !== undefined && {
        chosenInlineResult: fromApi.chosenInlineResult(
          api.chosen_inline_result,
        ),
      }),
      // Callback query
      ...(api.callback_query !== undefined && {
        callbackQuery: fromApi.callbackQuery(api.callback_query),
      }),
      // Payment updates
      ...(api.shipping_query !== undefined && {
        shippingQuery: fromApi.shippingQuery(api.shipping_query),
      }),
      ...(api.pre_checkout_query !== undefined && {
        preCheckoutQuery: fromApi.preCheckoutQuery(api.pre_checkout_query),
      }),
      ...(api.purchased_paid_media !== undefined && {
        purchasedPaidMedia: fromApi.paidMediaPurchased(
          api.purchased_paid_media,
        ),
      }),
      // Poll updates
      ...(api.poll !== undefined && {
        poll: fromApi.poll(api.poll),
      }),
      ...(api.poll_answer !== undefined && {
        pollAnswer: fromApi.pollAnswer(api.poll_answer),
      }),
      // Chat member updates
      ...(api.my_chat_member !== undefined && {
        myChatMember: fromApi.chatMemberUpdated(api.my_chat_member),
      }),
      ...(api.chat_member !== undefined && {
        chatMember: fromApi.chatMemberUpdated(api.chat_member),
      }),
      ...(api.chat_join_request !== undefined && {
        chatJoinRequest: fromApi.chatJoinRequest(api.chat_join_request),
      }),
      // Chat boost updates
      ...(api.chat_boost !== undefined && {
        chatBoost: fromApi.chatBoostUpdated(api.chat_boost),
      }),
      ...(api.removed_chat_boost !== undefined && {
        removedChatBoost: fromApi.chatBoostRemoved(api.removed_chat_boost),
      }),
    }
  },

  webhookInfo(api: ApiWebhookInfo): WebhookInfo {
    return {
      url: api.url,
      hasCustomCertificate: api.has_custom_certificate,
      pendingUpdateCount: api.pending_update_count,
      ...(api.ip_address !== undefined && { ipAddress: api.ip_address }),
      ...(api.last_error_date !== undefined && {
        lastErrorDate: api.last_error_date,
      }),
      ...(api.last_error_message !== undefined && {
        lastErrorMessage: api.last_error_message,
      }),
      ...(api.last_synchronization_error_date !== undefined && {
        lastSynchronizationErrorDate: api.last_synchronization_error_date,
      }),
      ...(api.max_connections !== undefined && {
        maxConnections: api.max_connections,
      }),
      ...(api.allowed_updates !== undefined && {
        allowedUpdates: api.allowed_updates,
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
