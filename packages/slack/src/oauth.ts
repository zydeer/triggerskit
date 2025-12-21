import {
  createOAuth,
  normalizeTokens,
  type OAuth,
  type OAuthFlow,
  type OAuthTokens,
  type Storage,
} from '@triggerskit/core'

export interface SlackOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
  userScopes?: string[]
}

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

export function slackOAuthFlow(config: SlackOAuthConfig): OAuthFlow {
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

      return normalizeSlackTokens(data)
    },
  }
}

function normalizeSlackTokens(data: any): SlackTokens {
  const base = normalizeTokens(data)

  return {
    ...base,
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
}

/**
 * Extended Slack OAuth with bot and user token access.
 */
export interface SlackOAuth extends OAuth {
  /** Get the bot access token. */
  getBotToken(): Promise<string | null>

  /** Get the user access token (if user scopes were requested). */
  getUserToken(): Promise<string | null>

  /** Get all Slack tokens including team and user info. */
  getSlackTokens(): Promise<SlackTokens | null>
}

export interface CreateSlackOAuthOptions {
  config: SlackOAuthConfig
  storage: Storage
  tokenKey?: string
}

/**
 * Create a Slack OAuth handler.
 *
 * @example
 * ```ts
 * const oauth = createSlackOAuth({
 *   config: {
 *     clientId: 'xxx',
 *     clientSecret: 'xxx',
 *     redirectUri: 'https://app.com/callback',
 *     scopes: ['chat:write'],
 *   },
 *   storage: memoryStorage(),
 * })
 *
 * const { url } = await oauth.getAuthUrl()
 * await oauth.handleCallback(code, state)
 * const token = await oauth.getBotToken()
 * ```
 */
export function createSlackOAuth(options: CreateSlackOAuthOptions): SlackOAuth {
  const { config, storage, tokenKey = 'default' } = options

  const oauth = createOAuth({
    flow: slackOAuthFlow(config),
    storage,
    namespace: 'slack',
    tokenKey,
  })

  return {
    ...oauth,

    async getBotToken() {
      return oauth.getAccessToken()
    },

    async getUserToken() {
      const tokens = (await oauth.getTokens()) as SlackTokens | null
      return tokens?.authedUser?.accessToken ?? null
    },

    async getSlackTokens() {
      return (await oauth.getTokens()) as SlackTokens | null
    },
  }
}
