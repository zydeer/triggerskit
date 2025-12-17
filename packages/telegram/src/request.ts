import type { RequestFn } from '@triggerskit/core/types'
import type { TelegramConfig } from './types'

export function createRequest(config: TelegramConfig): RequestFn {
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
