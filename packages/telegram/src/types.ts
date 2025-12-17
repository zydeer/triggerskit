import type { ActionContext, ProviderInstance } from '@triggerskit/core'

export type TelegramConfig = {
  token: string
  baseUrl?: string
}

export type TelegramContext = ActionContext

export type SendMessageParams = {
  chat_id: number | string
  text: string
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'
}

export type SendMessageResult = {
  ok: boolean
  message_id: number
}

export type GetMeResult = {
  ok: boolean
  id: number
  is_bot: boolean
  first_name: string
  username?: string
}

export type TelegramActions = {
  sendMessage: (params: SendMessageParams) => Promise<SendMessageResult>
  getMe: () => Promise<GetMeResult>
}

export type TelegramInstance = ProviderInstance<'telegram', TelegramActions>
