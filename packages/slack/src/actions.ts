import type { HttpClient } from '@triggerskit/core/http'
import { parse, unwrap } from '@triggerskit/core/result'
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
      return unwrap(await http('/auth.test'), { schema: AuthTestDataSchema })
    },

    async postMessage(params) {
      const validated = parse(PostMessageParamsSchema, params)
      if (!validated.ok) return validated

      return unwrap(
        await http('/chat.postMessage', {
          method: 'POST',
          body: JSON.stringify(validated.data),
        }),
        {
          extract: (data) => data.message || data,
          schema: MessageSchema,
        },
      )
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

      return unwrap(await http(`/users.info?${queryParams.toString()}`), {
        extract: (data) => data.user,
        schema: UserSchema,
      })
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

      return unwrap(await http(`/conversations.list${queryParams}`), {
        schema: ConversationsListSchema,
      })
    },
  }
}
