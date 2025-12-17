import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext } from '../types'

/**
 * Parameters for sending a message via Telegram.
 */
export type SendMessageParams = {
  /**
   * Unique identifier for the target chat or username of the target channel
   * (in the format @channelusername).
   */
  chatId: number | string
  /**
   * Text of the message to be sent, 1-4096 characters after entities parsing.
   */
  text: string
  /**
   * Mode for parsing entities in the message text.
   * - 'Markdown': Legacy Markdown format
   * - 'MarkdownV2': New Markdown format with more features
   * - 'HTML': HTML format
   */
  parseMode?: 'Markdown' | 'MarkdownV2' | 'HTML'
}

/**
 * Response data returned after successfully sending a message.
 */
export type SendMessageData = {
  /**
   * Unique message identifier.
   */
  messageId: number
}

type Response = {
  ok: boolean
  result: { message_id: number }
}

export function sendMessage(ctx: TelegramContext) {
  return async (
    params: SendMessageParams,
  ): Promise<Result<SendMessageData>> => {
    try {
      const data = await ctx.request<Response>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify({
          chat_id: params.chatId,
          text: params.text,
          parse_mode: params.parseMode,
        }),
      })

      return ok({ messageId: data.result.message_id })
    } catch (e) {
      return fail(e)
    }
  }
}
