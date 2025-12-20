import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import { z } from 'zod'
import {
  type ListReposParams,
  ListReposParamsSchema,
  type Repository,
  RepositorySchema,
} from '../schemas'

export type ListReposData = Repository[]

/** List repositories for the authenticated user */
export function listRepos(ctx: ActionContext) {
  return async (params?: ListReposParams): Promise<Result<ListReposData>> => {
    try {
      if (params) {
        const validated = safeParse(ListReposParamsSchema, params)
        if (validated.error) return validated
      }

      const query = params
        ? `?${new URLSearchParams(
            Object.entries(params)
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => [k, String(v)]),
          )}`
        : ''

      return safeParse(
        z.array(RepositorySchema),
        await ctx.request(`/user/repos${query}`),
      )
    } catch (e) {
      return fail(e)
    }
  }
}
