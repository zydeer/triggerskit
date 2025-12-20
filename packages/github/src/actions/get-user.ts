import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import { type User, UserSchema } from '../schemas'

export type GetUserData = User

/** Get the authenticated user */
export function getUser(ctx: ActionContext) {
  return async (): Promise<Result<GetUserData>> => {
    try {
      return safeParse(UserSchema, await ctx.request('/user'))
    } catch (e) {
      return fail(e)
    }
  }
}
