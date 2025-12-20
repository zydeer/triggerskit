import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { GitHubContext } from '..'
import {
  type CreateIssueParams,
  CreateIssueParamsSchema,
  type Issue,
  IssueSchema,
} from '../schemas'

export type CreateIssueData = Issue

/**
 * Create an issue in a repository
 */
export function createIssue(ctx: GitHubContext) {
  return async (
    params: CreateIssueParams,
  ): Promise<Result<CreateIssueData>> => {
    try {
      const paramsResult = safeParse(CreateIssueParamsSchema, params)
      if (paramsResult.error) return paramsResult

      const { owner, repo, ...body } = paramsResult.data
      const response = await ctx.request<unknown>(
        `/repos/${owner}/${repo}/issues`,
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
      )

      return safeParse(IssueSchema, response)
    } catch (e) {
      return fail(e)
    }
  }
}
