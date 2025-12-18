import type {
  BusinessConnection,
  BusinessMessagesDeleted,
  CallbackQuery,
  ChatBoostRemoved,
  ChatBoostUpdated,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  InlineQuery,
  Message,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  PaidMediaPurchased,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  ShippingQuery,
} from './types'

export type TelegramEventMap = {
  /** New incoming message */
  message: Message
  /** Message was edited */
  'message:edited': Message
  /** New channel post */
  channel_post: Message
  /** Channel post was edited */
  'channel_post:edited': Message
  /** Callback query from inline keyboard */
  callback_query: CallbackQuery
  /** Inline query */
  inline_query: InlineQuery
  /** Chosen inline result */
  chosen_inline_result: ChosenInlineResult
  /** Shipping query for payments */
  shipping_query: ShippingQuery
  /** Pre-checkout query for payments */
  pre_checkout_query: PreCheckoutQuery
  /** Poll state changed */
  poll: Poll
  /** User changed their poll answer */
  poll_answer: PollAnswer
  /** Bot's chat member status changed */
  my_chat_member: ChatMemberUpdated
  /** Chat member status changed */
  chat_member: ChatMemberUpdated
  /** Chat join request */
  chat_join_request: ChatJoinRequest
  /** Chat boost added/changed */
  chat_boost: ChatBoostUpdated
  /** Chat boost removed */
  chat_boost_removed: ChatBoostRemoved
  /** Message reaction changed */
  message_reaction: MessageReactionUpdated
  /** Anonymous message reaction counts changed */
  message_reaction_count: MessageReactionCountUpdated
  /** Business account connection changed */
  business_connection: BusinessConnection
  /** New business message */
  business_message: Message
  /** Business message edited */
  'business_message:edited': Message
  /** Business messages deleted */
  business_messages_deleted: BusinessMessagesDeleted
  /** Paid media purchased */
  paid_media_purchased: PaidMediaPurchased
}

export type TelegramEvent = keyof TelegramEventMap
