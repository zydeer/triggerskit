import { createEmitter } from '@triggerskit/core/events'
import { TriggersError } from '@triggerskit/core/result'
import { createActions, createWebhookActions } from './actions'
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

    const http = createGitHubClient({ config })

    return {
      name: 'github',
      webhooks: createWebhookActions(http, handleWebhook),
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
    webhooks: createWebhookActions(http, handleWebhook),
    on: emitter.on,
    http,
    detect: detectGitHub,
  }
}

export type {
  CheckRunEvent,
  CheckSuiteEvent,
  Comment,
  CreateCommentParams,
  CreateEvent,
  CreateIssueParams,
  CreateWebhookParams,
  DeleteEvent,
  DeleteWebhookParams,
  DeploymentEvent,
  DeploymentStatusEvent,
  ForkEvent,
  GetRepoParams,
  GetUserParams,
  GetWebhookParams,
  Issue,
  IssueCommentEvent,
  IssuesEvent,
  Label,
  License,
  ListOrgReposParams,
  ListReposParams,
  ListWebhooksParams,
  Milestone,
  Permissions,
  PingEvent,
  PingWebhookParams,
  PullRequest,
  PullRequestEvent,
  PullRequestReference,
  PullRequestReviewEvent,
  PushEvent,
  ReleaseEvent,
  Repository,
  SecurityAndAnalysis,
  StarEvent,
  TestWebhookParams,
  UpdateWebhookParams,
  User,
  WatchEvent,
  Webhook,
  WebhookConfig,
  WebhookEvent,
  WorkflowRunEvent,
} from './schemas'

export default github
