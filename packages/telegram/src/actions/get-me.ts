import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext } from '..'
import { type ApiUser, fromApi } from '../api'
import type { User } from '../types'

/**
 * Response data returned from the getMe method.
 *
 * @see https://core.telegram.org/bots/api#getme
 * @see https://core.telegram.org/bots/api#user
 */
export type GetMeData = User

type TelegramApiResponse = {
  ok: boolean
  result: ApiUser
}

export function getMe(ctx: TelegramContext) {
  return async (): Promise<Result<GetMeData>> => {
    try {
      const response = await ctx.request<TelegramApiResponse>('/getMe', {
        method: 'GET',
      })

      return ok(fromApi.user(response.result))
    } catch (e) {
      return fail(e)
    }
  }
}
