import type {
  ActionsMap,
  BaseOAuth,
  OAuthProvider,
  ProviderWebhooks,
  Result,
  Storage,
} from '@triggerskit/core'
import type { SlackEvents } from './events'
import type { Message, SlackEvent, User } from './schemas'

export interface SlackConfig {
  /** Bot token (for simple authentication) */
  token?: string
  /** OAuth configuration (for OAuth flow) */
  oauth?: {
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes?: string[]
    userScopes?: string[] // Separate user scopes for Slack
  }
  /** Storage adapter for OAuth tokens */
  storage?: Storage
  /** Key to store/retrieve OAuth tokens (default: 'default') */
  tokenKey?: string
  /** Custom base URL (default: 'https://slack.com/api') */
  baseUrl?: string
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number
  /** Signing secret for webhook verification */
  signingSecret?: string
}

export interface SlackActions extends ActionsMap {
  /** Get information about the bot/app */
  authTest(): Promise<Result<AuthTestResponse>>
  /** Post a message to a channel */
  postMessage(params: PostMessageParams): Promise<Result<Message>>
  /** Get user info */
  getUserInfo(params: { user: string }): Promise<Result<User>>
  /** List conversations (channels) */
  listConversations(
    params?: ListConversationsParams,
  ): Promise<Result<ConversationsListResponse>>
}

export interface AuthTestResponse {
  ok: boolean
  url: string
  team: string
  user: string
  team_id: string
  user_id: string
  bot_id?: string
  is_enterprise_install?: boolean
}

export interface PostMessageParams {
  channel: string
  text?: string
  blocks?: unknown[]
  attachments?: unknown[]
  thread_ts?: string
  reply_broadcast?: boolean
  mrkdwn?: boolean
}

export interface ListConversationsParams {
  cursor?: string
  exclude_archived?: boolean
  limit?: number
  team_id?: string
  types?: string
}

export interface ConversationsListResponse {
  ok: boolean
  channels: Channel[]
  response_metadata?: {
    next_cursor?: string
  }
}

export interface Channel {
  id: string
  name: string
  is_channel: boolean
  is_group: boolean
  is_im: boolean
  is_mpim: boolean
  is_private: boolean
  created: number
  is_archived: boolean
  is_general: boolean
  unlinked: number
  name_normalized: string
  is_shared: boolean
  is_org_shared: boolean
  is_pending_ext_shared: boolean
  pending_shared: string[]
  context_team_id: string
  updated: number
  parent_conversation?: string
  creator: string
  is_ext_shared: boolean
  shared_team_ids: string[]
  pending_connected_team_ids: string[]
  is_member: boolean
  topic?: {
    value: string
    creator: string
    last_set: number
  }
  purpose?: {
    value: string
    creator: string
    last_set: number
  }
  previous_names?: string[]
  num_members?: number
}

export interface SlackOAuth extends BaseOAuth {
  /** Get bot access token (if available) */
  getBotToken(): Promise<string | null>
  /** Get user access token (if available) */
  getUserToken(): Promise<string | null>
}

export type SlackProvider = OAuthProvider<
  'slack',
  SlackActions,
  SlackEvents,
  SlackEvent,
  ProviderWebhooks<SlackEvent>,
  SlackOAuth
>

export interface SlackErrorDetails {
  error?: string
  needed?: string
  provided?: string
}
