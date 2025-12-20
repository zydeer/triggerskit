import type {
  ActionsMap,
  Provider,
  ProviderWebhooks,
  Result,
  Storage,
} from '@triggerskit/core'
import type { GitHubEvents } from './events'
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

export interface GitHubConfig {
  /** Personal access token (for simple authentication) */
  token?: string
  /** OAuth configuration (for OAuth flow) */
  oauth?: {
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes?: string[]
  }
  /** Storage adapter for OAuth tokens */
  storage?: Storage
  /** Key to store/retrieve OAuth tokens (default: 'default') */
  tokenKey?: string
  /** Custom base URL (default: 'https://api.github.com') */
  baseUrl?: string
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number
}

export interface GitHubActions extends ActionsMap {
  /** Get the authenticated user */
  getUser(): Promise<Result<User>>
  /** List repositories for the authenticated user */
  listRepos(params?: ListReposParams): Promise<Result<Repository[]>>
  /** Get a specific repository */
  getRepo(params: GetRepoParams): Promise<Result<Repository>>
  /** Create an issue in a repository */
  createIssue(params: CreateIssueParams): Promise<Result<Issue>>
  /** Create a comment on an issue */
  createComment(params: CreateCommentParams): Promise<Result<Comment>>
}

export interface GitHubOAuth {
  /** Get authorization URL for OAuth flow */
  getAuthUrl(options?: {
    state?: string
    scopes?: string[]
  }): Promise<{ url: string; state: string }>
  /** Handle OAuth callback - exchange code for tokens */
  handleCallback(
    code: string,
    state: string,
  ): Promise<Result<{ success: true }>>
  /** Check if OAuth tokens are available and valid */
  isAuthenticated(): Promise<boolean>
  /** Revoke/delete stored tokens */
  revokeTokens(): Promise<void>
}

export type GitHubProvider = Provider<
  'github',
  GitHubActions,
  GitHubEvents,
  WebhookEvent,
  ProviderWebhooks<WebhookEvent>
> & {
  /** OAuth utilities (when OAuth is configured) */
  oauth?: GitHubOAuth
}
