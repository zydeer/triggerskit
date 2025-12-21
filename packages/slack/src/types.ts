import type {
  ActionsMap,
  OAuthProvider,
  Provider,
  ProviderWebhooks,
  Result,
  Storage,
} from '@triggerskit/core'
import type { SlackEvents } from './events'
import type { SlackOAuth } from './oauth'
import type { Message, SlackEvent, User } from './schemas'

export interface SlackOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
  userScopes?: string[]
}

export interface SlackConfigWithOAuth {
  oauth: SlackOAuthConfig
  storage: Storage
  token?: never
  tokenKey?: string
  baseUrl?: string
  timeout?: number
  signingSecret?: string
}

export interface SlackConfigWithToken {
  token: string
  oauth?: never
  storage?: never
  tokenKey?: never
  baseUrl?: string
  timeout?: number
  signingSecret?: string
}

export type SlackConfig = SlackConfigWithOAuth | SlackConfigWithToken

export interface SlackActions extends ActionsMap {
  authTest(): Promise<Result<AuthTestResponse>>
  postMessage(params: PostMessageParams): Promise<Result<Message>>
  getUserInfo(params: { user: string }): Promise<Result<User>>
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
  response_metadata?: { next_cursor?: string }
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
  topic?: { value: string; creator: string; last_set: number }
  purpose?: { value: string; creator: string; last_set: number }
  previous_names?: string[]
  num_members?: number
}

export type SlackProviderWithOAuth = OAuthProvider<
  'slack',
  SlackActions,
  SlackEvents,
  SlackEvent,
  ProviderWebhooks<SlackEvent>,
  SlackOAuth
>

export type SlackProviderWithToken = Provider<
  'slack',
  SlackActions,
  SlackEvents,
  SlackEvent,
  ProviderWebhooks<SlackEvent>
>

export type SlackProvider = SlackProviderWithOAuth | SlackProviderWithToken

export interface SlackErrorDetails {
  error?: string
  needed?: string
  provided?: string
}
