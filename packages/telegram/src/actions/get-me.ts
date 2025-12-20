import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import { type GetMeData, GetMeDataSchema } from '../schemas'

type ApiResponse = { ok: boolean; result: unknown }

/** Get information about the bot */
export function getMe(ctx: ActionContext) {
  return async (): Promise<Result<GetMeData>> => {
    try {
      const response = await ctx.request<ApiResponse>('/getMe')
      return safeParse(GetMeDataSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { GetMeData }
