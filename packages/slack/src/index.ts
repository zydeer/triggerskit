import { createEmitter, createOAuthClient, error } from '@triggerskit/core'
import { createActions } from './actions'
import { createSlackClient } from './client'
import type { SlackEvents } from './events'
import { createSlackOAuth, transformSlackTokenResponse } from './oauth'
import type { SlackConfig, SlackProvider } from './types'
import { createWebhookHandler, detectSlack } from './webhook'

const SLACK_AUTH_URL = 'https://slack.com/oauth/v2/authorize'
const SLACK_TOKEN_URL = 'https://slack.com/api/oauth.v2.access'

/**
 * Create a Slack provider instance.
 *
 * @example
 * ```ts
 * // With OAuth
 * const slack = slackProvider({
 *   oauth: {
 *     clientId: 'your-client-id',
 *     clientSecret: 'your-client-secret',
 *     redirectUri: 'https://your-app.com/oauth/callback',
 *     scopes: ['chat:write', 'channels:read']
 *   },
 *   storage: memoryStorage(),
 *   signingSecret: 'your-signing-secret'
 * })
 *
 * // Get auth URL
 * const { url } = await slack.oauth.getAuthUrl()
 *
 * // Handle callback
 * await slack.oauth.handleCallback(code, state)
 *
 * // Use actions
 * await slack.actions.postMessage({
 *   channel: 'C123456',
 *   text: 'Hello, World!'
 * })
 * ```
 */
export function slack(config: SlackConfig): SlackProvider {
  const tokenKey = config.tokenKey ?? 'default'

  // Require OAuth config and storage together
  if (!config.oauth && !config.token) {
    throw error(
      'Slack provider requires either oauth config with storage or a token',
      undefined,
      'INVALID_CONFIG',
    )
  }

  if (config.oauth && !config.storage) {
    throw error(
      'OAuth config provided but storage is missing. Both oauth and storage are required for OAuth flow.',
      undefined,
      'MISSING_STORAGE',
    )
  }

  const oauthClient =
    config.oauth && config.storage
      ? createOAuthClient(
          {
            clientId: config.oauth.clientId,
            clientSecret: config.oauth.clientSecret,
            redirectUri: config.oauth.redirectUri,
            scopes: config.oauth.scopes,
            authorizationUrl: SLACK_AUTH_URL,
            tokenUrl: SLACK_TOKEN_URL,
            authMethod: 'body',
            scopeSeparator: ',',
            additionalAuthParams: config.oauth.userScopes
              ? { user_scope: config.oauth.userScopes.join(',') }
              : undefined,
            tokenResponseTransform: transformSlackTokenResponse,
          },
          config.storage,
          'slack',
        )
      : undefined

  const http = createSlackClient({ config, tokenKey, oauthClient })
  const emitter = createEmitter<SlackEvents>()
  const handleWebhook = createWebhookHandler(emitter, config.signingSecret)

  const slackOAuth = oauthClient
    ? createSlackOAuth(oauthClient, tokenKey)
    : undefined

  if (!slackOAuth) {
    throw error(
      'OAuth is required for Slack provider',
      undefined,
      'OAUTH_REQUIRED',
    )
  }

  return {
    name: 'slack',
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectSlack,
    oauth: slackOAuth,
  }
}

export type { SlackEvents } from './events'
export type {
  AppMentionEvent,
  MemberJoinedChannelEvent,
  Message,
  MessageEvent,
  ReactionAddedEvent,
  ReactionRemovedEvent,
  SlackEvent,
  User,
} from './schemas'
export type {
  AuthTestResponse,
  Channel,
  ConversationsListResponse,
  ListConversationsParams,
  PostMessageParams,
  SlackActions,
  SlackConfig,
  SlackErrorDetails,
  SlackOAuth,
  SlackProvider,
} from './types'
