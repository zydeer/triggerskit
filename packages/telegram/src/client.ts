import { createHttpClient, type HttpClient } from '@triggerskit/core'
import type { TelegramConfig } from './types'

export function createTelegramClient(config: TelegramConfig): HttpClient {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'

  return createHttpClient({
    baseUrl: `${baseUrl}/bot${config.token}`,
    transformError: (data) => {
      const telegramError = data as {
        ok: boolean
        description?: string
        error_code?: number
      }

      const message = telegramError.description
        ?.replace('Bad Request:', '')
        .trim()

      return {
        message: message
          ? message.charAt(0).toUpperCase() + message.slice(1)
          : 'Telegram API error',
        details: data,
      }
    },
  })
}
