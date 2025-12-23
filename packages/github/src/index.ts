import { createEmitter } from '@triggerskit/core/events'
import { TriggersError } from '@triggerskit/core/result'
import { createActions } from './actions'
import { createGitHubClient } from './client'
import type { GitHubEvents } from './events'
import { createGitHubOAuth } from './oauth'
import type {
  GitHubConfigWithOAuth,
  GitHubConfigWithToken,
  GitHubProviderWithOAuth,
  GitHubProviderWithToken,
} from './types'
import { createWebhookHandler, detectGitHub } from './webhook'

export function github(config: GitHubConfigWithOAuth): GitHubProviderWithOAuth

export function github(config: GitHubConfigWithToken): GitHubProviderWithToken

export function github(
  config: GitHubConfigWithOAuth | GitHubConfigWithToken,
): GitHubProviderWithOAuth | GitHubProviderWithToken {
  const emitter = createEmitter<GitHubEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  if ('oauth' in config && config.oauth) {
    const { oauth: oauthConfig, storage } = config

    if (!storage) {
      throw new TriggersError('GitHub oauth requires storage')
    }

    return {
      name: 'github',
      webhooks: { handle: handleWebhook },
      on: emitter.on,
      detect: detectGitHub,
      forUser: (userId) => {
        const oauth = createGitHubOAuth(oauthConfig, storage, userId)
        const userHttp = createGitHubClient({
          config,
          getToken: () => oauth.getAccessToken(),
        })
        return { oauth, actions: createActions(userHttp), http: userHttp }
      },
    }
  }

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
