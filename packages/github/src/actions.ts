import type { HttpClient } from '@triggerskit/core/http'
import { ok, parse, type Result, unwrap } from '@triggerskit/core/result'
import { z } from 'zod'
import {
  type Comment,
  CommentSchema,
  type CreateCommentParams,
  CreateCommentParamsSchema,
  type CreateIssueParams,
  CreateIssueParamsSchema,
  type CreateWebhookParams,
  CreateWebhookParamsSchema,
  type DeleteWebhookParams,
  DeleteWebhookParamsSchema,
  type GetRepoParams,
  GetRepoParamsSchema,
  type GetWebhookParams,
  GetWebhookParamsSchema,
  type Issue,
  IssueSchema,
  type ListReposParams,
  ListReposParamsSchema,
  type ListWebhooksParams,
  ListWebhooksParamsSchema,
  type PingWebhookParams,
  PingWebhookParamsSchema,
  type Repository,
  RepositorySchema,
  type TestWebhookParams,
  TestWebhookParamsSchema,
  type UpdateWebhookParams,
  UpdateWebhookParamsSchema,
  type User,
  UserSchema,
  type Webhook,
  WebhookSchema,
} from './schemas'
import type { GitHubActions, GitHubWebhooks } from './types'

export function createActions(http: HttpClient): GitHubActions {
  return {
    async getUser(): Promise<Result<User>> {
      return unwrap(await http('/user'), { schema: UserSchema })
    },

    async listRepos(params?: ListReposParams): Promise<Result<Repository[]>> {
      if (params) {
        const validated = parse(ListReposParamsSchema, params)
        if (!validated.ok) return validated
      }

      const queryParams = params
        ? `?${new URLSearchParams(params as Record<string, string>)}`
        : ''

      return unwrap(await http(`/user/repos${queryParams}`), {
        schema: z.array(RepositorySchema),
      })
    },

    async getRepo(params: GetRepoParams): Promise<Result<Repository>> {
      const validated = parse(GetRepoParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo } = validated.data
      return unwrap(await http(`/repos/${owner}/${repo}`), {
        schema: RepositorySchema,
      })
    },

    async createIssue(params: CreateIssueParams): Promise<Result<Issue>> {
      const validated = parse(CreateIssueParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, ...body } = validated.data
      return unwrap(
        await http(`/repos/${owner}/${repo}/issues`, {
          method: 'POST',
          body: JSON.stringify(body),
        }),
        { schema: IssueSchema },
      )
    },

    async createComment(params: CreateCommentParams): Promise<Result<Comment>> {
      const validated = parse(CreateCommentParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, issue_number, body } = validated.data
      return unwrap(
        await http(`/repos/${owner}/${repo}/issues/${issue_number}/comments`, {
          method: 'POST',
          body: JSON.stringify({ body }),
        }),
        { schema: CommentSchema },
      )
    },
  }
}

export function createWebhookActions(
  http: HttpClient,
  handle: GitHubWebhooks['handle'],
): GitHubWebhooks {
  return {
    handle,

    async create(params: CreateWebhookParams): Promise<Result<Webhook>> {
      const validated = parse(CreateWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, ...body } = validated.data
      return unwrap(
        await http(`/repos/${owner}/${repo}/hooks`, {
          method: 'POST',
          body: JSON.stringify({ name: 'web', ...body }),
        }),
        { schema: WebhookSchema },
      )
    },

    async list(params: ListWebhooksParams): Promise<Result<Webhook[]>> {
      const validated = parse(ListWebhooksParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, ...queryParams } = validated.data
      const query = Object.keys(queryParams).length
        ? `?${new URLSearchParams(queryParams as Record<string, string>)}`
        : ''

      return unwrap(await http(`/repos/${owner}/${repo}/hooks${query}`), {
        schema: z.array(WebhookSchema),
      })
    },

    async get(params: GetWebhookParams): Promise<Result<Webhook>> {
      const validated = parse(GetWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id } = validated.data
      return unwrap(await http(`/repos/${owner}/${repo}/hooks/${hook_id}`), {
        schema: WebhookSchema,
      })
    },

    async update(params: UpdateWebhookParams): Promise<Result<Webhook>> {
      const validated = parse(UpdateWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id, ...body } = validated.data
      return unwrap(
        await http(`/repos/${owner}/${repo}/hooks/${hook_id}`, {
          method: 'PATCH',
          body: JSON.stringify(body),
        }),
        { schema: WebhookSchema },
      )
    },

    async delete(params: DeleteWebhookParams): Promise<Result<void>> {
      const validated = parse(DeleteWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id } = validated.data
      const response = await http(`/repos/${owner}/${repo}/hooks/${hook_id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        return unwrap(response, {})
      }

      return ok(undefined)
    },

    async ping(params: PingWebhookParams): Promise<Result<void>> {
      const validated = parse(PingWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id } = validated.data
      const response = await http(
        `/repos/${owner}/${repo}/hooks/${hook_id}/pings`,
        {
          method: 'POST',
        },
      )

      if (!response.ok) {
        return unwrap(response, {})
      }

      return ok(undefined)
    },

    async test(params: TestWebhookParams): Promise<Result<void>> {
      const validated = parse(TestWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id } = validated.data
      const response = await http(
        `/repos/${owner}/${repo}/hooks/${hook_id}/tests`,
        {
          method: 'POST',
        },
      )

      if (!response.ok) {
        return unwrap(response, {})
      }

      return ok(undefined)
    },
  }
}
