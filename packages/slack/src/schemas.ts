import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  team_id: z.string().optional(),
  name: z.string().optional(),
  deleted: z.boolean().optional(),
  color: z.string().optional(),
  real_name: z.string().optional(),
  tz: z.string().optional(),
  tz_label: z.string().optional(),
  tz_offset: z.number().optional(),
  profile: z
    .object({
      avatar_hash: z.string().optional(),
      status_text: z.string().optional(),
      status_emoji: z.string().optional(),
      real_name: z.string().optional(),
      display_name: z.string().optional(),
      real_name_normalized: z.string().optional(),
      display_name_normalized: z.string().optional(),
      email: z.string().optional(),
      image_24: z.string().optional(),
      image_32: z.string().optional(),
      image_48: z.string().optional(),
      image_72: z.string().optional(),
      image_192: z.string().optional(),
      image_512: z.string().optional(),
      team: z.string().optional(),
    })
    .optional(),
  is_admin: z.boolean().optional(),
  is_owner: z.boolean().optional(),
  is_primary_owner: z.boolean().optional(),
  is_restricted: z.boolean().optional(),
  is_ultra_restricted: z.boolean().optional(),
  is_bot: z.boolean().optional(),
  updated: z.number().optional(),
  is_app_user: z.boolean().optional(),
})

export type User = z.infer<typeof UserSchema>

export const MessageSchema = z.object({
  type: z.string(),
  subtype: z.string().optional(),
  text: z.string().optional(),
  ts: z.string(),
  user: z.string().optional(),
  bot_id: z.string().optional(),
  channel: z.string().optional(),
  event_ts: z.string().optional(),
  channel_type: z.string().optional(),
  thread_ts: z.string().optional(),
  blocks: z.array(z.unknown()).optional(),
  attachments: z.array(z.unknown()).optional(),
})

export type Message = z.infer<typeof MessageSchema>

export const MessageEventSchema = z.object({
  type: z.literal('message'),
  channel: z.string(),
  user: z.string().optional(),
  text: z.string().optional(),
  ts: z.string(),
  event_ts: z.string(),
  channel_type: z.string(),
  thread_ts: z.string().optional(),
  bot_id: z.string().optional(),
  subtype: z.string().optional(),
})

export type MessageEvent = z.infer<typeof MessageEventSchema>

export const AppMentionEventSchema = z.object({
  type: z.literal('app_mention'),
  user: z.string(),
  text: z.string(),
  ts: z.string(),
  channel: z.string(),
  event_ts: z.string(),
  thread_ts: z.string().optional(),
})

export type AppMentionEvent = z.infer<typeof AppMentionEventSchema>

export const ReactionAddedEventSchema = z.object({
  type: z.literal('reaction_added'),
  user: z.string(),
  reaction: z.string(),
  item_user: z.string().optional(),
  item: z.object({
    type: z.string(),
    channel: z.string(),
    ts: z.string(),
  }),
  event_ts: z.string(),
})

export type ReactionAddedEvent = z.infer<typeof ReactionAddedEventSchema>

export const ReactionRemovedEventSchema = z.object({
  type: z.literal('reaction_removed'),
  user: z.string(),
  reaction: z.string(),
  item_user: z.string().optional(),
  item: z.object({
    type: z.string(),
    channel: z.string(),
    ts: z.string(),
  }),
  event_ts: z.string(),
})

export type ReactionRemovedEvent = z.infer<typeof ReactionRemovedEventSchema>

export const MemberJoinedChannelEventSchema = z.object({
  type: z.literal('member_joined_channel'),
  user: z.string(),
  channel: z.string(),
  channel_type: z.string(),
  team: z.string(),
  inviter: z.string().optional(),
  event_ts: z.string(),
})

export type MemberJoinedChannelEvent = z.infer<
  typeof MemberJoinedChannelEventSchema
>

export const SlackEventSchema = z.object({
  token: z.string().optional(),
  team_id: z.string(),
  api_app_id: z.string(),
  event: z.union([
    MessageEventSchema,
    AppMentionEventSchema,
    ReactionAddedEventSchema,
    ReactionRemovedEventSchema,
    MemberJoinedChannelEventSchema,
    z.object({ type: z.string() }).passthrough(),
  ]),
  type: z.literal('event_callback'),
  event_id: z.string(),
  event_time: z.number(),
  authorizations: z
    .array(
      z.object({
        enterprise_id: z.string().nullable().optional(),
        team_id: z.string(),
        user_id: z.string(),
        is_bot: z.boolean(),
        is_enterprise_install: z.boolean().optional(),
      }),
    )
    .optional(),
  is_ext_shared_channel: z.boolean().optional(),
  event_context: z.string().optional(),
})

export type SlackEvent = z.infer<typeof SlackEventSchema>

export const UrlVerificationSchema = z.object({
  type: z.literal('url_verification'),
  token: z.string(),
  challenge: z.string(),
})

export type UrlVerification = z.infer<typeof UrlVerificationSchema>

export const WebhookPayloadSchema = z.union([
  SlackEventSchema,
  UrlVerificationSchema,
])

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>

export const PostMessageParamsSchema = z.object({
  channel: z.string(),
  text: z.string().optional(),
  blocks: z.array(z.unknown()).optional(),
  attachments: z.array(z.unknown()).optional(),
  thread_ts: z.string().optional(),
  reply_broadcast: z.boolean().optional(),
  mrkdwn: z.boolean().optional(),
})
export type PostMessageParams = z.infer<typeof PostMessageParamsSchema>

export const GetUserInfoParamsSchema = z.object({
  user: z.string(),
})
export type GetUserInfoParams = z.infer<typeof GetUserInfoParamsSchema>

export const ListConversationsParamsSchema = z.object({
  cursor: z.string().optional(),
  exclude_archived: z.boolean().optional(),
  limit: z.number().optional(),
  team_id: z.string().optional(),
  types: z.string().optional(),
})
export type ListConversationsParams = z.infer<
  typeof ListConversationsParamsSchema
>

export const ChannelSchema = z.object({
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
})
export type Channel = z.infer<typeof ChannelSchema>

export const ConversationsListSchema = z.object({
  ok: z.boolean(),
  channels: z.array(ChannelSchema),
  response_metadata: z
    .object({ next_cursor: z.string().optional() })
    .optional(),
})
export type ConversationsList = z.infer<typeof ConversationsListSchema>

export const AuthTestDataSchema = z.object({
  ok: z.boolean(),
  url: z.string(),
  team: z.string(),
  user: z.string(),
  team_id: z.string(),
  user_id: z.string(),
  bot_id: z.string().optional(),
  is_enterprise_install: z.boolean().optional(),
})
export type AuthTestData = z.infer<typeof AuthTestDataSchema>
