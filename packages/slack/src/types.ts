import type {
  ActionsMap,
  OAuthProvider,
  Provider,
  ProviderWebhooks,
  Result,
  Storage,
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
  signingSecret?: string
}

export type SlackConfig = SlackConfigWithOAuth | SlackConfigWithToken

export interface SlackActions extends ActionsMap {
  authTest(): Promise<Result<AuthTestData>>
  postMessage(params: PostMessageParams): Promise<Result<Message>>
  getUserInfo(params: GetUserInfoParams): Promise<Result<User>>
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

export type SlackProvider = SlackProviderWithOAuth | SlackProviderWithToken
