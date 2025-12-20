import type {
  ActionsMap,
  Provider,
  ProviderWebhooks,
  Result,
} from '@triggerskit/core'
import type { TelegramEvents } from './events'
import type {
  GetMeData,
  Message,
  SendMessageParams,
  Update,
  WebhookInfo,
} from './schemas'

export interface TelegramConfig {
  /** Bot token from @BotFather */
  token: string
  /** Custom base URL (default: 'https://api.telegram.org') */
  baseUrl?: string
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number
}

export interface TelegramActions extends ActionsMap {
  /** Get information about the bot */
  getMe(): Promise<Result<GetMeData>>
  /** Send a text message */
  sendMessage(params: SendMessageParams): Promise<Result<Message>>
}

export interface SetWebhookParams {
  /** HTTPS URL to send updates to */
  url: string
  /** Upload your public key certificate */
  certificate?: string
  /** Fixed IP address for webhook */
  ip_address?: string
  /** Maximum allowed connections (1-100, default: 40) */
  max_connections?: number
  /** List of update types to receive */
  allowed_updates?: string[]
  /** Pass True to drop all pending updates */
  drop_pending_updates?: boolean
  /** Secret token to be sent in header */
  secret_token?: string
}

export interface DeleteWebhookParams {
  /** Pass True to drop all pending updates */
  drop_pending_updates?: boolean
}

export type TelegramWebhooks = ProviderWebhooks<Update> & {
  /** Set webhook URL for receiving updates */
  set(params: SetWebhookParams): Promise<Result<boolean>>
  /** Delete webhook */
  delete(params?: DeleteWebhookParams): Promise<Result<boolean>>
  /** Get current webhook info */
  info(): Promise<Result<WebhookInfo>>
}

export type TelegramProvider = Provider<
  'telegram',
  TelegramActions,
  TelegramEvents,
  Update,
  TelegramWebhooks
>

export interface TelegramErrorDetails {
  errorCode?: number
}
