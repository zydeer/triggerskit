import type { BaseOAuthConfig } from '@triggerskit/core/oauth'

export interface SlackOAuthConfig {
  /** Slack OAuth app client ID */
  clientId: string
  /** Slack OAuth app client secret */
  clientSecret: string
  /** OAuth callback redirect URI */
  redirectUri: string
  /** Bot scopes to request (e.g., ['chat:write', 'users:read']) */
  scopes?: string[]
  /** User scopes to request (optional) */
  userScopes?: string[]
}

export interface SlackConfigWithOAuth extends BaseOAuthConfig {
  /** OAuth configuration */
  oauth: SlackOAuthConfig
  token?: never
  /** Custom base URL (default: 'https://slack.com/api') */
  baseUrl?: string
  /** Signing secret for webhook verification */
  signingSecret?: string
}

export interface SlackConfigWithToken {
  /** Slack bot token (xoxb-...) or user token (xoxp-...) */
  token: string
  oauth?: never
  /** Custom base URL (default: 'https://slack.com/api') */
  baseUrl?: string
  /** Signing secret for webhook verification */
  signingSecret?: string
}

export type SlackConfig = SlackConfigWithOAuth | SlackConfigWithToken
