import type { BaseOAuthConfig } from '@triggerskit/core/oauth'

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
