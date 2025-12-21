import {
  createHttpClient,
  error,
  type HttpClient,
  type OAuthClient,
} from '@triggerskit/core'
import type { SlackConfig } from './types'

export interface SlackClientOptions {
  config: SlackConfig
  tokenKey: string
  oauthClient?: OAuthClient
}

export function createSlackClient(options: SlackClientOptions): HttpClient {
  const { config, tokenKey, oauthClient } = options
  const baseUrl = config.baseUrl ?? 'https://slack.com/api'

  return createHttpClient({
    baseUrl,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    getToken: async () => {
      if (config.token) return config.token
      if (oauthClient) {
        const tokens = await oauthClient.getTokens(tokenKey)
        return tokens?.accessToken ?? null
      }
      return null
    },
    transformError: (data, status) => {
      const slackError = data as { ok: boolean; error?: string }
      return error(
        slackError.error || 'Slack API error',
        { error: slackError.error, status },
        'SLACK_API_ERROR',
      )
    },
  })
}
