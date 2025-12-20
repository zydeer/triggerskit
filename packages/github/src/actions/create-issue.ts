import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import {
  type CreateIssueParams,
  CreateIssueParamsSchema,
  type Issue,
  IssueSchema,
} from '../schemas'

export type CreateIssueData = Issue

/** Create an issue in a repository */
export function createIssue(ctx: ActionContext) {
  return async (
    params: CreateIssueParams,
  ): Promise<Result<CreateIssueData>> => {
    try {
      const validated = safeParse(CreateIssueParamsSchema, params)
      if (validated.error) return validated

      const { owner, repo, ...body } = validated.data
      return safeParse(
        IssueSchema,
        await ctx.request(`/repos/${owner}/${repo}/issues`, {
          method: 'POST',
          body: JSON.stringify(body),
        }),
      )
    } catch (e) {
      return fail(e)
    }
  }
}
