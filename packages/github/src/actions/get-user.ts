import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { GitHubContext } from '..'
import { type User, UserSchema } from '../schemas'

export type GetUserData = User

/**
 * Get the authenticated user
 */
export function getUser(ctx: GitHubContext) {
  return async (): Promise<Result<GetUserData>> => {
    try {
      const response = await ctx.request<unknown>('/user')
      return safeParse(UserSchema, response)
    } catch (e) {
      return fail(e)
    }
  }
}
