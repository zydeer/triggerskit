import { createEmitter } from '@triggerskit/core/events'
import { TriggersError } from '@triggerskit/core/result'
import { createActions, createWebhookActions } from './actions'
import { createGitHubClient } from './client'
import type { GitHubEvents } from './events'
import { createGitHubOAuth } from './oauth'
import type { GitHubConfigWithOAuth, GitHubConfigWithToken } from './types'
import { createWebhookHandler, detectGitHub } from './webhook'

export function github(
  config: GitHubConfigWithOAuth,
): ReturnType<typeof createGitHubWithOAuth>

export function github(
  config: GitHubConfigWithToken,
): ReturnType<typeof createGitHubWithToken>

export function github(config: GitHubConfigWithOAuth | GitHubConfigWithToken) {
  const emitter = createEmitter<GitHubEvents>()
  const handleWebhook = createWebhookHandler(emitter)

  if ('oauth' in config && config.oauth) {
    return createGitHubWithOAuth(config, emitter, handleWebhook)
  }

  return createGitHubWithToken(config, emitter, handleWebhook)
}

function createGitHubWithOAuth(
  config: GitHubConfigWithOAuth,
  emitter: ReturnType<typeof createEmitter<GitHubEvents>>,
  handleWebhook: ReturnType<typeof createWebhookHandler>,
) {
  const { oauth: oauthConfig, storage } = config

  if (!storage) {
    throw new TriggersError('GitHub oauth requires storage')
  }

  const http = createGitHubClient({ config })

  return {
    name: 'github' as const,
    webhooks: createWebhookActions(http, handleWebhook),
    on: emitter.on,
    detect: detectGitHub,
    forUser: (userId: string) => {
      const oauth = createGitHubOAuth(oauthConfig, storage, userId)

      const userHttp = createGitHubClient({
        config,
        getToken: () => oauth.getAccessToken(),
      })

      return { oauth, actions: createActions(userHttp), http: userHttp }
    },
  }
}

function createGitHubWithToken(
  config: GitHubConfigWithToken,
  emitter: ReturnType<typeof createEmitter<GitHubEvents>>,
  handleWebhook: ReturnType<typeof createWebhookHandler>,
) {
  const http = createGitHubClient({ config })

  return {
    name: 'github' as const,
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
