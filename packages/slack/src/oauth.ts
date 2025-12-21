import {
  createProviderOAuth,
  error,
  type OAuthClient,
  type OAuthTokens,
} from '@triggerskit/core'
import type { SlackOAuth } from './types'

interface SlackOAuthTokens extends OAuthTokens {
  team?: { id: string; name: string }
  enterprise?: { id: string; name: string }
  authed_user?: {
    id: string
    scope?: string
    access_token?: string
    token_type?: string
  }
  bot_user_id?: string
  app_id?: string
}

export function createSlackOAuth(
  client: OAuthClient,
  tokenKey: string,
): SlackOAuth {
  const baseOAuth = createProviderOAuth(client, tokenKey)

  return {
    ...baseOAuth,

    async getBotToken(): Promise<string | null> {
      const tokens = (await client.getTokens(
        tokenKey,
      )) as SlackOAuthTokens | null
      if (!tokens) return null

      return tokens.accessToken
    },

    async getUserToken(): Promise<string | null> {
      const tokens = (await client.getTokens(
        tokenKey,
      )) as SlackOAuthTokens | null

      if (!tokens?.authed_user?.access_token) return null

      return tokens.authed_user.access_token
    },
  }
}

/**
 * Transform Slack OAuth response to standard format
 * Slack returns bot token as access_token at root level
 */
export function transformSlackTokenResponse(
  data: Record<string, unknown>,
): Record<string, unknown> {
  if (!data.ok) {
    throw error(
      `Slack OAuth error: ${data.error || 'Unknown error'}`,
      data,
      'SLACK_OAUTH_ERROR',
    )
  }

  // Slack's response structure is different - normalize it
  return {
    access_token: data.access_token, // This is the bot token
    token_type: data.token_type || 'bot',
    scope: data.scope,
    // Preserve Slack-specific fields
    team: data.team,
    enterprise: data.enterprise,
    authed_user: data.authed_user,
    bot_user_id: data.bot_user_id,
    app_id: data.app_id,
  }
}
