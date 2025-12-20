import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import { z } from 'zod'
import type { GitHubContext } from '..'
import {
  type ListReposParams,
  ListReposParamsSchema,
  type Repository,
  RepositorySchema,
} from '../schemas'

export type ListReposData = Repository[]

/**
 * List repositories for the authenticated user
 */
export function listRepos(ctx: GitHubContext) {
  return async (params?: ListReposParams): Promise<Result<ListReposData>> => {
    try {
      if (params) {
        const paramsResult = safeParse(ListReposParamsSchema, params)
        if (paramsResult.error) return paramsResult
      }

      const query = params
        ? `?${new URLSearchParams(
            Object.entries(params)
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => [k, String(v)]),
          ).toString()}`
        : ''

      const response = await ctx.request<unknown>(`/user/repos${query}`)
      return safeParse(z.array(RepositorySchema), response)
    } catch (e) {
      return fail(e)
    }
  }
}
