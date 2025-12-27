import type { HttpClient } from '@triggerskit/core/http'
import { parse, type Result, unwrap } from '@triggerskit/core/result'
import { z } from 'zod'
import {
  type Comment,
  CommentSchema,
  type CreateCommentParams,
  CreateCommentParamsSchema,
  type CreateIssueParams,
  CreateIssueParamsSchema,
  type GetRepoParams,
  GetRepoParamsSchema,
  type Issue,
  IssueSchema,
  type ListReposParams,
  ListReposParamsSchema,
  type Repository,
  RepositorySchema,
  type User,
  UserSchema,
} from './schemas'
import type { GitHubActions } from './types'

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
