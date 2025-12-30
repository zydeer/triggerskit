import type { HttpClient } from '@triggerskit/core/http'
import { parse, unwrap } from '@triggerskit/core/result'
import {
  AuthTestDataSchema,
  ConversationsListSchema,
  type GetUserInfoParams,
  GetUserInfoParamsSchema,
  type ListConversationsParams,
  ListConversationsParamsSchema,
  MessageSchema,
  type PostMessageParams,
  PostMessageParamsSchema,
  UserSchema,
} from './schemas'

export function createActions(http: HttpClient) {
  return {
    /**
     * Test authentication and get workspace/user information.
     * @returns Authentication test results including user and team info
     */
    async authTest() {
      return unwrap(await http('/auth.test'), { schema: AuthTestDataSchema })
    },

    /**
     * Post a message to a channel.
     * @param params - Message parameters including channel, text, and optional formatting
     * @returns Posted message object
     */
    async postMessage(params: PostMessageParams) {
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

    /**
     * Get information about a user.
     * @param params - User ID and optional locale settings
     * @returns User profile information
     */
    async getUserInfo(params: GetUserInfoParams) {
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

    /**
     * List conversations (channels) the bot has access to.
     * @param params - Optional filtering and pagination parameters
     * @returns List of conversations with pagination info
     */
    async listConversations(params?: ListConversationsParams) {
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
