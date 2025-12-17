import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext } from '../types'

/**
 * Bot information returned by the getMe action.
 */
export type GetMeData = {
  /**
   * Unique identifier for this bot.
   */
  id: number
  /**
   * True, if this user is a bot.
   */
  isBot: boolean
  /**
   * Bot's first name.
   */
  firstName: string
  /**
   * Bot's username, if available.
   */
  username?: string
}

type Response = {
  ok: boolean
  result: {
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
        id: data.result.id,
        isBot: data.result.is_bot,
        firstName: data.result.first_name,
        username: data.result.username,
      })
    } catch (e) {
      return fail(e)
    }
  }
}
