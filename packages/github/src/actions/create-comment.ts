import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import {
  type Comment,
  CommentSchema,
  type CreateCommentParams,
  CreateCommentParamsSchema,
} from '../schemas'

export type CreateCommentData = Comment

/** Create a comment on an issue */
export function createComment(ctx: ActionContext) {
  return async (
    params: CreateCommentParams,
  ): Promise<Result<CreateCommentData>> => {
    try {
      const validated = safeParse(CreateCommentParamsSchema, params)
      if (validated.error) return validated

      const { owner, repo, issue_number, body } = validated.data
      return safeParse(
        CommentSchema,
        await ctx.request(
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
  }
}
