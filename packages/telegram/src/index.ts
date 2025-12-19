import type {
  ActionContext,
  ProviderInstance,
  ProviderWebhooks,
  Result,
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
import type { TelegramEventMap } from './events'
import { createRequest } from './request'
import { type Update, UpdateSchema } from './schemas'

export type TelegramConfig = {
  token: string
  baseUrl?: string
  timeout?: number
}

export type TelegramErrorDetails = { errorCode: number }

export type TelegramContext = ActionContext

export type TelegramActions = {
  getMe: () => Promise<Result<GetMeData>>
  sendMessage: (params: SendMessageParams) => Promise<Result<SendMessageData>>
}

export type TelegramWebhooks = ProviderWebhooks<Update> & {
  set: (params: SetWebhookParams) => Promise<Result<boolean>>
  delete: (params?: DeleteWebhookParams) => Promise<Result<boolean>>
  info: () => Promise<Result<WebhookInfo>>
}

export type TelegramInstance = ProviderInstance<
  'telegram',
  TelegramActions,
  Update,
  TelegramEventMap,
  TelegramWebhooks
>

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
    provider: 'telegram',
    actions: {
      getMe: getMe(ctx),
      sendMessage: sendMessage(ctx),
    },
    webhooks: {
      handle: handleWebhook,
      set: setWebhook(ctx),
      delete: deleteWebhook(ctx),
      info: getWebhookInfo(ctx),
    },
    on: events.on,
    request,
    detector,
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
