import {
  createOAuth,
  type OAuth,
  type OAuthFlow,
  type OAuthTokens,
} from '@triggerskit/core/oauth'
import type { Storage } from '@triggerskit/core/storage'
import type { SlackOAuthConfig } from './types'

export interface SlackTokens extends OAuthTokens {
  team?: { id: string; name: string }
  enterprise?: { id: string; name: string }
  authedUser?: {
    id: string
    scope?: string
    accessToken?: string
    tokenType?: string
  }
  botUserId?: string
  appId?: string
}

export function slackOAuthFlow(
  config: SlackOAuthConfig,
): OAuthFlow<SlackTokens> {
  const { clientId, clientSecret, redirectUri, scopes, userScopes } = config

  return {
    getAuthorizationUrl(state, requestScopes) {
      const url = new URL('https://slack.com/oauth/v2/authorize')
      url.searchParams.set('client_id', clientId)
      url.searchParams.set('redirect_uri', redirectUri)
      url.searchParams.set('state', state)

      const finalScopes = requestScopes ?? scopes
      if (finalScopes?.length) {
        url.searchParams.set('scope', finalScopes.join(','))
      }

      if (userScopes?.length) {
        url.searchParams.set('user_scope', userScopes.join(','))
      }

      return url.toString()
    },

    async exchangeCode(code) {
      const response = await fetch('https://slack.com/api/oauth.v2.access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code,
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        throw {
          message: `Slack OAuth error: ${data.error || 'Unknown error'}`,
          details: data,
        }
      }
      const expiresIn =
        typeof data.expires_in === 'number' ? data.expires_in : undefined

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn,
        expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
        tokenType: data.token_type,
        scope: data.scope,
        team: data.team,
        enterprise: data.enterprise,
        authedUser: data.authed_user
          ? {
              id: data.authed_user.id,
              scope: data.authed_user.scope,
              accessToken: data.authed_user.access_token,
              tokenType: data.authed_user.token_type,
            }
          : undefined,
        botUserId: data.bot_user_id,
        appId: data.app_id,
      }
    },
  }
}

export interface SlackOAuth extends OAuth<SlackTokens> {
  /** Get the bot access token. */
  getBotToken(): Promise<string | null>

  /** Get the user access token (if user scopes were requested). */
  getUserToken(): Promise<string | null>
}

export function createSlackOAuth(
  config: SlackOAuthConfig,
  storage: Storage,
  userId: string,
): SlackOAuth {
  const oauth = createOAuth<SlackTokens>({
    flow: slackOAuthFlow(config),
    storage,
    namespace: 'slack',
    tokenKey: userId,
  })

  return {
    ...oauth,

    async getBotToken() {
      return oauth.getAccessToken()
    },

    async getUserToken() {
      const tokens = await oauth.getTokens()
      return tokens?.authedUser?.accessToken ?? null
    },
  }
}
