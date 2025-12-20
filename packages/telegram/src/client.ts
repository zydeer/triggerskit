import { error, type HttpClient, HttpError } from '@triggerskit/core'
import type { TelegramConfig, TelegramErrorDetails } from './types'

/** Telegram API response wrapper */
interface TelegramResponse<T = unknown> {
  ok: boolean
  result?: T
  description?: string
  error_code?: number
}

/** Create a configured HTTP client for Telegram Bot API */
export function createTelegramClient(config: TelegramConfig): HttpClient {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'
  const timeout = config.timeout ?? 30000

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const method = path.startsWith('/') ? path.slice(1) : path
    const url = `${baseUrl}/bot${config.token}/${method}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
        signal: controller.signal,
      })

      const data: TelegramResponse<T> = await response.json()

      if (!data.ok) {
        const message = data.description?.replace('Bad Request:', '').trim()
        throw new HttpError(
          error<TelegramErrorDetails>(
            message ? capitalize(message) : 'Telegram API error',
            { errorCode: data.error_code },
            'TELEGRAM_ERROR',
          ),
        )
      }

      return data as T
    } catch (e) {
      if (e instanceof HttpError) throw e
      if (e instanceof Error && e.name === 'AbortError') {
        throw new HttpError(error('Request timed out', undefined, 'TIMEOUT'))
      }
      throw new HttpError(
        error('Network request failed', undefined, 'NETWORK_ERROR'),
      )
    } finally {
      clearTimeout(timeoutId)
    }
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
