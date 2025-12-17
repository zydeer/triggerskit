import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext } from '../types'

export type GetMeData = {
  id: number
  isBot: boolean
  firstName: string
  username?: string
}

type Response = {
  ok: boolean
  result?: {
    id: number
    is_bot: boolean
    first_name: string
    username?: string
  }
}

export function getMe(ctx: TelegramContext) {
  return async (): Promise<Result<GetMeData>> => {
    try {
      const data = await ctx.request<Response>('/getMe')

      return ok({
        id: data.result?.id ?? 0,
        isBot: data.result?.is_bot ?? false,
        firstName: data.result?.first_name ?? '',
        username: data.result?.username,
      })
    } catch (e) {
      return fail(e)
    }
  }
}
