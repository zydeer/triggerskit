import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { GitHubContext } from '..'
import {
  type GetRepoParams,
  GetRepoParamsSchema,
  type Repository,
  RepositorySchema,
} from '../schemas'

export type GetRepoData = Repository

/**
 * Get a repository by owner and repo name
 */
export function getRepo(ctx: GitHubContext) {
  return async (params: GetRepoParams): Promise<Result<GetRepoData>> => {
    try {
      const paramsResult = safeParse(GetRepoParamsSchema, params)
      if (paramsResult.error) return paramsResult

      const { owner, repo } = paramsResult.data
      const response = await ctx.request<unknown>(`/repos/${owner}/${repo}`)
      return safeParse(RepositorySchema, response)
    } catch (e) {
      return fail(e)
    }
  }
}
