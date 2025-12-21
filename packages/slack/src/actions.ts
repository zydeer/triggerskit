import { fail, type HttpClient, parse, type Result } from '@triggerskit/core'
import { z } from 'zod'
import {
  GetUserInfoParamsSchema,
  ListConversationsParamsSchema,
  MessageSchema,
  PostMessageParamsSchema,
  UserSchema,
} from './schemas'
import type {
  AuthTestResponse,
  ConversationsListResponse,
  ListConversationsParams,
  PostMessageParams,
  SlackActions,
} from './types'

const AuthTestResponseSchema = z.object({
  ok: z.boolean(),
  url: z.string(),
  team: z.string(),
  user: z.string(),
  team_id: z.string(),
  user_id: z.string(),
  bot_id: z.string().optional(),
  is_enterprise_install: z.boolean().optional(),
})

const ConversationsListResponseSchema = z.object({
  ok: z.boolean(),
  channels: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      is_channel: z.boolean(),
      is_group: z.boolean(),
      is_im: z.boolean(),
      is_mpim: z.boolean(),
      is_private: z.boolean(),
      created: z.number(),
      is_archived: z.boolean(),
      is_general: z.boolean(),
      unlinked: z.number(),
      name_normalized: z.string(),
      is_shared: z.boolean(),
      is_org_shared: z.boolean(),
      is_pending_ext_shared: z.boolean(),
      pending_shared: z.array(z.string()),
      context_team_id: z.string(),
      updated: z.number(),
      parent_conversation: z.string().optional(),
      creator: z.string(),
      is_ext_shared: z.boolean(),
      shared_team_ids: z.array(z.string()),
      pending_connected_team_ids: z.array(z.string()),
      is_member: z.boolean(),
      topic: z
        .object({
          value: z.string(),
          creator: z.string(),
          last_set: z.number(),
        })
        .optional(),
      purpose: z
        .object({
          value: z.string(),
          creator: z.string(),
          last_set: z.number(),
        })
        .optional(),
      previous_names: z.array(z.string()).optional(),
      num_members: z.number().optional(),
    }),
  ),
  response_metadata: z
    .object({
      next_cursor: z.string().optional(),
    })
    .optional(),
})

export function createActions(http: HttpClient): SlackActions {
  return {
    async authTest(): Promise<Result<AuthTestResponse>> {
      try {
        return parse(AuthTestResponseSchema, await http('/auth.test'))
      } catch (e) {
        return fail(e)
      }
    },

    async postMessage(params: PostMessageParams): Promise<Result<any>> {
      try {
        const validated = parse(PostMessageParamsSchema, params)
        if (!validated.ok) return validated

        const response = await http('/chat.postMessage', {
          method: 'POST',
          body: JSON.stringify(validated.data),
        })

        return parse(MessageSchema, (response as any).message || response)
      } catch (e) {
        return fail(e)
      }
    },

    async getUserInfo(params: { user: string }): Promise<Result<any>> {
      try {
        const validated = parse(GetUserInfoParamsSchema, params)
        if (!validated.ok) return validated

        const response = await http(
          `/users.info?user=${encodeURIComponent(params.user)}`,
        )

        return parse(UserSchema, (response as any).user)
      } catch (e) {
        return fail(e)
      }
    },

    async listConversations(
      params?: ListConversationsParams,
    ): Promise<Result<ConversationsListResponse>> {
      try {
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

        return parse(
          ConversationsListResponseSchema,
          await http(`/conversations.list${queryParams}`),
        )
      } catch (e) {
        return fail(e)
      }
    },
  }
}
