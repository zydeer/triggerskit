import type { OAuthStorage } from '@triggerskit/core/oauth'
import {
  createEvents,
  createProviderOAuth,
  createRequest,
  createTokenGetter,
  fail,
  type ProviderOAuth,
  type Result,
  safeParse,
  setupOAuth,
  type WebhookContext,
  type WebhookDetector,
} from '@triggerskit/core/provider'
import type {
  ProviderInstance,
  ProviderWebhooks,
} from '@triggerskit/core/types'
import { type CreateCommentData, createComment } from './actions/create-comment'
import { type CreateIssueData, createIssue } from './actions/create-issue'
import { type GetRepoData, getRepo } from './actions/get-repo'
import { type GetUserData, getUser } from './actions/get-user'
import { type ListReposData, listRepos } from './actions/list-repos'
import type { GitHubEventMap } from './events'
import type {
  CreateCommentParams,
  CreateIssueParams,
  GetRepoParams,
  IssuesEvent,
  ListReposParams,
  PullRequestEvent,
  PushEvent,
  WebhookEvent,
} from './schemas'
import {
  IssuesEventSchema,
  PullRequestEventSchema,
  PushEventSchema,
  WebhookEventSchema,
} from './schemas'

// === Configuration ===

export type GitHubConfig = {
  /** Personal access token (for simple use cases) */
  token?: string
  /** OAuth configuration */
  oauth?: {
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes?: string[]
  }
  /** Storage adapter for OAuth tokens */
  storage?: OAuthStorage
  /** Key to store/retrieve OAuth tokens (default: 'default') */
  tokenKey?: string
  /** Custom base URL (default: 'https://api.github.com') */
  baseUrl?: string
  /** Request timeout in milliseconds */
  timeout?: number
}

// === Types ===

export type GitHubActions = {
  /** Get the authenticated user */
  getUser: () => Promise<Result<GetUserData>>
  /** List repositories for the authenticated user */
  listRepos: (params?: ListReposParams) => Promise<Result<ListReposData>>
  /** Get a specific repository */
  getRepo: (params: GetRepoParams) => Promise<Result<GetRepoData>>
  /** Create an issue in a repository */
  createIssue: (params: CreateIssueParams) => Promise<Result<CreateIssueData>>
  /** Create a comment on an issue */
  createComment: (
    params: CreateCommentParams,
  ) => Promise<Result<CreateCommentData>>
}

export type GitHubInstance = ProviderInstance<
  'github',
  GitHubActions,
  WebhookEvent,
  GitHubEventMap,
  ProviderWebhooks<WebhookEvent>
> & {
  /** OAuth utilities (when OAuth is configured) */
  oauth?: ProviderOAuth
}

// === Constants ===

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'

// === Provider ===

function isGitHubWebhook(ctx: WebhookContext): boolean {
  return (
    ctx.headers.has('x-github-event') || ctx.headers.has('x-hub-signature-256')
  )
}

/**
 * Create a GitHub provider instance
 */
export function github(config: GitHubConfig): GitHubInstance {
  const tokenKey = config.tokenKey ?? 'default'
  const baseUrl = config.baseUrl ?? 'https://api.github.com'

  // Setup OAuth if configured
  const oauthHandler = setupOAuth(config.oauth, config.storage, 'github', {
    authorizationUrl: GITHUB_AUTH_URL,
    tokenUrl: GITHUB_TOKEN_URL,
    authMethod: 'body',
  })

  // Create request function
  const request = createRequest({
    baseUrl,
    timeout: config.timeout,
    getToken: createTokenGetter(config.token, oauthHandler, tokenKey),
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const ctx = { request }
  const events = createEvents<GitHubEventMap>()

  // Webhook handler
  async function handleWebhook(req: Request): Promise<Result<WebhookEvent>> {
    try {
      const body = await req.json()
      const eventType = req.headers.get('x-github-event')

      switch (eventType) {
        case 'push': {
          const result = safeParse(PushEventSchema, body)
          if (result.data) events.emit('push', result.data as PushEvent)
          return result as Result<WebhookEvent>
        }
        case 'issues': {
          const result = safeParse(IssuesEventSchema, body)
          if (result.data) events.emit('issues', result.data as IssuesEvent)
          return result as Result<WebhookEvent>
        }
        case 'pull_request': {
          const result = safeParse(PullRequestEventSchema, body)
          if (result.data)
            events.emit('pull_request', result.data as PullRequestEvent)
          return result as Result<WebhookEvent>
        }
        default: {
          const result = safeParse(WebhookEventSchema, body)
          if (result.data) events.emit('webhook', result.data)
          return result
        }
      }
    } catch (e) {
      return fail(e)
    }
  }

  const detector: WebhookDetector<WebhookEvent> = {
    detect: isGitHubWebhook,
    handleWebhook,
  }

  return {
    provider: 'github',
    actions: {
      getUser: getUser(ctx),
      listRepos: listRepos(ctx),
      getRepo: getRepo(ctx),
      createIssue: createIssue(ctx),
      createComment: createComment(ctx),
    },
    webhooks: { handle: handleWebhook },
    on: events.on,
    request,
    detector,
    ...(oauthHandler && { oauth: createProviderOAuth(oauthHandler, tokenKey) }),
  }
}

// === Exports ===

export type { CreateCommentData } from './actions/create-comment'
export type { CreateIssueData } from './actions/create-issue'
export type { GetRepoData } from './actions/get-repo'
export type { GetUserData } from './actions/get-user'
export type { ListReposData } from './actions/list-repos'
export type { GitHubEvent, GitHubEventMap } from './events'
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
