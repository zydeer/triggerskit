import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { TelegramContext } from '..'
import { type GetMeData, GetMeDataSchema } from '../schemas'

type TelegramApiResponse = {
  ok: boolean
  result: unknown
}

export function getMe(ctx: TelegramContext) {
  return async (): Promise<Result<GetMeData>> => {
    try {
      const response = await ctx.request<TelegramApiResponse>('/getMe', {
        method: 'GET',
      })

      return safeParse(GetMeDataSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { GetMeData }
