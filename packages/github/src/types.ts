import type {
  ActionsMap,
  OAuthProvider,
  OAuthTokens,
  Provider,
  ProviderWebhooks,
  Result,
  Storage,
} from '@triggerskit/core'
import type { GitHubEvents } from './events'
import type { GitHubOAuth } from './oauth'
import type {
  Comment,
  CreateCommentParams,
  CreateIssueParams,
  GetRepoParams,
  Issue,
  ListReposParams,
  Repository,
  User,
  WebhookEvent,
} from './schemas'

export interface GitHubOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
}

export interface GitHubConfigWithOAuth {
  oauth: GitHubOAuthConfig
  storage: Storage
  token?: never
  tokenKey?: string
  baseUrl?: string
  timeout?: number
}

export interface GitHubConfigWithToken {
  token: string
  oauth?: never
  storage?: never
  tokenKey?: never
  baseUrl?: string
  timeout?: number
}

export type GitHubConfig = GitHubConfigWithOAuth | GitHubConfigWithToken

export interface GitHubActions extends ActionsMap {
  getUser(): Promise<Result<User>>
  listRepos(params?: ListReposParams): Promise<Result<Repository[]>>
  getRepo(params: GetRepoParams): Promise<Result<Repository>>
  createIssue(params: CreateIssueParams): Promise<Result<Issue>>
  createComment(params: CreateCommentParams): Promise<Result<Comment>>
}

export type GitHubProviderWithOAuth = OAuthProvider<
  'github',
  GitHubActions,
  GitHubEvents,
  WebhookEvent,
  ProviderWebhooks<WebhookEvent>,
  OAuthTokens,
  GitHubOAuth
>

export type GitHubProviderWithToken = Provider<
  'github',
  GitHubActions,
  GitHubEvents,
  WebhookEvent,
  ProviderWebhooks<WebhookEvent>
>

export type GitHubProvider = GitHubProviderWithOAuth | GitHubProviderWithToken
