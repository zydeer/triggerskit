import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import {
  type GetRepoParams,
  GetRepoParamsSchema,
  type Repository,
  RepositorySchema,
} from '../schemas'

export type GetRepoData = Repository

/** Get a repository by owner and repo name */
export function getRepo(ctx: ActionContext) {
  return async (params: GetRepoParams): Promise<Result<GetRepoData>> => {
    try {
      const validated = safeParse(GetRepoParamsSchema, params)
      if (validated.error) return validated

      const { owner, repo } = validated.data
      return safeParse(
        RepositorySchema,
        await ctx.request(`/repos/${owner}/${repo}`),
      )
    } catch (e) {
      return fail(e)
    }
  }
}
