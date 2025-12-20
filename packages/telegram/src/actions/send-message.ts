import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, safeParse } from '@triggerskit/core/utils'
import {
  type SendMessageData,
  SendMessageDataSchema,
  type SendMessageParams,
  SendMessageParamsSchema,
} from '../schemas'

type ApiResponse = { ok: boolean; result: unknown }

/** Send a text message */
export function sendMessage(ctx: ActionContext) {
  return async (
    params: SendMessageParams,
  ): Promise<Result<SendMessageData>> => {
    try {
      const validated = safeParse(SendMessageParamsSchema, params)
      if (validated.error) return validated

      const response = await ctx.request<ApiResponse>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify(validated.data),
      })

      return safeParse(SendMessageDataSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { SendMessageData, SendMessageParams }
