import { createEmitter, TriggersError } from '@triggerskit/core'
import { createActions } from './actions'
import { createGitHubClient } from './client'
import type { GitHubEvents } from './events'
import { createGitHubOAuth } from './oauth'
import type {
  GitHubConfig,
  GitHubConfigWithOAuth,
  GitHubConfigWithToken,
  GitHubProviderWithOAuth,
  GitHubProviderWithToken,
} from './types'
import { createWebhookHandler, detectGitHub } from './webhook'

export function github(config: GitHubConfigWithOAuth): GitHubProviderWithOAuth

export function github(config: GitHubConfigWithToken): GitHubProviderWithToken

/**
 * Create a GitHub provider.
 */
export function github(
  config: GitHubConfig,
): GitHubProviderWithOAuth | GitHubProviderWithToken {
  if (!('oauth' in config) && !('token' in config)) {
    throw new TriggersError(
      'GitHub requires either oauth config with storage, or a token',
    )
  }

  if ('oauth' in config && config.oauth && !config.storage) {
    throw new TriggersError('GitHub oauth config requires storage')
  }

  const emitter = createEmitter<GitHubEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  if ('oauth' in config && config.oauth && config.storage) {
    const oauth = createGitHubOAuth(
      config.oauth,
      config.storage,
      config.tokenKey,
    )

    const http = createGitHubClient({
      config,
      getToken: () => oauth.getAccessToken(),
    })

    return {
      name: 'github',
      actions: createActions(http),
      webhooks: { handle: handleWebhook },
      on: emitter.on,
      http,
      detect: detectGitHub,
      oauth,
    }
  }

  // token flow
  const http = createGitHubClient({ config })

  return {
    name: 'github',
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectGitHub,
  }
}

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

export default github
