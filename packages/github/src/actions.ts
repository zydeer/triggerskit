import { fail, type HttpClient, parse, type Result } from '@triggerskit/core'
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
      try {
        return parse(UserSchema, await http('/user'))
      } catch (e) {
        return fail(e)
      }
    },

    async listRepos(params?: ListReposParams): Promise<Result<Repository[]>> {
      try {
        if (params) {
          const validated = parse(ListReposParamsSchema, params)
          if (!validated.ok) return validated
        }

        const queryParams = params
          ? `?${new URLSearchParams(params as Record<string, string>)}`
          : ''
        return parse(
          z.array(RepositorySchema),
          await http(`/user/repos${queryParams}`),
        )
      } catch (e) {
        return fail(e)
      }
    },

    async getRepo(params: GetRepoParams): Promise<Result<Repository>> {
      try {
        const validated = parse(GetRepoParamsSchema, params)
        if (!validated.ok) return validated

        const { owner, repo } = validated.data
        return parse(RepositorySchema, await http(`/repos/${owner}/${repo}`))
      } catch (e) {
        return fail(e)
      }
    },

    async createIssue(params: CreateIssueParams): Promise<Result<Issue>> {
      try {
        const validated = parse(CreateIssueParamsSchema, params)
        if (!validated.ok) return validated

        const { owner, repo, ...body } = validated.data
        return parse(
          IssueSchema,
          await http(`/repos/${owner}/${repo}/issues`, {
            method: 'POST',
            body: JSON.stringify(body),
          }),
        )
      } catch (e) {
        return fail(e)
      }
    },

    async createComment(params: CreateCommentParams): Promise<Result<Comment>> {
      try {
        const validated = parse(CreateCommentParamsSchema, params)
        if (!validated.ok) return validated

        const { owner, repo, issue_number, body } = validated.data
        return parse(
          CommentSchema,
          await http(
            `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
            {
              method: 'POST',
              body: JSON.stringify({ body }),
            },
          ),
        )
      } catch (e) {
        return fail(e)
      }
    },
  }
}
