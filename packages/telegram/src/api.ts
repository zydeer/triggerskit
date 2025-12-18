import type {
  Animation,
  Audio,
  BackgroundFill,
  BackgroundType,
  BusinessConnection,
  BusinessMessagesDeleted,
  CallbackQuery,
  Chat,
  ChatBackground,
  ChatBoost,
  ChatBoostAdded,
  ChatBoostRemoved,
  ChatBoostSource,
  ChatBoostUpdated,
  ChatInviteLink,
  ChatJoinRequest,
  ChatMember,
  ChatMemberUpdated,
  ChatShared,
  ChosenInlineResult,
  Contact,
  Dice,
  Document,
  ExternalReplyInfo,
  File,
  ForumTopicClosed,
  ForumTopicCreated,
  ForumTopicEdited,
  ForumTopicReopened,
  Game,
  GeneralForumTopicHidden,
  GeneralForumTopicUnhidden,
  Giveaway,
  GiveawayCompleted,
  GiveawayCreated,
  GiveawayWinners,
  InlineKeyboardMarkup,
  InlineQuery,
  Invoice,
  LinkPreviewOptions,
  Location,
  MaskPosition,
  Message,
  MessageAutoDeleteTimerChanged,
  MessageEntity,
  MessageOrigin,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  OrderInfo,
  PaidMedia,
  PaidMediaInfo,
  PaidMediaPurchased,
  PhotoSize,
  Poll,
  PollAnswer,
  PollOption,
  PreCheckoutQuery,
  ProximityAlertTriggered,
  ReactionCount,
  ReactionType,
  RefundedPayment,
  ReplyMarkup,
  ReplyParameters,
  SharedUser,
  ShippingAddress,
  ShippingQuery,
  Sticker,
  Story,
  SuccessfulPayment,
  TextQuote,
  Update,
  User,
  UsersShared,
  Venue,
  Video,
  VideoChatEnded,
  VideoChatParticipantsInvited,
  VideoChatScheduled,
  VideoChatStarted,
  VideoNote,
  Voice,
  WebAppData,
  WebhookInfo,
  WriteAccessAllowed,
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

export type ApiPhotoSize = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size?: number
}

export type ApiAnimation = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  duration: number
  thumbnail?: ApiPhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export type ApiAudio = {
  file_id: string
  file_unique_id: string
  duration: number
  performer?: string
  title?: string
  file_name?: string
  mime_type?: string
  file_size?: number
  thumbnail?: ApiPhotoSize
}

export type ApiDocument = {
  file_id: string
  file_unique_id: string
  thumbnail?: ApiPhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export type ApiVideo = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  duration: number
  thumbnail?: ApiPhotoSize
  file_name?: string
  mime_type?: string
  file_size?: number
}

export type ApiVideoNote = {
  file_id: string
  file_unique_id: string
  length: number
  duration: number
  thumbnail?: ApiPhotoSize
  file_size?: number
}

export type ApiVoice = {
  file_id: string
  file_unique_id: string
  duration: number
  mime_type?: string
  file_size?: number
}

export type ApiContact = {
  phone_number: string
  first_name: string
  last_name?: string
  user_id?: number
  vcard?: string
}

export type ApiDice = {
  emoji: string
  value: number
}

export type ApiVenue = {
  location: ApiLocation
  title: string
  address: string
  foursquare_id?: string
  foursquare_type?: string
  google_place_id?: string
  google_place_type?: string
}

export type ApiStory = {
  chat: ApiChat
  id: number
}

export type ApiFile = {
  file_id: string
  file_unique_id: string
  file_size?: number
  file_path?: string
}

export type ApiMaskPosition = {
  point: 'forehead' | 'eyes' | 'mouth' | 'chin'
  x_shift: number
  y_shift: number
  scale: number
}

export type ApiSticker = {
  file_id: string
  file_unique_id: string
  type: 'regular' | 'mask' | 'custom_emoji'
  width: number
  height: number
  is_animated: boolean
  is_video: boolean
  thumbnail?: ApiPhotoSize
  emoji?: string
  set_name?: string
  premium_animation?: ApiFile
  mask_position?: ApiMaskPosition
  custom_emoji_id?: string
  needs_repainting?: boolean
  file_size?: number
}

export type ApiGame = {
  title: string
  description: string
  photo: ApiPhotoSize[]
  text?: string
  text_entities?: ApiMessageEntity[]
  animation?: ApiAnimation
}

export type ApiPaidMediaPreview = {
  type: 'preview'
  width?: number
  height?: number
  duration?: number
}

export type ApiPaidMediaPhoto = {
  type: 'photo'
  photo: ApiPhotoSize[]
}

export type ApiPaidMediaVideo = {
  type: 'video'
  video: ApiVideo
}

export type ApiPaidMedia =
  | ApiPaidMediaPreview
  | ApiPaidMediaPhoto
  | ApiPaidMediaVideo

export type ApiPaidMediaInfo = {
  star_count: number
  paid_media: ApiPaidMedia[]
}

export type ApiMessageOriginUser = {
  type: 'user'
  date: number
  sender_user: ApiUser
}

export type ApiMessageOriginHiddenUser = {
  type: 'hidden_user'
  date: number
  sender_user_name: string
}

export type ApiMessageOriginChat = {
  type: 'chat'
  date: number
  sender_chat: ApiChat
  author_signature?: string
}

export type ApiMessageOriginChannel = {
  type: 'channel'
  date: number
  chat: ApiChat
  message_id: number
  author_signature?: string
}

export type ApiMessageOrigin =
  | ApiMessageOriginUser
  | ApiMessageOriginHiddenUser
  | ApiMessageOriginChat
  | ApiMessageOriginChannel

export type ApiTextQuote = {
  text: string
  entities?: ApiMessageEntity[]
  position: number
  is_manual?: boolean
}

export type ApiExternalReplyInfo = {
  origin: ApiMessageOrigin
  chat?: ApiChat
  message_id?: number
  link_preview_options?: ApiLinkPreviewOptions
  animation?: ApiAnimation
  audio?: ApiAudio
  document?: ApiDocument
  paid_media?: ApiPaidMediaInfo
  photo?: ApiPhotoSize[]
  sticker?: ApiSticker
  story?: ApiStory
  video?: ApiVideo
  video_note?: ApiVideoNote
  voice?: ApiVoice
  has_media_spoiler?: boolean
  contact?: ApiContact
  dice?: ApiDice
  game?: ApiGame
  giveaway?: ApiGiveaway
  giveaway_winners?: ApiGiveawayWinners
  invoice?: ApiInvoice
  location?: ApiLocation
  poll?: ApiPoll
  venue?: ApiVenue
}

export type ApiLinkPreviewOptions = {
  is_disabled?: boolean
  url?: string
  prefer_small_media?: boolean
  prefer_large_media?: boolean
  show_above_text?: boolean
}

export type ApiInvoice = {
  title: string
  description: string
  start_parameter: string
  currency: string
  total_amount: number
}

export type ApiSuccessfulPayment = {
  currency: string
  total_amount: number
  invoice_payload: string
  subscription_expiration_date?: number
  is_first_recurring?: boolean
  is_recurring?: boolean
  shipping_option_id?: string
  order_info?: ApiOrderInfo
  telegram_payment_charge_id: string
  provider_payment_charge_id: string
}

export type ApiRefundedPayment = {
  currency: string
  total_amount: number
  invoice_payload: string
  telegram_payment_charge_id: string
  provider_payment_charge_id?: string
}

export type ApiSharedUser = {
  user_id: number
  first_name?: string
  last_name?: string
  username?: string
  photo?: ApiPhotoSize[]
}

export type ApiUsersShared = {
  request_id: number
  users: ApiSharedUser[]
}

export type ApiChatShared = {
  request_id: number
  chat_id: number
  title?: string
  username?: string
  photo?: ApiPhotoSize[]
}

export type ApiWriteAccessAllowed = {
  from_request?: boolean
  web_app_name?: string
  from_attachment_menu?: boolean
}

export type ApiVideoChatScheduled = {
  start_date: number
}

export type ApiVideoChatStarted = Record<string, never>

export type ApiVideoChatEnded = {
  duration: number
}

export type ApiVideoChatParticipantsInvited = {
  users: ApiUser[]
}

export type ApiForumTopicCreated = {
  name: string
  icon_color: number
  icon_custom_emoji_id?: string
}

export type ApiForumTopicClosed = Record<string, never>

export type ApiForumTopicEdited = {
  name?: string
  icon_custom_emoji_id?: string
}

export type ApiForumTopicReopened = Record<string, never>

export type ApiGeneralForumTopicHidden = Record<string, never>

export type ApiGeneralForumTopicUnhidden = Record<string, never>

export type ApiProximityAlertTriggered = {
  traveler: ApiUser
  watcher: ApiUser
  distance: number
}

export type ApiChatBoostAdded = {
  boost_count: number
}

export type ApiBackgroundFillSolid = {
  type: 'solid'
  color: number
}

export type ApiBackgroundFillGradient = {
  type: 'gradient'
  top_color: number
  bottom_color: number
  rotation_angle: number
}

export type ApiBackgroundFillFreeformGradient = {
  type: 'freeform_gradient'
  colors: number[]
}

export type ApiBackgroundFill =
  | ApiBackgroundFillSolid
  | ApiBackgroundFillGradient
  | ApiBackgroundFillFreeformGradient

export type ApiBackgroundTypeFill = {
  type: 'fill'
  fill: ApiBackgroundFill
  dark_theme_dimming: number
}

export type ApiBackgroundTypeWallpaper = {
  type: 'wallpaper'
  document: ApiDocument
  dark_theme_dimming: number
  is_blurred?: boolean
  is_moving?: boolean
}

export type ApiBackgroundTypePattern = {
  type: 'pattern'
  document: ApiDocument
  fill: ApiBackgroundFill
  intensity: number
  is_inverted?: boolean
  is_moving?: boolean
}

export type ApiBackgroundTypeChatTheme = {
  type: 'chat_theme'
  theme_name: string
}

export type ApiBackgroundType =
  | ApiBackgroundTypeFill
  | ApiBackgroundTypeWallpaper
  | ApiBackgroundTypePattern
  | ApiBackgroundTypeChatTheme

export type ApiChatBackground = {
  type: ApiBackgroundType
}

export type ApiGiveawayCreated = {
  prize_star_count?: number
}

export type ApiGiveaway = {
  chats: ApiChat[]
  winners_selection_date: number
  winner_count: number
  only_new_members?: boolean
  has_public_winners?: boolean
  prize_description?: string
  country_codes?: string[]
  prize_star_count?: number
  premium_subscription_month_count?: number
}

export type ApiGiveawayWinners = {
  chat: ApiChat
  giveaway_message_id: number
  winners_selection_date: number
  winner_count: number
  winners: ApiUser[]
  additional_chat_count?: number
  prize_star_count?: number
  premium_subscription_month_count?: number
  unclaimed_prize_count?: number
  only_new_members?: boolean
  was_refunded?: boolean
  prize_description?: string
}

export type ApiGiveawayCompleted = {
  winner_count: number
  unclaimed_prize_count?: number
  giveaway_message?: ApiMessage
  is_star_giveaway?: boolean
}

export type ApiWebAppData = {
  data: string
  button_text: string
}

export type ApiMessageAutoDeleteTimerChanged = {
  message_auto_delete_time: number
}

export type ApiInlineKeyboardButton = {
  text: string
  url?: string
  callback_data?: string
  web_app?: { url: string }
  login_url?: {
    url: string
    forward_text?: string
    bot_username?: string
    request_write_access?: boolean
  }
  switch_inline_query?: string
  switch_inline_query_current_chat?: string
  switch_inline_query_chosen_chat?: {
    query?: string
    allow_user_chats?: boolean
    allow_bot_chats?: boolean
    allow_group_chats?: boolean
    allow_channel_chats?: boolean
  }
  copy_text?: { text: string }
  callback_game?: Record<string, never>
  pay?: boolean
}

export type ApiInlineKeyboardMarkup = {
  inline_keyboard: ApiInlineKeyboardButton[][]
}

export type ApiMessage = {
  message_id: number
  message_thread_id?: number
  from?: ApiUser
  sender_chat?: ApiChat
  sender_boost_count?: number
  sender_business_bot?: ApiUser
  date: number
  business_connection_id?: string
  chat: ApiChat
  forward_origin?: ApiMessageOrigin
  is_topic_message?: boolean
  is_automatic_forward?: boolean
  reply_to_message?: ApiMessage
  external_reply?: ApiExternalReplyInfo
  quote?: ApiTextQuote
  reply_to_story?: ApiStory
  via_bot?: ApiUser
  edit_date?: number
  has_protected_content?: boolean
  is_from_offline?: boolean
  media_group_id?: string
  author_signature?: string
  text?: string
  entities?: ApiMessageEntity[]
  link_preview_options?: ApiLinkPreviewOptions
  effect_id?: string
  animation?: ApiAnimation
  audio?: ApiAudio
  document?: ApiDocument
  paid_media?: ApiPaidMediaInfo
  photo?: ApiPhotoSize[]
  sticker?: ApiSticker
  story?: ApiStory
  video?: ApiVideo
  video_note?: ApiVideoNote
  voice?: ApiVoice
  caption?: string
  caption_entities?: ApiMessageEntity[]
  show_caption_above_media?: boolean
  has_media_spoiler?: boolean
  contact?: ApiContact
  dice?: ApiDice
  game?: ApiGame
  poll?: ApiPoll
  venue?: ApiVenue
  location?: ApiLocation
  new_chat_members?: ApiUser[]
  left_chat_member?: ApiUser
  new_chat_title?: string
  new_chat_photo?: ApiPhotoSize[]
  delete_chat_photo?: boolean
  group_chat_created?: boolean
  supergroup_chat_created?: boolean
  channel_chat_created?: boolean
  message_auto_delete_timer_changed?: ApiMessageAutoDeleteTimerChanged
  migrate_to_chat_id?: number
  migrate_from_chat_id?: number
  pinned_message?: ApiMessage
  invoice?: ApiInvoice
  successful_payment?: ApiSuccessfulPayment
  refunded_payment?: ApiRefundedPayment
  users_shared?: ApiUsersShared
  chat_shared?: ApiChatShared
  connected_website?: string
  write_access_allowed?: ApiWriteAccessAllowed
  proximity_alert_triggered?: ApiProximityAlertTriggered
  boost_added?: ApiChatBoostAdded
  chat_background_set?: ApiChatBackground
  forum_topic_created?: ApiForumTopicCreated
  forum_topic_edited?: ApiForumTopicEdited
  forum_topic_closed?: ApiForumTopicClosed
  forum_topic_reopened?: ApiForumTopicReopened
  general_forum_topic_hidden?: ApiGeneralForumTopicHidden
  general_forum_topic_unhidden?: ApiGeneralForumTopicUnhidden
  giveaway_created?: ApiGiveawayCreated
  giveaway?: ApiGiveaway
  giveaway_winners?: ApiGiveawayWinners
  giveaway_completed?: ApiGiveawayCompleted
  video_chat_scheduled?: ApiVideoChatScheduled
  video_chat_started?: ApiVideoChatStarted
  video_chat_ended?: ApiVideoChatEnded
  video_chat_participants_invited?: ApiVideoChatParticipantsInvited
  web_app_data?: ApiWebAppData
  reply_markup?: ApiInlineKeyboardMarkup
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
  message?: ApiMessage
  edited_message?: ApiMessage
  channel_post?: ApiMessage
  edited_channel_post?: ApiMessage
  business_connection?: ApiBusinessConnection
  business_message?: ApiMessage
  edited_business_message?: ApiMessage
  deleted_business_messages?: ApiBusinessMessagesDeleted
  message_reaction?: ApiMessageReactionUpdated
  message_reaction_count?: ApiMessageReactionCountUpdated
  inline_query?: ApiInlineQuery
  chosen_inline_result?: ApiChosenInlineResult
  callback_query?: ApiCallbackQuery
  shipping_query?: ApiShippingQuery
  pre_checkout_query?: ApiPreCheckoutQuery
  purchased_paid_media?: ApiPaidMediaPurchased
  poll?: ApiPoll
  poll_answer?: ApiPollAnswer
  my_chat_member?: ApiChatMemberUpdated
  chat_member?: ApiChatMemberUpdated
  chat_join_request?: ApiChatJoinRequest
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

  photoSize(api: ApiPhotoSize): PhotoSize {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      width: api.width,
      height: api.height,
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  animation(api: ApiAnimation): Animation {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      width: api.width,
      height: api.height,
      duration: api.duration,
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
      ...(api.file_name !== undefined && { fileName: api.file_name }),
      ...(api.mime_type !== undefined && { mimeType: api.mime_type }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  audio(api: ApiAudio): Audio {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      duration: api.duration,
      ...(api.performer !== undefined && { performer: api.performer }),
      ...(api.title !== undefined && { title: api.title }),
      ...(api.file_name !== undefined && { fileName: api.file_name }),
      ...(api.mime_type !== undefined && { mimeType: api.mime_type }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
    }
  },

  document(api: ApiDocument): Document {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
      ...(api.file_name !== undefined && { fileName: api.file_name }),
      ...(api.mime_type !== undefined && { mimeType: api.mime_type }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  video(api: ApiVideo): Video {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      width: api.width,
      height: api.height,
      duration: api.duration,
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
      ...(api.file_name !== undefined && { fileName: api.file_name }),
      ...(api.mime_type !== undefined && { mimeType: api.mime_type }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  videoNote(api: ApiVideoNote): VideoNote {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      length: api.length,
      duration: api.duration,
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  voice(api: ApiVoice): Voice {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      duration: api.duration,
      ...(api.mime_type !== undefined && { mimeType: api.mime_type }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  contact(api: ApiContact): Contact {
    return {
      phoneNumber: api.phone_number,
      firstName: api.first_name,
      ...(api.last_name !== undefined && { lastName: api.last_name }),
      ...(api.user_id !== undefined && { userId: api.user_id }),
      ...(api.vcard !== undefined && { vcard: api.vcard }),
    }
  },

  dice(api: ApiDice): Dice {
    return {
      emoji: api.emoji,
      value: api.value,
    }
  },

  venue(api: ApiVenue): Venue {
    return {
      location: fromApi.location(api.location),
      title: api.title,
      address: api.address,
      ...(api.foursquare_id !== undefined && {
        foursquareId: api.foursquare_id,
      }),
      ...(api.foursquare_type !== undefined && {
        foursquareType: api.foursquare_type,
      }),
      ...(api.google_place_id !== undefined && {
        googlePlaceId: api.google_place_id,
      }),
      ...(api.google_place_type !== undefined && {
        googlePlaceType: api.google_place_type,
      }),
    }
  },

  story(api: ApiStory): Story {
    return {
      chat: fromApi.chat(api.chat),
      id: api.id,
    }
  },

  file(api: ApiFile): File {
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
      ...(api.file_path !== undefined && { filePath: api.file_path }),
    }
  },

  maskPosition(api: ApiMaskPosition): MaskPosition {
    return {
      point: api.point,
      xShift: api.x_shift,
      yShift: api.y_shift,
      scale: api.scale,
    }
  },

  sticker(api: ApiSticker): Sticker {
    const stickerType = api.type === 'custom_emoji' ? 'customEmoji' : api.type
    return {
      fileId: api.file_id,
      fileUniqueId: api.file_unique_id,
      type: stickerType as Sticker['type'],
      width: api.width,
      height: api.height,
      isAnimated: api.is_animated,
      isVideo: api.is_video,
      ...(api.thumbnail !== undefined && {
        thumbnail: fromApi.photoSize(api.thumbnail),
      }),
      ...(api.emoji !== undefined && { emoji: api.emoji }),
      ...(api.set_name !== undefined && { setName: api.set_name }),
      ...(api.premium_animation !== undefined && {
        premiumAnimation: fromApi.file(api.premium_animation),
      }),
      ...(api.mask_position !== undefined && {
        maskPosition: fromApi.maskPosition(api.mask_position),
      }),
      ...(api.custom_emoji_id !== undefined && {
        customEmojiId: api.custom_emoji_id,
      }),
      ...(api.needs_repainting !== undefined && {
        needsRepainting: api.needs_repainting,
      }),
      ...(api.file_size !== undefined && { fileSize: api.file_size }),
    }
  },

  game(api: ApiGame): Game {
    return {
      title: api.title,
      description: api.description,
      photo: api.photo.map(fromApi.photoSize),
      ...(api.text !== undefined && { text: api.text }),
      ...(api.text_entities !== undefined && {
        textEntities: api.text_entities.map(fromApi.messageEntity),
      }),
      ...(api.animation !== undefined && {
        animation: fromApi.animation(api.animation),
      }),
    }
  },

  paidMedia(api: ApiPaidMedia): PaidMedia {
    switch (api.type) {
      case 'preview':
        return {
          type: 'preview',
          ...(api.width !== undefined && { width: api.width }),
          ...(api.height !== undefined && { height: api.height }),
          ...(api.duration !== undefined && { duration: api.duration }),
        }
      case 'photo':
        return {
          type: 'photo',
          photo: api.photo.map(fromApi.photoSize),
        }
      case 'video':
        return {
          type: 'video',
          video: fromApi.video(api.video),
        }
    }
  },

  paidMediaInfo(api: ApiPaidMediaInfo): PaidMediaInfo {
    return {
      starCount: api.star_count,
      paidMedia: api.paid_media.map(fromApi.paidMedia),
    }
  },

  messageOrigin(api: ApiMessageOrigin): MessageOrigin {
    switch (api.type) {
      case 'user':
        return {
          type: 'user',
          date: api.date,
          senderUser: fromApi.user(api.sender_user),
        }
      case 'hidden_user':
        return {
          type: 'hiddenUser',
          date: api.date,
          senderUserName: api.sender_user_name,
        }
      case 'chat':
        return {
          type: 'chat',
          date: api.date,
          senderChat: fromApi.chat(api.sender_chat),
          ...(api.author_signature !== undefined && {
            authorSignature: api.author_signature,
          }),
        }
      case 'channel':
        return {
          type: 'channel',
          date: api.date,
          chat: fromApi.chat(api.chat),
          messageId: api.message_id,
          ...(api.author_signature !== undefined && {
            authorSignature: api.author_signature,
          }),
        }
    }
  },

  textQuote(api: ApiTextQuote): TextQuote {
    return {
      text: api.text,
      position: api.position,
      ...(api.entities !== undefined && {
        entities: api.entities.map(fromApi.messageEntity),
      }),
      ...(api.is_manual !== undefined && { isManual: api.is_manual }),
    }
  },

  linkPreviewOptions(api: ApiLinkPreviewOptions): LinkPreviewOptions {
    return {
      ...(api.is_disabled !== undefined && { isDisabled: api.is_disabled }),
      ...(api.url !== undefined && { url: api.url }),
      ...(api.prefer_small_media !== undefined && {
        preferSmallMedia: api.prefer_small_media,
      }),
      ...(api.prefer_large_media !== undefined && {
        preferLargeMedia: api.prefer_large_media,
      }),
      ...(api.show_above_text !== undefined && {
        showAboveText: api.show_above_text,
      }),
    }
  },

  invoice(api: ApiInvoice): Invoice {
    return {
      title: api.title,
      description: api.description,
      startParameter: api.start_parameter,
      currency: api.currency,
      totalAmount: api.total_amount,
    }
  },

  successfulPayment(api: ApiSuccessfulPayment): SuccessfulPayment {
    return {
      currency: api.currency,
      totalAmount: api.total_amount,
      invoicePayload: api.invoice_payload,
      telegramPaymentChargeId: api.telegram_payment_charge_id,
      providerPaymentChargeId: api.provider_payment_charge_id,
      ...(api.subscription_expiration_date !== undefined && {
        subscriptionExpirationDate: api.subscription_expiration_date,
      }),
      ...(api.is_first_recurring !== undefined && {
        isFirstRecurring: api.is_first_recurring,
      }),
      ...(api.is_recurring !== undefined && {
        isRecurring: api.is_recurring,
      }),
      ...(api.shipping_option_id !== undefined && {
        shippingOptionId: api.shipping_option_id,
      }),
      ...(api.order_info !== undefined && {
        orderInfo: fromApi.orderInfo(api.order_info),
      }),
    }
  },

  refundedPayment(api: ApiRefundedPayment): RefundedPayment {
    return {
      currency: api.currency,
      totalAmount: api.total_amount,
      invoicePayload: api.invoice_payload,
      telegramPaymentChargeId: api.telegram_payment_charge_id,
      ...(api.provider_payment_charge_id !== undefined && {
        providerPaymentChargeId: api.provider_payment_charge_id,
      }),
    }
  },

  sharedUser(api: ApiSharedUser): SharedUser {
    return {
      userId: api.user_id,
      ...(api.first_name !== undefined && { firstName: api.first_name }),
      ...(api.last_name !== undefined && { lastName: api.last_name }),
      ...(api.username !== undefined && { username: api.username }),
      ...(api.photo !== undefined && {
        photo: api.photo.map(fromApi.photoSize),
      }),
    }
  },

  usersShared(api: ApiUsersShared): UsersShared {
    return {
      requestId: api.request_id,
      users: api.users.map(fromApi.sharedUser),
    }
  },

  chatShared(api: ApiChatShared): ChatShared {
    return {
      requestId: api.request_id,
      chatId: api.chat_id,
      ...(api.title !== undefined && { title: api.title }),
      ...(api.username !== undefined && { username: api.username }),
      ...(api.photo !== undefined && {
        photo: api.photo.map(fromApi.photoSize),
      }),
    }
  },

  writeAccessAllowed(api: ApiWriteAccessAllowed): WriteAccessAllowed {
    return {
      ...(api.from_request !== undefined && { fromRequest: api.from_request }),
      ...(api.web_app_name !== undefined && { webAppName: api.web_app_name }),
      ...(api.from_attachment_menu !== undefined && {
        fromAttachmentMenu: api.from_attachment_menu,
      }),
    }
  },

  videoChatScheduled(api: ApiVideoChatScheduled): VideoChatScheduled {
    return {
      startDate: api.start_date,
    }
  },

  videoChatStarted(_api: ApiVideoChatStarted): VideoChatStarted {
    return {}
  },

  videoChatEnded(api: ApiVideoChatEnded): VideoChatEnded {
    return {
      duration: api.duration,
    }
  },

  videoChatParticipantsInvited(
    api: ApiVideoChatParticipantsInvited,
  ): VideoChatParticipantsInvited {
    return {
      users: api.users.map(fromApi.user),
    }
  },

  forumTopicCreated(api: ApiForumTopicCreated): ForumTopicCreated {
    return {
      name: api.name,
      iconColor: api.icon_color,
      ...(api.icon_custom_emoji_id !== undefined && {
        iconCustomEmojiId: api.icon_custom_emoji_id,
      }),
    }
  },

  forumTopicClosed(_api: ApiForumTopicClosed): ForumTopicClosed {
    return {}
  },

  forumTopicEdited(api: ApiForumTopicEdited): ForumTopicEdited {
    return {
      ...(api.name !== undefined && { name: api.name }),
      ...(api.icon_custom_emoji_id !== undefined && {
        iconCustomEmojiId: api.icon_custom_emoji_id,
      }),
    }
  },

  forumTopicReopened(_api: ApiForumTopicReopened): ForumTopicReopened {
    return {}
  },

  generalForumTopicHidden(
    _api: ApiGeneralForumTopicHidden,
  ): GeneralForumTopicHidden {
    return {}
  },

  generalForumTopicUnhidden(
    _api: ApiGeneralForumTopicUnhidden,
  ): GeneralForumTopicUnhidden {
    return {}
  },

  proximityAlertTriggered(
    api: ApiProximityAlertTriggered,
  ): ProximityAlertTriggered {
    return {
      traveler: fromApi.user(api.traveler),
      watcher: fromApi.user(api.watcher),
      distance: api.distance,
    }
  },

  chatBoostAdded(api: ApiChatBoostAdded): ChatBoostAdded {
    return {
      boostCount: api.boost_count,
    }
  },

  backgroundFill(api: ApiBackgroundFill): BackgroundFill {
    switch (api.type) {
      case 'solid':
        return {
          type: 'solid',
          color: api.color,
        }
      case 'gradient':
        return {
          type: 'gradient',
          topColor: api.top_color,
          bottomColor: api.bottom_color,
          rotationAngle: api.rotation_angle,
        }
      case 'freeform_gradient':
        return {
          type: 'freeformGradient',
          colors: api.colors,
        }
    }
  },

  backgroundType(api: ApiBackgroundType): BackgroundType {
    switch (api.type) {
      case 'fill':
        return {
          type: 'fill',
          fill: fromApi.backgroundFill(api.fill),
          darkThemeDimming: api.dark_theme_dimming,
        }
      case 'wallpaper':
        return {
          type: 'wallpaper',
          document: fromApi.document(api.document),
          darkThemeDimming: api.dark_theme_dimming,
          ...(api.is_blurred !== undefined && { isBlurred: api.is_blurred }),
          ...(api.is_moving !== undefined && { isMoving: api.is_moving }),
        }
      case 'pattern':
        return {
          type: 'pattern',
          document: fromApi.document(api.document),
          fill: fromApi.backgroundFill(api.fill),
          intensity: api.intensity,
          ...(api.is_inverted !== undefined && { isInverted: api.is_inverted }),
          ...(api.is_moving !== undefined && { isMoving: api.is_moving }),
        }
      case 'chat_theme':
        return {
          type: 'chatTheme',
          themeName: api.theme_name,
        }
    }
  },

  chatBackground(api: ApiChatBackground): ChatBackground {
    return {
      type: fromApi.backgroundType(api.type),
    }
  },

  giveawayCreated(api: ApiGiveawayCreated): GiveawayCreated {
    return {
      ...(api.prize_star_count !== undefined && {
        prizeStarCount: api.prize_star_count,
      }),
    }
  },

  giveaway(api: ApiGiveaway): Giveaway {
    return {
      chats: api.chats.map(fromApi.chat),
      winnersSelectionDate: api.winners_selection_date,
      winnerCount: api.winner_count,
      ...(api.only_new_members !== undefined && {
        onlyNewMembers: api.only_new_members,
      }),
      ...(api.has_public_winners !== undefined && {
        hasPublicWinners: api.has_public_winners,
      }),
      ...(api.prize_description !== undefined && {
        prizeDescription: api.prize_description,
      }),
      ...(api.country_codes !== undefined && {
        countryCodes: api.country_codes,
      }),
      ...(api.prize_star_count !== undefined && {
        prizeStarCount: api.prize_star_count,
      }),
      ...(api.premium_subscription_month_count !== undefined && {
        premiumSubscriptionMonthCount: api.premium_subscription_month_count,
      }),
    }
  },

  giveawayWinners(api: ApiGiveawayWinners): GiveawayWinners {
    return {
      chat: fromApi.chat(api.chat),
      giveawayMessageId: api.giveaway_message_id,
      winnersSelectionDate: api.winners_selection_date,
      winnerCount: api.winner_count,
      winners: api.winners.map(fromApi.user),
      ...(api.additional_chat_count !== undefined && {
        additionalChatCount: api.additional_chat_count,
      }),
      ...(api.prize_star_count !== undefined && {
        prizeStarCount: api.prize_star_count,
      }),
      ...(api.premium_subscription_month_count !== undefined && {
        premiumSubscriptionMonthCount: api.premium_subscription_month_count,
      }),
      ...(api.unclaimed_prize_count !== undefined && {
        unclaimedPrizeCount: api.unclaimed_prize_count,
      }),
      ...(api.only_new_members !== undefined && {
        onlyNewMembers: api.only_new_members,
      }),
      ...(api.was_refunded !== undefined && {
        wasRefunded: api.was_refunded,
      }),
      ...(api.prize_description !== undefined && {
        prizeDescription: api.prize_description,
      }),
    }
  },

  giveawayCompleted(api: ApiGiveawayCompleted): GiveawayCompleted {
    return {
      winnerCount: api.winner_count,
      ...(api.unclaimed_prize_count !== undefined && {
        unclaimedPrizeCount: api.unclaimed_prize_count,
      }),
      ...(api.giveaway_message !== undefined && {
        giveawayMessage: fromApi.message(api.giveaway_message),
      }),
      ...(api.is_star_giveaway !== undefined && {
        isStarGiveaway: api.is_star_giveaway,
      }),
    }
  },

  webAppData(api: ApiWebAppData): WebAppData {
    return {
      data: api.data,
      buttonText: api.button_text,
    }
  },

  messageAutoDeleteTimerChanged(
    api: ApiMessageAutoDeleteTimerChanged,
  ): MessageAutoDeleteTimerChanged {
    return {
      messageAutoDeleteTime: api.message_auto_delete_time,
    }
  },

  inlineKeyboardMarkup(api: ApiInlineKeyboardMarkup): InlineKeyboardMarkup {
    return {
      inlineKeyboard: api.inline_keyboard.map((row) =>
        row.map((button) => ({
          text: button.text,
          ...(button.url !== undefined && { url: button.url }),
          ...(button.callback_data !== undefined && {
            callbackData: button.callback_data,
          }),
          ...(button.web_app !== undefined && { webApp: button.web_app }),
          ...(button.login_url !== undefined && {
            loginUrl: {
              url: button.login_url.url,
              ...(button.login_url.forward_text !== undefined && {
                forwardText: button.login_url.forward_text,
              }),
              ...(button.login_url.bot_username !== undefined && {
                botUsername: button.login_url.bot_username,
              }),
              ...(button.login_url.request_write_access !== undefined && {
                requestWriteAccess: button.login_url.request_write_access,
              }),
            },
          }),
          ...(button.switch_inline_query !== undefined && {
            switchInlineQuery: button.switch_inline_query,
          }),
          ...(button.switch_inline_query_current_chat !== undefined && {
            switchInlineQueryCurrentChat:
              button.switch_inline_query_current_chat,
          }),
          ...(button.switch_inline_query_chosen_chat !== undefined && {
            switchInlineQueryChosenChat: {
              ...(button.switch_inline_query_chosen_chat.query !==
                undefined && {
                query: button.switch_inline_query_chosen_chat.query,
              }),
              ...(button.switch_inline_query_chosen_chat.allow_user_chats !==
                undefined && {
                allowUserChats:
                  button.switch_inline_query_chosen_chat.allow_user_chats,
              }),
              ...(button.switch_inline_query_chosen_chat.allow_bot_chats !==
                undefined && {
                allowBotChats:
                  button.switch_inline_query_chosen_chat.allow_bot_chats,
              }),
              ...(button.switch_inline_query_chosen_chat.allow_group_chats !==
                undefined && {
                allowGroupChats:
                  button.switch_inline_query_chosen_chat.allow_group_chats,
              }),
              ...(button.switch_inline_query_chosen_chat.allow_channel_chats !==
                undefined && {
                allowChannelChats:
                  button.switch_inline_query_chosen_chat.allow_channel_chats,
              }),
            },
          }),
          ...(button.copy_text !== undefined && {
            copyText: { text: button.copy_text.text },
          }),
          ...(button.callback_game !== undefined && {
            callbackGame: button.callback_game,
          }),
          ...(button.pay !== undefined && { pay: button.pay }),
        })),
      ),
    }
  },

  externalReplyInfo(api: ApiExternalReplyInfo): ExternalReplyInfo {
    return {
      origin: fromApi.messageOrigin(api.origin),
      ...(api.chat !== undefined && { chat: fromApi.chat(api.chat) }),
      ...(api.message_id !== undefined && { messageId: api.message_id }),
      ...(api.link_preview_options !== undefined && {
        linkPreviewOptions: fromApi.linkPreviewOptions(
          api.link_preview_options,
        ),
      }),
      ...(api.animation !== undefined && {
        animation: fromApi.animation(api.animation),
      }),
      ...(api.audio !== undefined && { audio: fromApi.audio(api.audio) }),
      ...(api.document !== undefined && {
        document: fromApi.document(api.document),
      }),
      ...(api.paid_media !== undefined && {
        paidMedia: fromApi.paidMediaInfo(api.paid_media),
      }),
      ...(api.photo !== undefined && {
        photo: api.photo.map(fromApi.photoSize),
      }),
      ...(api.sticker !== undefined && {
        sticker: fromApi.sticker(api.sticker),
      }),
      ...(api.story !== undefined && { story: fromApi.story(api.story) }),
      ...(api.video !== undefined && { video: fromApi.video(api.video) }),
      ...(api.video_note !== undefined && {
        videoNote: fromApi.videoNote(api.video_note),
      }),
      ...(api.voice !== undefined && { voice: fromApi.voice(api.voice) }),
      ...(api.has_media_spoiler !== undefined && {
        hasMediaSpoiler: api.has_media_spoiler,
      }),
      ...(api.contact !== undefined && {
        contact: fromApi.contact(api.contact),
      }),
      ...(api.dice !== undefined && { dice: fromApi.dice(api.dice) }),
      ...(api.game !== undefined && { game: fromApi.game(api.game) }),
      ...(api.giveaway !== undefined && {
        giveaway: fromApi.giveaway(api.giveaway),
      }),
      ...(api.giveaway_winners !== undefined && {
        giveawayWinners: fromApi.giveawayWinners(api.giveaway_winners),
      }),
      ...(api.invoice !== undefined && {
        invoice: fromApi.invoice(api.invoice),
      }),
      ...(api.location !== undefined && {
        location: fromApi.location(api.location),
      }),
      ...(api.poll !== undefined && { poll: fromApi.poll(api.poll) }),
      ...(api.venue !== undefined && { venue: fromApi.venue(api.venue) }),
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
      ...(api.sender_boost_count !== undefined && {
        senderBoostCount: api.sender_boost_count,
      }),
      ...(api.sender_business_bot !== undefined && {
        senderBusinessBot: fromApi.user(api.sender_business_bot),
      }),
      ...(api.business_connection_id !== undefined && {
        businessConnectionId: api.business_connection_id,
      }),
      ...(api.forward_origin !== undefined && {
        forwardOrigin: fromApi.messageOrigin(api.forward_origin),
      }),
      ...(api.is_topic_message !== undefined && {
        isTopicMessage: api.is_topic_message,
      }),
      ...(api.is_automatic_forward !== undefined && {
        isAutomaticForward: api.is_automatic_forward,
      }),
      ...(api.reply_to_message !== undefined && {
        replyToMessage: fromApi.message(api.reply_to_message),
      }),
      ...(api.external_reply !== undefined && {
        externalReply: fromApi.externalReplyInfo(api.external_reply),
      }),
      ...(api.quote !== undefined && {
        quote: fromApi.textQuote(api.quote),
      }),
      ...(api.reply_to_story !== undefined && {
        replyToStory: fromApi.story(api.reply_to_story),
      }),
      ...(api.via_bot !== undefined && { viaBot: fromApi.user(api.via_bot) }),
      ...(api.edit_date !== undefined && { editDate: api.edit_date }),
      ...(api.has_protected_content !== undefined && {
        hasProtectedContent: api.has_protected_content,
      }),
      ...(api.is_from_offline !== undefined && {
        isFromOffline: api.is_from_offline,
      }),
      ...(api.media_group_id !== undefined && {
        mediaGroupId: api.media_group_id,
      }),
      ...(api.author_signature !== undefined && {
        authorSignature: api.author_signature,
      }),
      ...(api.text !== undefined && { text: api.text }),
      ...(api.entities !== undefined && {
        entities: api.entities.map(fromApi.messageEntity),
      }),
      ...(api.link_preview_options !== undefined && {
        linkPreviewOptions: fromApi.linkPreviewOptions(
          api.link_preview_options,
        ),
      }),
      ...(api.effect_id !== undefined && { effectId: api.effect_id }),
      ...(api.animation !== undefined && {
        animation: fromApi.animation(api.animation),
      }),
      ...(api.audio !== undefined && { audio: fromApi.audio(api.audio) }),
      ...(api.document !== undefined && {
        document: fromApi.document(api.document),
      }),
      ...(api.paid_media !== undefined && {
        paidMedia: fromApi.paidMediaInfo(api.paid_media),
      }),
      ...(api.photo !== undefined && {
        photo: api.photo.map(fromApi.photoSize),
      }),
      ...(api.sticker !== undefined && {
        sticker: fromApi.sticker(api.sticker),
      }),
      ...(api.story !== undefined && { story: fromApi.story(api.story) }),
      ...(api.video !== undefined && { video: fromApi.video(api.video) }),
      ...(api.video_note !== undefined && {
        videoNote: fromApi.videoNote(api.video_note),
      }),
      ...(api.voice !== undefined && { voice: fromApi.voice(api.voice) }),
      ...(api.caption !== undefined && { caption: api.caption }),
      ...(api.caption_entities !== undefined && {
        captionEntities: api.caption_entities.map(fromApi.messageEntity),
      }),
      ...(api.show_caption_above_media !== undefined && {
        showCaptionAboveMedia: api.show_caption_above_media,
      }),
      ...(api.has_media_spoiler !== undefined && {
        hasMediaSpoiler: api.has_media_spoiler,
      }),
      ...(api.contact !== undefined && {
        contact: fromApi.contact(api.contact),
      }),
      ...(api.dice !== undefined && { dice: fromApi.dice(api.dice) }),
      ...(api.game !== undefined && { game: fromApi.game(api.game) }),
      ...(api.poll !== undefined && { poll: fromApi.poll(api.poll) }),
      ...(api.venue !== undefined && { venue: fromApi.venue(api.venue) }),
      ...(api.location !== undefined && {
        location: fromApi.location(api.location),
      }),
      ...(api.new_chat_members !== undefined && {
        newChatMembers: api.new_chat_members.map(fromApi.user),
      }),
      ...(api.left_chat_member !== undefined && {
        leftChatMember: fromApi.user(api.left_chat_member),
      }),
      ...(api.new_chat_title !== undefined && {
        newChatTitle: api.new_chat_title,
      }),
      ...(api.new_chat_photo !== undefined && {
        newChatPhoto: api.new_chat_photo.map(fromApi.photoSize),
      }),
      ...(api.delete_chat_photo !== undefined && {
        deleteChatPhoto: api.delete_chat_photo,
      }),
      ...(api.group_chat_created !== undefined && {
        groupChatCreated: api.group_chat_created,
      }),
      ...(api.supergroup_chat_created !== undefined && {
        supergroupChatCreated: api.supergroup_chat_created,
      }),
      ...(api.channel_chat_created !== undefined && {
        channelChatCreated: api.channel_chat_created,
      }),
      ...(api.message_auto_delete_timer_changed !== undefined && {
        messageAutoDeleteTimerChanged: fromApi.messageAutoDeleteTimerChanged(
          api.message_auto_delete_timer_changed,
        ),
      }),
      ...(api.migrate_to_chat_id !== undefined && {
        migrateToChatId: api.migrate_to_chat_id,
      }),
      ...(api.migrate_from_chat_id !== undefined && {
        migrateFromChatId: api.migrate_from_chat_id,
      }),
      ...(api.pinned_message !== undefined && {
        pinnedMessage: fromApi.message(api.pinned_message),
      }),
      ...(api.invoice !== undefined && {
        invoice: fromApi.invoice(api.invoice),
      }),
      ...(api.successful_payment !== undefined && {
        successfulPayment: fromApi.successfulPayment(api.successful_payment),
      }),
      ...(api.refunded_payment !== undefined && {
        refundedPayment: fromApi.refundedPayment(api.refunded_payment),
      }),
      ...(api.users_shared !== undefined && {
        usersShared: fromApi.usersShared(api.users_shared),
      }),
      ...(api.chat_shared !== undefined && {
        chatShared: fromApi.chatShared(api.chat_shared),
      }),
      ...(api.connected_website !== undefined && {
        connectedWebsite: api.connected_website,
      }),
      ...(api.write_access_allowed !== undefined && {
        writeAccessAllowed: fromApi.writeAccessAllowed(
          api.write_access_allowed,
        ),
      }),
      ...(api.proximity_alert_triggered !== undefined && {
        proximityAlertTriggered: fromApi.proximityAlertTriggered(
          api.proximity_alert_triggered,
        ),
      }),
      ...(api.boost_added !== undefined && {
        boostAdded: fromApi.chatBoostAdded(api.boost_added),
      }),
      ...(api.chat_background_set !== undefined && {
        chatBackgroundSet: fromApi.chatBackground(api.chat_background_set),
      }),
      ...(api.forum_topic_created !== undefined && {
        forumTopicCreated: fromApi.forumTopicCreated(api.forum_topic_created),
      }),
      ...(api.forum_topic_edited !== undefined && {
        forumTopicEdited: fromApi.forumTopicEdited(api.forum_topic_edited),
      }),
      ...(api.forum_topic_closed !== undefined && {
        forumTopicClosed: fromApi.forumTopicClosed(api.forum_topic_closed),
      }),
      ...(api.forum_topic_reopened !== undefined && {
        forumTopicReopened: fromApi.forumTopicReopened(
          api.forum_topic_reopened,
        ),
      }),
      ...(api.general_forum_topic_hidden !== undefined && {
        generalForumTopicHidden: fromApi.generalForumTopicHidden(
          api.general_forum_topic_hidden,
        ),
      }),
      ...(api.general_forum_topic_unhidden !== undefined && {
        generalForumTopicUnhidden: fromApi.generalForumTopicUnhidden(
          api.general_forum_topic_unhidden,
        ),
      }),
      ...(api.giveaway_created !== undefined && {
        giveawayCreated: fromApi.giveawayCreated(api.giveaway_created),
      }),
      ...(api.giveaway !== undefined && {
        giveaway: fromApi.giveaway(api.giveaway),
      }),
      ...(api.giveaway_winners !== undefined && {
        giveawayWinners: fromApi.giveawayWinners(api.giveaway_winners),
      }),
      ...(api.giveaway_completed !== undefined && {
        giveawayCompleted: fromApi.giveawayCompleted(api.giveaway_completed),
      }),
      ...(api.video_chat_scheduled !== undefined && {
        videoChatScheduled: fromApi.videoChatScheduled(
          api.video_chat_scheduled,
        ),
      }),
      ...(api.video_chat_started !== undefined && {
        videoChatStarted: fromApi.videoChatStarted(api.video_chat_started),
      }),
      ...(api.video_chat_ended !== undefined && {
        videoChatEnded: fromApi.videoChatEnded(api.video_chat_ended),
      }),
      ...(api.video_chat_participants_invited !== undefined && {
        videoChatParticipantsInvited: fromApi.videoChatParticipantsInvited(
          api.video_chat_participants_invited,
        ),
      }),
      ...(api.web_app_data !== undefined && {
        webAppData: fromApi.webAppData(api.web_app_data),
      }),
      ...(api.reply_markup !== undefined && {
        replyMarkup: fromApi.inlineKeyboardMarkup(api.reply_markup),
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
      ...(api.message_reaction !== undefined && {
        messageReaction: fromApi.messageReactionUpdated(api.message_reaction),
      }),
      ...(api.message_reaction_count !== undefined && {
        messageReactionCount: fromApi.messageReactionCountUpdated(
          api.message_reaction_count,
        ),
      }),
      ...(api.inline_query !== undefined && {
        inlineQuery: fromApi.inlineQuery(api.inline_query),
      }),
      ...(api.chosen_inline_result !== undefined && {
        chosenInlineResult: fromApi.chosenInlineResult(
          api.chosen_inline_result,
        ),
      }),
      ...(api.callback_query !== undefined && {
        callbackQuery: fromApi.callbackQuery(api.callback_query),
      }),
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
      ...(api.poll !== undefined && {
        poll: fromApi.poll(api.poll),
      }),
      ...(api.poll_answer !== undefined && {
        pollAnswer: fromApi.pollAnswer(api.poll_answer),
      }),
      ...(api.my_chat_member !== undefined && {
        myChatMember: fromApi.chatMemberUpdated(api.my_chat_member),
      }),
      ...(api.chat_member !== undefined && {
        chatMember: fromApi.chatMemberUpdated(api.chat_member),
      }),
      ...(api.chat_join_request !== undefined && {
        chatJoinRequest: fromApi.chatJoinRequest(api.chat_join_request),
      }),
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
        allowedUpdates: api.allowed_updates as WebhookInfo['allowedUpdates'],
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
