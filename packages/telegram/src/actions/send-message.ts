import type { Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import type { TelegramContext } from '..'
import {
  type SendMessageData,
  SendMessageDataSchema,
  type SendMessageParams,
  SendMessageParamsSchema,
} from '../schemas'

type TelegramApiResponse = {
  ok: boolean
  result: unknown
}

export function sendMessage(ctx: TelegramContext) {
  return async (
    params: SendMessageParams,
  ): Promise<Result<SendMessageData>> => {
    try {
      const paramsResult = safeParse(SendMessageParamsSchema, params)

      if (paramsResult.error) {
        return paramsResult
      }

      const response = await ctx.request<TelegramApiResponse>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify(paramsResult.data),
      })

      return safeParse(SendMessageDataSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { SendMessageData, SendMessageParams }
