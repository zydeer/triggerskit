import { type RequestFn, TriggersError } from '@triggerskit/core/types'
import { capitalize, fetchWithTimeout } from '@triggerskit/core/utils'
import type { TelegramConfig, TelegramErrorDetails } from './types'

export function createRequest(config: TelegramConfig): RequestFn {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const method = path.startsWith('/') ? path.slice(1) : path
    const url = `${baseUrl}/bot${config.token}/${method}`

    try {
      const response = await fetchWithTimeout(url, {
        ...init,
        timeout: config.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      })

      const data = await response.json()

      if (!data.ok) {
        const description = data.description?.replace('Bad Request:', '').trim()

        throw new TriggersError<TelegramErrorDetails>(
          description ? capitalize(description) : 'Telegram API error',
          { errorCode: data.error_code },
        )
      }

      return data as T
    } catch (e) {
      if (e instanceof TriggersError) throw e

      if (e instanceof Error && e.name === 'AbortError') {
        throw new TriggersError('Request timed out')
      }

      throw new TriggersError('Network request failed')
    }
  }
}
