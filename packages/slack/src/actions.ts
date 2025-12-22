import type { HttpClient } from '@triggerskit/core/http'
import { parse } from '@triggerskit/core/result'
import {
  AuthTestDataSchema,
  ConversationsListSchema,
  GetUserInfoParamsSchema,
  ListConversationsParamsSchema,
  MessageSchema,
  PostMessageParamsSchema,
  UserSchema,
} from './schemas'
import type { SlackActions } from './types'

export function createActions(http: HttpClient): SlackActions {
  return {
    async authTest() {
      const result = await http('/auth.test')
      if (!result.ok) return result
      return parse(AuthTestDataSchema, result.data)
    },

    async postMessage(params) {
      const validated = parse(PostMessageParamsSchema, params)
      if (!validated.ok) return validated

      const result = await http('/chat.postMessage', {
        method: 'POST',
        body: JSON.stringify(validated.data),
      })
      if (!result.ok) return result

      const response = result.data as {
        channel?: string
        ts?: string
        message?: unknown
      }

      // The response includes channel, ts, and message fields
      // Return the message object which contains the full message data
      return parse(MessageSchema, response.message || response)
    },

    async getUserInfo(params) {
      const validated = parse(GetUserInfoParamsSchema, params)
      if (!validated.ok) return validated

      const queryParams = new URLSearchParams({
        user: validated.data.user,
      })
      if (validated.data.include_locale !== undefined) {
        queryParams.append(
          'include_locale',
          String(validated.data.include_locale),
        )
      }

      const result = await http(`/users.info?${queryParams.toString()}`)
      if (!result.ok) return result

      const response = result.data as { user?: unknown }

      return parse(UserSchema, response.user)
    },

    async listConversations(params) {
      if (params) {
        const validated = parse(ListConversationsParamsSchema, params)
        if (!validated.ok) return validated
      }

      const queryParams = params
        ? `?${new URLSearchParams(
            Object.entries(params).reduce(
              (acc, [key, value]) => {
                if (value !== undefined) {
                  acc[key] = String(value)
                }
                return acc
              },
              {} as Record<string, string>,
            ),
          )}`
        : ''

      const result = await http(`/conversations.list${queryParams}`)

      if (!result.ok) return result

      return parse(ConversationsListSchema, result.data)
    },
  }
}
