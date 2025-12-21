import type {
  ActionsMap,
  BaseOAuthConfig,
  OAuthProvider,
  OAuthTokens,
  Provider,
  ProviderWebhooks,
  Result,
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
  /** GitHub OAuth app client ID */
  clientId: string
  /** GitHub OAuth app client secret */
  clientSecret: string
  /** OAuth callback redirect URI */
  redirectUri: string
  /** OAuth scopes to request (e.g., ['repo', 'user']) */
  scopes?: string[]
}

export interface GitHubConfigWithOAuth extends BaseOAuthConfig {
  /** OAuth configuration */
  oauth: GitHubOAuthConfig
  token?: never
  /** Custom base URL (default: 'https://api.github.com') */
  baseUrl?: string
}

export interface GitHubConfigWithToken {
  /** GitHub personal access token */
  token: string
  oauth?: never
  /** Custom base URL (default: 'https://api.github.com') */
  baseUrl?: string
}

export type GitHubConfig = GitHubConfigWithOAuth | GitHubConfigWithToken

export interface GitHubActions extends ActionsMap {
  /** Get information about the authenticated user */
  getUser(): Promise<Result<User>>
  /** List repositories for the authenticated user */
  listRepos(params?: ListReposParams): Promise<Result<Repository[]>>
  /** Get a specific repository */
  getRepo(params: GetRepoParams): Promise<Result<Repository>>
  /** Create a new issue in a repository */
  createIssue(params: CreateIssueParams): Promise<Result<Issue>>
  /** Create a comment on an issue or pull request */
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
