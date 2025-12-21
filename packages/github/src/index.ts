import { createEmitter, createOAuthClient } from '@triggerskit/core'
import { createActions } from './actions'
import { createGitHubClient } from './client'
import type { GitHubEvents } from './events'
import { createGitHubOAuth } from './oauth'
import type { GitHubConfig, GitHubProvider } from './types'
import { createWebhookHandler, detectGitHub } from './webhook'

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'

export function github(config: GitHubConfig): GitHubProvider {
  const tokenKey = config.tokenKey ?? 'default'

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

  return {
    name: 'github',
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectGitHub,
    ...(oauthClient && { oauth: createGitHubOAuth(oauthClient, tokenKey) }),
  }
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
