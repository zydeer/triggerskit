import type {
  SendMessageParams,
  SendMessageResult,
  TelegramContext,
} from '../types'

type SendMessageResponse = {
  ok: boolean
  result?: { message_id: number }
}

export function sendMessage(ctx: TelegramContext) {
  return async (params: SendMessageParams): Promise<SendMessageResult> => {
    const data = await ctx.request<SendMessageResponse>('/sendMessage', {
      method: 'POST',
      body: JSON.stringify(params),
    })

    return {
      ok: data.ok ?? false,
      message_id: data.result?.message_id ?? 0,
    }
  }
}
