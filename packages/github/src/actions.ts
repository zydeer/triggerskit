import type { HttpClient } from '@triggerskit/core/http'
import { parse, type Result } from '@triggerskit/core/result'
import { z } from 'zod'
import {
  type CreateIssueCommentParams,
  CreateIssueCommentParamsSchema,
  type CreateIssueParams,
  CreateIssueParamsSchema,
  type GetRepoParams,
  GetRepoParamsSchema,
  type Issue,
  type IssueComment,
  IssueCommentSchema,
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
      const result = await http('/user')
      if (!result.ok) return result
      return parse(UserSchema, result.data)
    },

    async listRepos(params?: ListReposParams): Promise<Result<Repository[]>> {
      if (params) {
        const validated = parse(ListReposParamsSchema, params)
        if (!validated.ok) return validated
      }

      const queryParams = params
        ? `?${new URLSearchParams(params as Record<string, string>)}`
        : ''

      const result = await http(`/user/repos${queryParams}`)
      if (!result.ok) return result
      return parse(z.array(RepositorySchema), result.data)
    },

    async getRepo(params: GetRepoParams): Promise<Result<Repository>> {
      const validated = parse(GetRepoParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo } = validated.data
      const result = await http(`/repos/${owner}/${repo}`)
      if (!result.ok) return result
      return parse(RepositorySchema, result.data)
    },

    async createIssue(params: CreateIssueParams): Promise<Result<Issue>> {
      const validated = parse(CreateIssueParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, ...body } = validated.data
      const result = await http(`/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      if (!result.ok) return result
      return parse(IssueSchema, result.data)
    },

    async createIssueComment(
      params: CreateIssueCommentParams,
    ): Promise<Result<IssueComment>> {
      const validated = parse(CreateIssueCommentParamsSchema, params)
      if (!validated.ok) return validated

      const { owner, repo, issue_number, body } = validated.data
      const result = await http(
        `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ body }),
        },
      )
      if (!result.ok) return result
      return parse(IssueCommentSchema, result.data)
    },
  }
}
