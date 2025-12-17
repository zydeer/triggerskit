import type { RequestFn } from '@triggerskit/core'
import { getMe } from './actions/get-me'
import { sendMessage } from './actions/send-message'
import type { TelegramConfig, TelegramInstance } from './types'

function createRequest(config: TelegramConfig): RequestFn {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const method = path.startsWith('/') ? path.slice(1) : path

    const response = await fetch(`${baseUrl}/bot${config.token}/${method}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })

    return response.json()
  }
}

export function telegram(config: TelegramConfig): TelegramInstance {
  const request = createRequest(config)
  const ctx = { request }

  return {
    provider: 'telegram',
    actions: {
      sendMessage: sendMessage(ctx),
      getMe: getMe(ctx),
    },
    request,
  }
}

export type * from './types'
