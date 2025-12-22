import { createEmitter } from '@triggerskit/core/events'
import { TriggersError } from '@triggerskit/core/result'
import { createActions } from './actions'
import { createSlackClient } from './client'
import type { SlackEvents } from './events'
import { createSlackOAuth } from './oauth'
import type {
  SlackConfigWithOAuth,
  SlackConfigWithToken,
  SlackProviderWithOAuth,
  SlackProviderWithToken,
} from './types'
import { createWebhookHandler, detectSlack } from './webhook'

export function slack(config: SlackConfigWithOAuth): SlackProviderWithOAuth

export function slack(config: SlackConfigWithToken): SlackProviderWithToken

export function slack(
  config: SlackConfigWithOAuth | SlackConfigWithToken,
): SlackProviderWithOAuth | SlackProviderWithToken {
  const emitter = createEmitter<SlackEvents>()

  const handleWebhook = createWebhookHandler(emitter, config.signingSecret)

  if ('oauth' in config && config.oauth) {
    const { oauth: oauthConfig, storage } = config

    if (!storage) {
      throw new TriggersError('Slack oauth requires storage')
    }

    return {
      name: 'slack',
      webhooks: { handle: handleWebhook },
      on: emitter.on,
      detect: detectSlack,
      forUser: (userId: string) => {
        const oauth = createSlackOAuth(oauthConfig, storage, userId)
        const userHttp = createSlackClient({ config, oauth })
        return { oauth, actions: createActions(userHttp), http: userHttp }
      },
    }
  }

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

export type {
  AppMentionEvent,
  AuthTestData,
  Channel,
  ConversationsList,
  GetUserInfoParams,
  ListConversationsParams,
  MemberJoinedChannelEvent,
  Message,
  MessageEvent,
  PostMessageParams,
  ReactionAddedEvent,
  ReactionRemovedEvent,
  SlackEvent,
  UrlVerification,
  User,
  WebhookPayload,
} from './schemas'

export default slack
