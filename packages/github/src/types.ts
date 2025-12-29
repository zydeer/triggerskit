import type { BaseOAuthConfig, OAuthTokens } from '@triggerskit/core/oauth'
import type {
  ActionsMap,
  OAuthProvider,
  Provider,
  ProviderWebhooks,
} from '@triggerskit/core/provider'
import type { Result } from '@triggerskit/core/result'
import type { GitHubEvents } from './events'
import type { GitHubOAuth } from './oauth'
import type {
  Comment,
  CreateCommentParams,
  CreateIssueParams,
  CreateWebhookParams,
  DeleteWebhookParams,
  GetRepoParams,
  GetWebhookParams,
  Issue,
  ListReposParams,
  ListWebhooksParams,
  PingWebhookParams,
  Repository,
  TestWebhookParams,
  UpdateWebhookParams,
  User,
  Webhook,
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

/** GitHub webhooks interface with webhook management actions */
export type GitHubWebhooks = ProviderWebhooks<WebhookEvent> & {
  /** Create a repository webhook */
  create(params: CreateWebhookParams): Promise<Result<Webhook>>
  /** List repository webhooks */
  list(params: ListWebhooksParams): Promise<Result<Webhook[]>>
  /** Get a specific webhook */
  get(params: GetWebhookParams): Promise<Result<Webhook>>
  /** Update a webhook */
  update(params: UpdateWebhookParams): Promise<Result<Webhook>>
  /** Delete a webhook */
  delete(params: DeleteWebhookParams): Promise<Result<void>>
  /** Ping a webhook */
  ping(params: PingWebhookParams): Promise<Result<void>>
  /** Test a webhook */
  test(params: TestWebhookParams): Promise<Result<void>>
}

export type GitHubProviderWithOAuth = OAuthProvider<
  'github',
  GitHubActions,
  GitHubEvents,
  WebhookEvent,
  GitHubWebhooks,
  OAuthTokens,
  GitHubOAuth
>

export type GitHubProviderWithToken = Provider<
  'github',
  GitHubActions,
  GitHubEvents,
  WebhookEvent,
  GitHubWebhooks
>
