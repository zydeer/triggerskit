import { createEmitter, TriggersError } from '@triggerskit/core'
import { createActions } from './actions'
import { createSlackClient } from './client'
import type { SlackEvents } from './events'
import { createSlackOAuth } from './oauth'
import type { SlackConfig, SlackProvider } from './types'
import { createWebhookHandler, detectSlack } from './webhook'

/**
 * Create a Slack provider.
 *
 * @example
 * ```ts
 * const slack = slackProvider({
 *   oauth: {
 *     clientId: 'xxx',
 *     clientSecret: 'xxx',
 *     redirectUri: 'https://app.com/callback',
 *     scopes: ['chat:write', 'channels:read'],
 *   },
 *   storage: memoryStorage(),
 *   signingSecret: 'xxx',
 * })
 *
 * // OAuth flow
 * const { url } = await slack.oauth.getAuthUrl()
 * await slack.oauth.handleCallback(code, state)
 *
 * // Send a message
 * await slack.actions.postMessage({ channel: 'C123', text: 'Hello!' })
 *
 * // Listen for events
 * slack.on('message', (event) => console.log(event.text))
 * ```
 */
export function slack(config: SlackConfig): SlackProvider {
  if (!config.oauth && !config.token) {
    throw new TriggersError(
      'Slack requires either oauth config with storage, or a token',
    )
  }

  if (config.oauth && !config.storage) {
    throw new TriggersError('OAuth config requires storage')
  }

  const oauth =
    config.oauth && config.storage
      ? createSlackOAuth({
          config: config.oauth,
          storage: config.storage,
          tokenKey: config.tokenKey,
        })
      : undefined

  if (!oauth) {
    throw new TriggersError('Slack provider requires OAuth configuration')
  }

  const http = createSlackClient({ config, oauth })
  const emitter = createEmitter<SlackEvents>()
  const handleWebhook = createWebhookHandler(emitter, config.signingSecret)

  return {
    name: 'slack',
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectSlack,
    oauth,
  }
}

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
