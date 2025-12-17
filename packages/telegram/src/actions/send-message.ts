import type { TelegramContext } from '../types'

export type SendMessageParams = {
  chatId: number | string
  text: string
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML'
}

export type SendMessageResult = {
  ok: boolean
  messageId: number
}

type Response = {
  ok: boolean
  result?: { message_id: number }
}

export function sendMessage(ctx: TelegramContext) {
  return async (params: SendMessageParams): Promise<SendMessageResult> => {
    const data = await ctx.request<Response>('/sendMessage', {
      method: 'POST',
      body: JSON.stringify({
        chat_id: params.chatId,
        text: params.text,
        parse_mode: params.parseMode,
      }),
    })

    return {
      ok: data.ok ?? false,
      messageId: data.result?.message_id ?? 0,
    }
  }
}
