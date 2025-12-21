import { createHttpClient, type HttpClient } from '@triggerskit/core'
import type { SlackOAuth } from './oauth'
import type { SlackConfig } from './types'

export interface SlackClientOptions {
  config: SlackConfig
  oauth?: SlackOAuth
}

export function createSlackClient(options: SlackClientOptions): HttpClient {
  const { config, oauth } = options

  return createHttpClient({
    baseUrl: config.baseUrl ?? 'https://slack.com/api',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    getToken: async () => {
      if (config.token) return config.token
      if (oauth) return oauth.getBotToken()
      return null
    },
    transformError: (data) => {
      const slackError = data as { ok: boolean; error?: string }
      return {
        message: slackError.error || 'Slack API error',
        details: { error: slackError.error },
      }
    },
  })
}
