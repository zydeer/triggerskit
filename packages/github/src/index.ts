import { createEmitter, createOAuthClient, error } from '@triggerskit/core'
import { createActions } from './actions'
import { createGitHubClient } from './client'
import type { GitHubEvents } from './events'
import { createGitHubOAuth } from './oauth'
import type { GitHubConfig, GitHubProvider } from './types'
import { createWebhookHandler, detectGitHub } from './webhook'

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'

/**
 * Create a GitHub provider instance.
 *
 * @example
 * ```ts
 * // With OAuth
 * const gh = github({
 *   oauth: {
 *     clientId: 'your-client-id',
 *     clientSecret: 'your-client-secret',
 *     redirectUri: 'https://your-app.com/oauth/callback',
 *     scopes: ['repo', 'user']
 *   },
 *   storage: memoryStorage()
 * })
 *
 * // With personal access token
 * const gh = github({ token: 'ghp_...' })
 * ```
 */
export function github(config: GitHubConfig): GitHubProvider {
  const tokenKey = config.tokenKey ?? 'default'

  // Validate config
  if (!config.oauth && !config.token) {
    throw error(
      'GitHub provider requires either oauth config with storage or a token',
      undefined,
      'INVALID_CONFIG',
    )
  }

  if (config.oauth && !config.storage) {
    throw error(
      'OAuth config provided but storage is missing. Both oauth and storage are required for OAuth flow.',
      undefined,
      'MISSING_STORAGE',
    )
  }

  const oauthClient =
    config.oauth && config.storage
      ? createOAuthClient(
          {
            ...config.oauth,
            authorizationUrl: GITHUB_AUTH_URL,
            tokenUrl: GITHUB_TOKEN_URL,
            authMethod: 'body',
          },
          config.storage,
          'github',
        )
      : undefined

  const http = createGitHubClient({ config, tokenKey, oauthClient })
  const emitter = createEmitter<GitHubEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  const baseProvider = {
    name: 'github' as const,
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectGitHub,
  }

  // Return with OAuth if configured
  if (oauthClient) {
    return {
      ...baseProvider,
      oauth: createGitHubOAuth(oauthClient, tokenKey),
    }
  }

  // Return without OAuth
  return baseProvider as GitHubProvider
}

export type { GitHubEvents } from './events'
export type {
  Comment,
  CreateCommentParams,
  CreateIssueParams,
  GetRepoParams,
  Issue,
  IssuesEvent,
  Label,
  ListReposParams,
  Milestone,
  PullRequest,
  PullRequestEvent,
  PushEvent,
  Repository,
  User,
  WebhookEvent,
} from './schemas'
export type {
  GitHubActions,
  GitHubConfig,
  GitHubOAuth,
  GitHubProvider,
} from './types'
