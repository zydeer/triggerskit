import type { ActionContext } from '@triggerskit/core/types'

export type TelegramConfig = {
  token: string
  baseUrl?: string
}

export type TelegramContext = ActionContext
