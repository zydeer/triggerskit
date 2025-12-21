import { createEmitter, TriggersError } from '@triggerskit/core'
import { createActions } from './actions'
import { createSlackClient } from './client'
import type { SlackEvents } from './events'
import { createSlackOAuth } from './oauth'
import type {
  SlackConfig,
  SlackConfigWithOAuth,
  SlackConfigWithToken,
  SlackProviderWithOAuth,
  SlackProviderWithToken,
} from './types'
import { createWebhookHandler, detectSlack } from './webhook'

export function slack(config: SlackConfigWithOAuth): SlackProviderWithOAuth

export function slack(config: SlackConfigWithToken): SlackProviderWithToken

/**
 * Create a Slack provider.
 */
export function slack(
  config: SlackConfig,
): SlackProviderWithOAuth | SlackProviderWithToken {
  if (!('oauth' in config) && !('token' in config)) {
    throw new TriggersError(
      'Slack requires either oauth config with storage, or a token',
    )
  }

  if ('oauth' in config && config.oauth && !config.storage) {
    throw new TriggersError('OAuth config requires storage')
  }

  const emitter = createEmitter<SlackEvents>()
  const handleWebhook = createWebhookHandler(emitter, config.signingSecret)

  if ('oauth' in config && config.oauth && config.storage) {
    const oauth = createSlackOAuth({
      config: config.oauth,
      storage: config.storage,
      tokenKey: config.tokenKey,
    })

    const http = createSlackClient({ config, oauth })

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

  // token flow
  const http = createSlackClient({ config })

  return {
    name: 'slack',
    actions: createActions(http),
    webhooks: { handle: handleWebhook },
    on: emitter.on,
    http,
    detect: detectSlack,
  }
}
