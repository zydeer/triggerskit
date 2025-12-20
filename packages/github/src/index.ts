import {
  createOAuth,
  type OAuthHandler,
  type OAuthStorage,
} from '@triggerskit/core/oauth'
import type {
  ActionContext,
  ProviderInstance,
  ProviderWebhooks,
  Result,
  WebhookContext,
  WebhookDetector,
} from '@triggerskit/core/types'
import { createEvents } from '@triggerskit/core/types'
import { fail, ok, safeParse } from '@triggerskit/core/utils'
import { type CreateCommentData, createComment } from './actions/create-comment'
import { type CreateIssueData, createIssue } from './actions/create-issue'
import { type GetRepoData, getRepo } from './actions/get-repo'
import { type GetUserData, getUser } from './actions/get-user'
import { type ListReposData, listRepos } from './actions/list-repos'
import type { GitHubEventMap } from './events'
import { createRequest } from './request'
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
  /** Personal access token for authentication (for simple use cases) */
  token?: string
  /** OAuth configuration (for OAuth flow) */
  oauth?: {
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes?: string[]
  }
  /** Storage adapter for OAuth tokens (required when using OAuth) */
  storage?: OAuthStorage
  /** Key to store/retrieve OAuth tokens (default: 'default') */
  tokenKey?: string
  /** Custom base URL for GitHub API (default: 'https://api.github.com') */
  baseUrl?: string
  /** Request timeout in milliseconds */
  timeout?: number
}

// === Types ===

export type GitHubErrorDetails = {
  status: number
  errors?: Array<{ resource: string; field: string; code: string }>
}

export type GitHubContext = ActionContext

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

export type GitHubOAuth = {
  /** Get authorization URL for OAuth flow */
  getAuthorizationUrl: (options?: {
    state?: string
    scopes?: string[]
  }) => Promise<{ url: string; state: string }>
  /** Handle OAuth callback - exchange code for tokens */
  handleCallback: (
    code: string,
    state: string,
  ) => Promise<Result<{ success: true }>>
  /** Check if OAuth tokens are available and valid */
  isAuthenticated: () => Promise<boolean>
  /** Revoke/delete stored tokens */
  revokeTokens: () => Promise<void>
}

export type GitHubWebhooks = ProviderWebhooks<WebhookEvent>

export type GitHubInstance = ProviderInstance<
  'github',
  GitHubActions,
  WebhookEvent,
  GitHubEventMap,
  GitHubWebhooks
> & {
  /** OAuth utilities (available when OAuth is configured) */
  oauth?: GitHubOAuth
}

// === Provider ===

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'

function isGitHubWebhook(ctx: WebhookContext): boolean {
  // GitHub webhooks have X-GitHub-Event header
  if (ctx.headers.has('x-github-event')) {
    return true
  }
  // Check for GitHub webhook signature
  if (ctx.headers.has('x-hub-signature-256')) {
    return true
  }
  return false
}

/**
 * Create a GitHub provider instance
 */
export function github(config: GitHubConfig): GitHubInstance {
  const tokenKey = config.tokenKey ?? 'default'

  // Setup OAuth handler if configured
  let oauthHandler: OAuthHandler | undefined
  if (config.oauth && config.storage) {
    oauthHandler = createOAuth(
      {
        authorizationUrl: GITHUB_AUTH_URL,
        tokenUrl: GITHUB_TOKEN_URL,
        clientId: config.oauth.clientId,
        clientSecret: config.oauth.clientSecret,
        redirectUri: config.oauth.redirectUri,
        scopes: config.oauth.scopes,
        authMethod: 'body',
      },
      config.storage,
      'github',
    )
  }

  const request = createRequest({
    config: { ...config, tokenKey },
    oauth: oauthHandler,
  })
  const ctx: GitHubContext = { request }
  const events = createEvents<GitHubEventMap>()

  async function handleWebhook(req: Request): Promise<Result<WebhookEvent>> {
    try {
      const body = await req.json()
      const eventType = req.headers.get('x-github-event')

      // Parse based on event type
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

  // Build OAuth utilities if configured
  let oauth: GitHubOAuth | undefined
  if (oauthHandler) {
    oauth = {
      getAuthorizationUrl: oauthHandler.getAuthorizationUrl,
      async handleCallback(
        code: string,
        state: string,
      ): Promise<Result<{ success: true }>> {
        try {
          const tokens = await oauthHandler.exchangeCode(code, state)
          await oauthHandler.storeTokens(tokenKey, tokens)
          return ok({ success: true })
        } catch (e) {
          return fail(e)
        }
      },
      isAuthenticated: () => oauthHandler.hasValidTokens(tokenKey),
      revokeTokens: () => oauthHandler.deleteTokens(tokenKey),
    }
  }

  const instance: GitHubInstance = {
    provider: 'github',
    actions: {
      getUser: getUser(ctx),
      listRepos: listRepos(ctx),
      getRepo: getRepo(ctx),
      createIssue: createIssue(ctx),
      createComment: createComment(ctx),
    },
    webhooks: {
      handle: handleWebhook,
    },
    on: events.on,
    request,
    detector,
  }

  if (oauth) {
    instance.oauth = oauth
  }

  return instance
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
