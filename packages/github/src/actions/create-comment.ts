import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { GitHubContext } from '..'
import {
  type Comment,
  CommentSchema,
  type CreateCommentParams,
  CreateCommentParamsSchema,
} from '../schemas'

export type CreateCommentData = Comment

/**
 * Create a comment on an issue
 */
export function createComment(ctx: GitHubContext) {
  return async (
    params: CreateCommentParams,
  ): Promise<Result<CreateCommentData>> => {
    try {
      const paramsResult = safeParse(CreateCommentParamsSchema, params)
      if (paramsResult.error) return paramsResult

      const { owner, repo, issue_number, body } = paramsResult.data
      const response = await ctx.request<unknown>(
        `/repos/${owner}/${repo}/issues/${issue_number}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ body }),
        },
      )

      return safeParse(CommentSchema, response)
    } catch (e) {
      return fail(e)
    }
  }
}
