import type {
  ActionContext,
  EventHandler,
  ProviderInstance,
  Result,
  Unsubscribe,
  WebhookContext,
  WebhookDetector,
} from '@triggerskit/core/types'
import { createEvents } from '@triggerskit/core/types'
import { fail, ok, safeParse } from '@triggerskit/core/utils'
import { type GetMeData, getMe } from './actions/get-me'
import {
  type SendMessageData,
  type SendMessageParams,
  sendMessage,
} from './actions/send-message'
import {
  type DeleteWebhookParams,
  deleteWebhook,
  getWebhookInfo,
  type SetWebhookParams,
  setWebhook,
  type WebhookInfo,
} from './actions/webhook'
import type { TelegramEvent, TelegramEventMap } from './events'
import { createRequest } from './request'
import { type Update, UpdateSchema } from './schemas'

function isTelegramWebhook(ctx: WebhookContext): boolean {
  if (ctx.headers.has('x-telegram-bot-api-secret-token')) {
    return true
  }
  if (
    typeof ctx.body === 'object' &&
    ctx.body !== null &&
    'update_id' in ctx.body
  ) {
    return true
  }

  return false
}

export type TelegramErrorDetails = { errorCode: number }

/**
 * Configuration options for the Telegram provider.
 *
 * @see https://core.telegram.org/bots/api#authorizing-your-bot
 */
export type TelegramConfig = {
  /**
   * Bot token obtained from @BotFather on Telegram.
   *
   * @see https://core.telegram.org/bots#how-do-i-create-a-bot
   */
  token: string
  /**
   * Base URL for Telegram API. Defaults to 'https://api.telegram.org'.
   */
  baseUrl?: string
  /**
   * Request timeout in milliseconds. Defaults to 30000 (30 seconds).
   */
  timeout?: number
}

export type TelegramContext = ActionContext

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
   *   chat_id: 123456789,
   *   text: 'Hello, World!'
   * })
   *
   * // With formatting
   * const result = await kit.telegram.actions.sendMessage({
   *   chat_id: '@channel',
   *   text: '<b>Bold</b> text',
   *   parse_mode: 'HTML'
   * })
   * ```
   */
  sendMessage: (params: SendMessageParams) => Promise<Result<SendMessageData>>
}

export type TelegramWebhooks = {
  /**
   * Use this method to specify a URL and receive incoming updates via an outgoing webhook.
   *
   * @param params - Webhook parameters including URL and optional settings
   * @returns Promise resolving to a Result containing `true` on success
   *
   * @see https://core.telegram.org/bots/api#setwebhook
   *
   * @example
   * ```typescript
   * const result = await kit.telegram.webhooks.set({
   *   url: 'https://example.com/webhook',
   *   secret_token: 'my-secret-token'
   * })
   * ```
   */
  set: (params: SetWebhookParams) => Promise<Result<boolean>>

  /**
   * Use this method to remove webhook integration. Returns `true` on success.
   *
   * @param params - Optional parameters to drop pending updates
   * @returns Promise resolving to a Result containing `true` on success
   *
   * @see https://core.telegram.org/bots/api#deletewebhook
   *
   * @example
   * ```typescript
   * // Simple deletion
   * const result = await kit.telegram.webhooks.delete()
   *
   * // Drop all pending updates
   * const result = await kit.telegram.webhooks.delete({ drop_pending_updates: true })
   * ```
   */
  delete: (params?: DeleteWebhookParams) => Promise<Result<boolean>>

  /**
   * Use this method to get current webhook status.
   *
   * @returns Promise resolving to a Result containing WebhookInfo
   *
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   *
   * @example
   * ```typescript
   * const result = await kit.telegram.webhooks.info()
   * if (result.data) {
   *   console.log('Webhook URL:', result.data.url)
   *   console.log('Pending updates:', result.data.pending_update_count)
   * }
   * ```
   */
  info: () => Promise<Result<WebhookInfo>>

  /**
   * Parse an incoming webhook request and return the Update object.
   *
   * @param request - The incoming Request object from your webhook endpoint
   * @returns Promise resolving to a Result containing the parsed Update
   *
   * @see https://core.telegram.org/bots/api#update
   *
   * @example
   * ```typescript
   * // In your webhook handler
   * app.post('/webhook', async (request) => {
   *   const result = await kit.telegram.webhooks.handle(request)
   *
   *   if (result.data) {
   *     const update = result.data
   *     if (update.message) {
   *       console.log('New message:', update.message.text)
   *     }
   *     if (update.callbackQuery) {
   *       console.log('Callback:', update.callbackQuery.data)
   *     }
   *   }
   *
   *   return new Response('OK')
   * })
   * ```
   */
  handle: (request: Request) => Promise<Result<Update>>
}

export type TelegramInstance = ProviderInstance<
  'telegram',
  TelegramActions,
  Update
> & {
  readonly webhooks: TelegramWebhooks
  readonly detector: WebhookDetector<Update>
  /**
   * Subscribe to Telegram events.
   *
   * Events are emitted when processing updates via `webhooks.handle()` or `kit.handle()`.
   *
   * @param event - The event name to listen for
   * @param handler - The handler function called when the event occurs
   * @returns Unsubscribe function to remove the listener
   *
   * @example
   * ```typescript
   * // Listen for new messages
   * kit.telegram.on('message', (message) => {
   *   console.log('New message:', message.text)
   * })
   *
   * // Unsubscribe
   * const off = kit.telegram.on('message', handler)
   * off()
   * ```
   */
  readonly on: <K extends TelegramEvent>(
    event: K,
    handler: EventHandler<TelegramEventMap[K]>,
  ) => Unsubscribe
}

export function telegram(config: TelegramConfig): TelegramInstance {
  const request = createRequest(config)
  const ctx = { request }
  const events = createEvents<TelegramEventMap>()

  async function handleWebhook(req: Request): Promise<Result<Update>> {
    try {
      const body = await req.json()
      const result = safeParse(UpdateSchema, body)

      if (result.error) {
        return result
      }

      const update = result.data

      if (update.message) events.emit('message', update.message)

      return ok(update)
    } catch (e) {
      return fail(e)
    }
  }

  const detector: WebhookDetector<Update> = {
    detect: isTelegramWebhook,
    handleWebhook,
  }

  return {
    provider: 'telegram' as const,
    actions: {
      getMe: getMe(ctx),
      sendMessage: sendMessage(ctx),
    },
    webhooks: {
      set: setWebhook(ctx),
      delete: deleteWebhook(ctx),
      info: getWebhookInfo(ctx),
      handle: handleWebhook,
    },
    detector,
    on: events.on,
    request,
  }
}

export type { GetMeData } from './actions/get-me'
export type { SendMessageData, SendMessageParams } from './actions/send-message'
export type {
  DeleteWebhookParams,
  SetWebhookParams,
  WebhookInfo,
} from './actions/webhook'

export type {
  Animation,
  Audio,
  BackgroundFill,
  BackgroundFillFreeformGradient,
  BackgroundFillGradient,
  BackgroundFillSolid,
  BackgroundType,
  BackgroundTypeChatTheme,
  BackgroundTypeFill,
  BackgroundTypePattern,
  BackgroundTypeWallpaper,
  BusinessConnection,
  BusinessMessagesDeleted,
  CallbackGame,
  CallbackQuery,
  Chat,
  ChatAdministratorRights,
  ChatBackground,
  ChatBoost,
  ChatBoostAdded,
  ChatBoostRemoved,
  ChatBoostSource,
  ChatBoostSourceGiftCode,
  ChatBoostSourceGiveaway,
  ChatBoostSourcePremium,
  ChatBoostUpdated,
  ChatInviteLink,
  ChatJoinRequest,
  ChatMember,
  ChatMemberAdministrator,
  ChatMemberBanned,
  ChatMemberLeft,
  ChatMemberMember,
  ChatMemberOwner,
  ChatMemberRestricted,
  ChatMemberUpdated,
  ChatShared,
  ChosenInlineResult,
  Contact,
  CopyTextButton,
  Dice,
  Document,
  ExternalReplyInfo,
  File,
  ForceReply,
  ForumTopicClosed,
  ForumTopicCreated,
  ForumTopicEdited,
  ForumTopicReopened,
  Game,
  GameHighScore,
  GeneralForumTopicHidden,
  GeneralForumTopicUnhidden,
  Giveaway,
  GiveawayCompleted,
  GiveawayCreated,
  GiveawayWinners,
  InaccessibleMessage,
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  InlineQuery,
  Invoice,
  KeyboardButton,
  KeyboardButtonPollType,
  KeyboardButtonRequestChat,
  KeyboardButtonRequestUsers,
  LinkPreviewOptions,
  Location,
  LoginUrl,
  MaskPosition,
  MaybeInaccessibleMessage,
  Message,
  MessageAutoDeleteTimerChanged,
  MessageEntity,
  MessageOrigin,
  MessageOriginChannel,
  MessageOriginChat,
  MessageOriginHiddenUser,
  MessageOriginUser,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  OrderInfo,
  PaidMedia,
  PaidMediaInfo,
  PaidMediaPhoto,
  PaidMediaPreview,
  PaidMediaPurchased,
  PaidMediaVideo,
  ParseMode,
  PhotoSize,
  Poll,
  PollAnswer,
  PollOption,
  PreCheckoutQuery,
  ProximityAlertTriggered,
  ReactionCount,
  ReactionType,
  ReactionTypeCustomEmoji,
  ReactionTypeEmoji,
  ReactionTypePaid,
  RefundedPayment,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ReplyMarkup,
  ReplyParameters,
  SharedUser,
  ShippingAddress,
  ShippingQuery,
  Sticker,
  StickerSet,
  Story,
  SuccessfulPayment,
  SwitchInlineQueryChosenChat,
  TextQuote,
  Update,
  UpdateType,
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
  WebAppInfo,
  WriteAccessAllowed,
} from './schemas'
