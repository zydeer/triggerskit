import type { ActionContext } from '@triggerskit/core'

export type TelegramConfig = {
  token: string
  baseUrl?: string
}

export type TelegramContext = ActionContext
