import type {
  ActionsMap,
  BaseOAuthConfig,
  OAuthProvider,
  Provider,
  ProviderWebhooks,
  Result,
} from '@triggerskit/core'
import type { SlackEvents } from './events'
import type { SlackOAuth, SlackTokens } from './oauth'
import type {
  AuthTestData,
  ConversationsList,
  GetUserInfoParams,
  ListConversationsParams,
  Message,
  PostMessageParams,
  SlackEvent,
  User,
} from './schemas'

export interface SlackOAuthConfig {
  /** Slack OAuth app client ID */
  clientId: string
  /** Slack OAuth app client secret */
  clientSecret: string
  /** OAuth callback redirect URI */
  redirectUri: string
  /** Bot scopes to request (e.g., ['chat:write', 'users:read']) */
  scopes?: string[]
  /** User scopes to request (optional) */
  userScopes?: string[]
}

export interface SlackConfigWithOAuth extends BaseOAuthConfig {
  /** OAuth configuration */
  oauth: SlackOAuthConfig
  token?: never
  /** Custom base URL (default: 'https://slack.com/api') */
  baseUrl?: string
  /** Signing secret for webhook verification */
  signingSecret?: string
}

export interface SlackConfigWithToken {
  /** Slack bot token (xoxb-...) or user token (xoxp-...) */
  token: string
  oauth?: never
  /** Custom base URL (default: 'https://slack.com/api') */
  baseUrl?: string
  /** Signing secret for webhook verification */
  signingSecret?: string
}

export type SlackConfig = SlackConfigWithOAuth | SlackConfigWithToken

export interface SlackActions extends ActionsMap {
  /** Test authentication and get workspace/user information */
  authTest(): Promise<Result<AuthTestData>>
  /** Post a message to a channel */
  postMessage(params: PostMessageParams): Promise<Result<Message>>
  /** Get information about a user */
  getUserInfo(params: GetUserInfoParams): Promise<Result<User>>
  /** List conversations (channels) the bot has access to */
  listConversations(
    params?: ListConversationsParams,
  ): Promise<Result<ConversationsList>>
}

export type SlackProviderWithOAuth = OAuthProvider<
  'slack',
  SlackActions,
  SlackEvents,
  SlackEvent,
  ProviderWebhooks<SlackEvent>,
  SlackTokens,
  SlackOAuth
>

export type SlackProviderWithToken = Provider<
  'slack',
  SlackActions,
  SlackEvents,
  SlackEvent,
  ProviderWebhooks<SlackEvent>
>
