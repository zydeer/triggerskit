import type { ActionContext } from '@triggerskit/core/types'

export type TelegramErrorDetails = { errorCode: number }

export type TelegramConfig = {
  token: string
  baseUrl?: string
  timeout?: number
}

export type TelegramContext = ActionContext
