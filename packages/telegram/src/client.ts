import { fail, type HttpClient, ok, type Result } from '@triggerskit/core'
import type { TelegramConfig, TelegramErrorDetails } from './types'

interface TelegramResponse<T = unknown> {
  ok: boolean
  result?: T
  description?: string
  error_code?: number
}

export function createTelegramClient(config: TelegramConfig): HttpClient {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'
  const timeout = config.timeout ?? 30000

  return async <T = unknown>(
    path: string,
    init?: RequestInit,
  ): Promise<Result<T>> => {
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
        return fail({
          message: message ? capitalize(message) : 'Telegram API error',
          details: { errorCode: data.error_code } as TelegramErrorDetails,
        })
      }

      return ok(data.result as T)
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        return fail({ message: 'Request timed out' })
      }
      return fail({ message: 'Network request failed', details: e })
    } finally {
      clearTimeout(timeoutId)
    }
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
