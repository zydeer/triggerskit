import type { HttpClient } from '@triggerskit/core/http'
import type { ProviderWebhooks } from '@triggerskit/core/provider'
import { ok, parse, unwrap } from '@triggerskit/core/result'
import { z } from 'zod'
import {
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
  IssueSchema,
  type ListReposParams,
  ListReposParamsSchema,
  type ListWebhooksParams,
  ListWebhooksParamsSchema,
  type PingWebhookParams,
  PingWebhookParamsSchema,
  RepositorySchema,
  type TestWebhookParams,
  TestWebhookParamsSchema,
  type UpdateWebhookParams,
  UpdateWebhookParamsSchema,
  UserSchema,
  type WebhookEvent,
  WebhookSchema,
} from './schemas'

export function createActions(http: HttpClient) {
  return {
    /**
     * Get information about the authenticated user.
     * @returns User profile information
     */
    async getUser() {
      return unwrap(await http('/user'), { schema: UserSchema })
    },

    /**
     * List repositories for the authenticated user.
     * @param params - Optional parameters for filtering and pagination
     * @returns Array of repository objects
     */
    async listRepos(params?: ListReposParams) {
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

    /**
     * Get a specific repository.
     * @param params - Repository owner and name
     * @returns Repository object
     */
    async getRepo(params: GetRepoParams) {
      const validated = parse(GetRepoParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo } = validated.data
      return unwrap(await http(`/repos/${owner}/${repo}`), {
        schema: RepositorySchema,
      })
    },

    /**
     * Create a new issue in a repository.
     * @param params - Issue details including title, body, and assignees
     * @returns Created issue object
     */
    async createIssue(params: CreateIssueParams) {
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

    /**
     * Create a comment on an issue or pull request.
     * @param params - Comment content and target issue/PR
     * @returns Created comment object
     */
    async createComment(params: CreateCommentParams) {
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
  handle: ProviderWebhooks<WebhookEvent>['handle'],
) {
  return {
    handle,

    /**
     * Create a repository webhook.
     * @param params - Webhook configuration including URL, events, and settings
     * @returns Created webhook object
     */
    async create(params: CreateWebhookParams) {
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

    /**
     * List repository webhooks.
     * @param params - Repository owner and name
     * @returns Array of webhook objects
     */
    async list(params: ListWebhooksParams) {
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

    /**
     * Get a specific webhook.
     * @param params - Repository details and webhook ID
     * @returns Webhook object
     */
    async get(params: GetWebhookParams) {
      const validated = parse(GetWebhookParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, hook_id } = validated.data
      return unwrap(await http(`/repos/${owner}/${repo}/hooks/${hook_id}`), {
        schema: WebhookSchema,
      })
    },

    /**
     * Update a webhook.
     * @param params - Webhook ID and updated configuration
     * @returns Updated webhook object
     */
    async update(params: UpdateWebhookParams) {
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

    /**
     * Delete a webhook.
     * @param params - Repository details and webhook ID
     */
    async delete(params: DeleteWebhookParams) {
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

    /**
     * Ping a webhook to test connectivity.
     * @param params - Repository details and webhook ID
     */
    async ping(params: PingWebhookParams) {
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

    /**
     * Test a webhook by triggering a test event.
     * @param params - Repository details and webhook ID
     */
    async test(params: TestWebhookParams) {
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
