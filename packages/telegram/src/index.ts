import type { ProviderInstance, Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
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
} from './actions/webhook'
import { type ApiUpdate, fromApi } from './api'
import { createRequest } from './request'
import type { TelegramConfig, Update, WebhookInfo } from './types'

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
   * const result = await kit.telegram.actions.setWebhook({
   *   url: 'https://example.com/webhook',
   *   secretToken: 'my-secret-token'
   * })
   * ```
   */
  setWebhook: (params: SetWebhookParams) => Promise<Result<boolean>>

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
   * const result = await kit.telegram.actions.deleteWebhook()
   *
   * // Drop all pending updates
   * const result = await kit.telegram.actions.deleteWebhook({ dropPendingUpdates: true })
   * ```
   */
  deleteWebhook: (params?: DeleteWebhookParams) => Promise<Result<boolean>>

  /**
   * Use this method to get current webhook status.
   *
   * @returns Promise resolving to a Result containing WebhookInfo
   *
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   *
   * @example
   * ```typescript
   * const result = await kit.telegram.actions.getWebhookInfo()
   * if (result.data) {
   *   console.log('Webhook URL:', result.data.url)
   *   console.log('Pending updates:', result.data.pendingUpdateCount)
   * }
   * ```
   */
  getWebhookInfo: () => Promise<Result<WebhookInfo>>
}

export type TelegramInstance = ProviderInstance<'telegram', TelegramActions> & {
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
   *   const result = await kit.telegram.handleUpdate(request)
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
  handleUpdate: (request: Request) => Promise<Result<Update>>
}

export function telegram(config: TelegramConfig): TelegramInstance {
  const request = createRequest(config)
  const ctx = { request }

  return {
    provider: 'telegram' as const,
    actions: {
      getMe: getMe(ctx),
      sendMessage: sendMessage(ctx),
      setWebhook: setWebhook(ctx),
      deleteWebhook: deleteWebhook(ctx),
      getWebhookInfo: getWebhookInfo(ctx),
    },
    request,
    async handleUpdate(req: Request): Promise<Result<Update>> {
      try {
        const body = (await req.json()) as ApiUpdate
        return ok(fromApi.update(body))
      } catch (e) {
        return fail(e)
      }
    },
  }
}

export type { GetMeData } from './actions/get-me'
export type { SendMessageData, SendMessageParams } from './actions/send-message'
export type { DeleteWebhookParams, SetWebhookParams } from './actions/webhook'

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
  TelegramConfig,
  TelegramContext,
  TelegramErrorDetails,
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
  WebhookInfo,
  WriteAccessAllowed,
} from './types'
