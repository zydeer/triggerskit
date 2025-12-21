import { z } from 'zod'

/**
 * Represents a Slack user.
 *
 * @see https://api.slack.com/types/user
 */
export const UserSchema = z
  .object({
    id: z.string().meta({ description: 'Unique identifier for the user.' }),
    team_id: z
      .string()
      .optional()
      .meta({ description: 'Workspace/team ID the user belongs to.' }),
    name: z.string().optional().meta({ description: 'Username.' }),
    deleted: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user has been deleted.' }),
    color: z
      .string()
      .optional()
      .meta({ description: 'Color assigned to the user in the UI.' }),
    real_name: z
      .string()
      .optional()
      .meta({ description: 'Real name of the user.' }),
    tz: z.string().optional().meta({
      description: 'Timezone identifier (e.g., America/Los_Angeles).',
    }),
    tz_label: z
      .string()
      .optional()
      .meta({ description: 'Human-readable timezone label.' }),
    tz_offset: z
      .number()
      .optional()
      .meta({ description: 'Timezone offset in seconds from UTC.' }),
    profile: z
      .object({
        avatar_hash: z
          .string()
          .optional()
          .meta({ description: 'Hash of the avatar image.' }),
        status_text: z
          .string()
          .optional()
          .meta({ description: 'Current status text.' }),
        status_emoji: z
          .string()
          .optional()
          .meta({ description: 'Current status emoji.' }),
        real_name: z
          .string()
          .optional()
          .meta({ description: 'Real name from profile.' }),
        display_name: z
          .string()
          .optional()
          .meta({ description: 'Display name.' }),
        real_name_normalized: z
          .string()
          .optional()
          .meta({ description: 'Normalized real name.' }),
        display_name_normalized: z
          .string()
          .optional()
          .meta({ description: 'Normalized display name.' }),
        email: z.string().optional().meta({ description: 'Email address.' }),
        image_24: z
          .string()
          .optional()
          .meta({ description: 'URL of 24x24 avatar image.' }),
        image_32: z
          .string()
          .optional()
          .meta({ description: 'URL of 32x32 avatar image.' }),
        image_48: z
          .string()
          .optional()
          .meta({ description: 'URL of 48x48 avatar image.' }),
        image_72: z
          .string()
          .optional()
          .meta({ description: 'URL of 72x72 avatar image.' }),
        image_192: z
          .string()
          .optional()
          .meta({ description: 'URL of 192x192 avatar image.' }),
        image_512: z
          .string()
          .optional()
          .meta({ description: 'URL of 512x512 avatar image.' }),
        team: z.string().optional().meta({ description: 'Team/workspace ID.' }),
      })
      .optional()
      .meta({ description: 'User profile information.' }),
    is_admin: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is a workspace admin.' }),
    is_owner: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is a workspace owner.' }),
    is_primary_owner: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is the primary owner.' }),
    is_restricted: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is a restricted account.' }),
    is_ultra_restricted: z.boolean().optional().meta({
      description: 'Whether the user is an ultra-restricted account.',
    }),
    is_bot: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is a bot.' }),
    updated: z
      .number()
      .optional()
      .meta({ description: 'Unix timestamp of last profile update.' }),
    is_app_user: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user is an app user.' }),
  })
  .meta({
    description: 'Represents a Slack user.',
  })

export type User = z.infer<typeof UserSchema>

/**
 * Represents a Slack message.
 *
 * @see https://api.slack.com/messaging/retrieving#individual_messages
 */
export const MessageSchema = z
  .object({
    type: z.string().meta({ description: 'Message type (usually "message").' }),
    subtype: z.string().optional().meta({
      description: 'Message subtype (e.g., bot_message, file_share).',
    }),
    text: z.string().optional().meta({ description: 'Message text content.' }),
    ts: z
      .string()
      .meta({ description: 'Timestamp identifier for the message.' }),
    user: z
      .string()
      .optional()
      .meta({ description: 'User ID who sent the message.' }),
    bot_id: z
      .string()
      .optional()
      .meta({ description: 'Bot ID if sent by a bot.' }),
    channel: z
      .string()
      .optional()
      .meta({ description: 'Channel ID where message was sent.' }),
    event_ts: z.string().optional().meta({ description: 'Event timestamp.' }),
    channel_type: z
      .string()
      .optional()
      .meta({ description: 'Type of channel (channel, group, im, mpim).' }),
    thread_ts: z
      .string()
      .optional()
      .meta({ description: 'Thread timestamp if message is in a thread.' }),
    blocks: z
      .array(z.unknown())
      .optional()
      .meta({ description: 'Block Kit blocks for rich formatting.' }),
    attachments: z
      .array(z.unknown())
      .optional()
      .meta({ description: 'Legacy message attachments.' }),
  })
  .meta({
    description: 'Represents a Slack message.',
  })

export type Message = z.infer<typeof MessageSchema>

/**
 * Event payload for message events.
 *
 * @see https://api.slack.com/events/message
 */
export const MessageEventSchema = z
  .object({
    type: z.literal('message').meta({ description: 'Event type.' }),
    channel: z
      .string()
      .meta({ description: 'Channel ID where message was sent.' }),
    user: z
      .string()
      .optional()
      .meta({ description: 'User ID who sent the message.' }),
    text: z.string().optional().meta({ description: 'Message text content.' }),
    ts: z.string().meta({ description: 'Message timestamp.' }),
    event_ts: z.string().meta({ description: 'Event timestamp.' }),
    channel_type: z
      .string()
      .meta({ description: 'Type of channel (channel, group, im, mpim).' }),
    thread_ts: z
      .string()
      .optional()
      .meta({ description: 'Thread timestamp if message is in a thread.' }),
    bot_id: z
      .string()
      .optional()
      .meta({ description: 'Bot ID if sent by a bot.' }),
    subtype: z.string().optional().meta({ description: 'Message subtype.' }),
  })
  .meta({
    description: 'Event payload for message events.',
  })

export type MessageEvent = z.infer<typeof MessageEventSchema>

/**
 * Event payload when your app is mentioned.
 *
 * @see https://api.slack.com/events/app_mention
 */
export const AppMentionEventSchema = z
  .object({
    type: z.literal('app_mention').meta({ description: 'Event type.' }),
    user: z.string().meta({ description: 'User ID who mentioned the app.' }),
    text: z
      .string()
      .meta({ description: 'Message text containing the mention.' }),
    ts: z.string().meta({ description: 'Message timestamp.' }),
    channel: z
      .string()
      .meta({ description: 'Channel ID where mention occurred.' }),
    event_ts: z.string().meta({ description: 'Event timestamp.' }),
    thread_ts: z
      .string()
      .optional()
      .meta({ description: 'Thread timestamp if mention is in a thread.' }),
  })
  .meta({
    description: 'Event payload when your app is mentioned.',
  })

export type AppMentionEvent = z.infer<typeof AppMentionEventSchema>

/**
 * Event payload when a reaction is added to a message.
 *
 * @see https://api.slack.com/events/reaction_added
 */
export const ReactionAddedEventSchema = z
  .object({
    type: z.literal('reaction_added').meta({ description: 'Event type.' }),
    user: z.string().meta({ description: 'User ID who added the reaction.' }),
    reaction: z
      .string()
      .meta({ description: 'Reaction emoji name (without colons).' }),
    item_user: z
      .string()
      .optional()
      .meta({ description: 'User ID who created the reacted item.' }),
    item: z
      .object({
        type: z.string().meta({ description: 'Item type (e.g., message).' }),
        channel: z.string().meta({ description: 'Channel ID of the item.' }),
        ts: z.string().meta({ description: 'Timestamp of the item.' }),
      })
      .meta({ description: 'Item that received the reaction.' }),
    event_ts: z.string().meta({ description: 'Event timestamp.' }),
  })
  .meta({
    description: 'Event payload when a reaction is added to a message.',
  })

export type ReactionAddedEvent = z.infer<typeof ReactionAddedEventSchema>

/**
 * Event payload when a reaction is removed from a message.
 *
 * @see https://api.slack.com/events/reaction_removed
 */
export const ReactionRemovedEventSchema = z
  .object({
    type: z.literal('reaction_removed').meta({ description: 'Event type.' }),
    user: z.string().meta({ description: 'User ID who removed the reaction.' }),
    reaction: z
      .string()
      .meta({ description: 'Reaction emoji name (without colons).' }),
    item_user: z
      .string()
      .optional()
      .meta({ description: 'User ID who created the reacted item.' }),
    item: z
      .object({
        type: z.string().meta({ description: 'Item type (e.g., message).' }),
        channel: z.string().meta({ description: 'Channel ID of the item.' }),
        ts: z.string().meta({ description: 'Timestamp of the item.' }),
      })
      .meta({ description: 'Item that had the reaction removed.' }),
    event_ts: z.string().meta({ description: 'Event timestamp.' }),
  })
  .meta({
    description: 'Event payload when a reaction is removed from a message.',
  })

export type ReactionRemovedEvent = z.infer<typeof ReactionRemovedEventSchema>

/**
 * Event payload when a user joins a channel.
 *
 * @see https://api.slack.com/events/member_joined_channel
 */
export const MemberJoinedChannelEventSchema = z
  .object({
    type: z
      .literal('member_joined_channel')
      .meta({ description: 'Event type.' }),
    user: z.string().meta({ description: 'User ID who joined the channel.' }),
    channel: z.string().meta({ description: 'Channel ID that was joined.' }),
    channel_type: z
      .string()
      .meta({ description: 'Type of channel (C for public, G for private).' }),
    team: z.string().meta({ description: 'Team/workspace ID.' }),
    inviter: z
      .string()
      .optional()
      .meta({ description: 'User ID who invited the member (if applicable).' }),
    event_ts: z.string().meta({ description: 'Event timestamp.' }),
  })
  .meta({
    description: 'Event payload when a user joins a channel.',
  })

export type MemberJoinedChannelEvent = z.infer<
  typeof MemberJoinedChannelEventSchema
>

/**
 * Wrapper for Slack Events API event callbacks.
 *
 * @see https://api.slack.com/events-api
 */
export const SlackEventSchema = z
  .object({
    token: z
      .string()
      .optional()
      .meta({ description: 'Verification token (deprecated).' }),
    team_id: z.string().meta({ description: 'Team/workspace ID.' }),
    api_app_id: z.string().meta({ description: 'App ID.' }),
    event: z
      .union([
        MessageEventSchema,
        AppMentionEventSchema,
        ReactionAddedEventSchema,
        ReactionRemovedEventSchema,
        MemberJoinedChannelEventSchema,
        z.object({ type: z.string() }).loose(),
      ])
      .meta({ description: 'The actual event data.' }),
    type: z
      .literal('event_callback')
      .meta({ description: 'Callback type indicator.' }),
    event_id: z.string().meta({ description: 'Unique event ID.' }),
    event_time: z
      .number()
      .meta({ description: 'Unix timestamp when event occurred.' }),
    authorizations: z
      .array(
        z.object({
          enterprise_id: z
            .string()
            .nullable()
            .optional()
            .meta({ description: 'Enterprise Grid organization ID.' }),
          team_id: z.string().meta({ description: 'Team/workspace ID.' }),
          user_id: z
            .string()
            .meta({ description: 'User ID who installed the app.' }),
          is_bot: z
            .boolean()
            .meta({ description: 'Whether this is a bot token.' }),
          is_enterprise_install: z.boolean().optional().meta({
            description: 'Whether this is an Enterprise Grid install.',
          }),
        }),
      )
      .optional()
      .meta({ description: 'Authorization information.' }),
    is_ext_shared_channel: z.boolean().optional().meta({
      description: 'Whether event is from an externally shared channel.',
    }),
    event_context: z
      .string()
      .optional()
      .meta({ description: 'Event context identifier.' }),
  })
  .meta({
    description: 'Wrapper for Slack Events API event callbacks.',
  })

export type SlackEvent = z.infer<typeof SlackEventSchema>

/**
 * URL verification challenge for Events API setup.
 *
 * @see https://api.slack.com/events/url_verification
 */
export const UrlVerificationSchema = z
  .object({
    type: z
      .literal('url_verification')
      .meta({ description: 'Verification type indicator.' }),
    token: z.string().meta({ description: 'Verification token.' }),
    challenge: z
      .string()
      .meta({ description: 'Challenge string to echo back.' }),
  })
  .meta({
    description: 'URL verification challenge for Events API setup.',
  })

export type UrlVerification = z.infer<typeof UrlVerificationSchema>

/**
 * Union of all possible webhook payloads.
 */
export const WebhookPayloadSchema = z
  .union([SlackEventSchema, UrlVerificationSchema])
  .meta({
    description: 'Union of all possible webhook payloads.',
  })

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>

/**
 * Parameters for posting a message to a channel.
 *
 * @see https://api.slack.com/methods/chat.postMessage
 */
export const PostMessageParamsSchema = z
  .object({
    channel: z
      .string()
      .min(1)
      .meta({ description: 'Channel ID or name to post message to.' }),
    text: z
      .string()
      .optional()
      .meta({ description: 'Message text (required if blocks not provided).' }),
    blocks: z
      .array(z.unknown())
      .optional()
      .meta({ description: 'Block Kit blocks for rich formatting.' }),
    attachments: z
      .array(z.unknown())
      .optional()
      .meta({ description: 'Legacy message attachments.' }),
    thread_ts: z
      .string()
      .optional()
      .meta({ description: 'Thread timestamp to reply to.' }),
    reply_broadcast: z
      .boolean()
      .optional()
      .meta({ description: 'Whether to broadcast thread reply to channel.' }),
    mrkdwn: z.boolean().optional().meta({
      description: 'Whether to enable markdown formatting (default: true).',
    }),
  })
  .meta({
    description: 'Parameters for posting a message to a channel.',
  })

export type PostMessageParams = z.infer<typeof PostMessageParamsSchema>

/**
 * Parameters for getting user information.
 *
 * @see https://api.slack.com/methods/users.info
 */
export const GetUserInfoParamsSchema = z
  .object({
    user: z
      .string()
      .min(1)
      .meta({ description: 'User ID to get information for.' }),
  })
  .meta({
    description: 'Parameters for getting user information.',
  })

export type GetUserInfoParams = z.infer<typeof GetUserInfoParamsSchema>

/**
 * Parameters for listing conversations (channels).
 *
 * @see https://api.slack.com/methods/conversations.list
 */
export const ListConversationsParamsSchema = z
  .object({
    cursor: z
      .string()
      .optional()
      .meta({ description: 'Pagination cursor from previous response.' }),
    exclude_archived: z.boolean().optional().meta({
      description: 'Whether to exclude archived channels (default: false).',
    }),
    limit: z.number().min(1).max(1000).optional().meta({
      description:
        'Maximum number of results to return (default: 100, max: 1000).',
    }),
    team_id: z
      .string()
      .optional()
      .meta({ description: 'Team ID (for Enterprise Grid).' }),
    types: z
      .array(z.enum(['public_channel', 'private_channel', 'mpim', 'im']))
      .optional()
      .meta({
        description:
          'Array of channel types to include (public_channel, private_channel, mpim, im).',
      }),
  })
  .meta({
    description: 'Parameters for listing conversations (channels).',
  })

export type ListConversationsParams = z.infer<
  typeof ListConversationsParamsSchema
>

/**
 * Represents a Slack channel/conversation.
 *
 * @see https://api.slack.com/types/conversation
 */
export const ChannelSchema = z
  .object({
    id: z.string().meta({ description: 'Unique identifier for the channel.' }),
    name: z.string().meta({ description: 'Channel name.' }),
    is_channel: z
      .boolean()
      .meta({ description: 'Whether this is a public channel.' }),
    is_group: z
      .boolean()
      .meta({ description: 'Whether this is a private channel.' }),
    is_im: z
      .boolean()
      .meta({ description: 'Whether this is a direct message.' }),
    is_mpim: z
      .boolean()
      .meta({ description: 'Whether this is a multi-person direct message.' }),
    is_private: z
      .boolean()
      .meta({ description: 'Whether the channel is private.' }),
    created: z
      .number()
      .meta({ description: 'Unix timestamp of channel creation.' }),
    is_archived: z
      .boolean()
      .meta({ description: 'Whether the channel is archived.' }),
    is_general: z
      .boolean()
      .meta({ description: 'Whether this is the #general channel.' }),
    unlinked: z
      .number()
      .meta({ description: 'Number of times channel has been unlinked.' }),
    name_normalized: z
      .string()
      .meta({ description: 'Normalized channel name.' }),
    is_shared: z.boolean().meta({
      description: 'Whether the channel is shared with another workspace.',
    }),
    is_org_shared: z.boolean().meta({
      description: 'Whether the channel is shared across an organization.',
    }),
    is_pending_ext_shared: z
      .boolean()
      .meta({ description: 'Whether external sharing is pending.' }),
    pending_shared: z
      .array(z.string())
      .meta({ description: 'List of pending shared workspace IDs.' }),
    context_team_id: z
      .string()
      .meta({ description: 'Team/workspace ID for context.' }),
    updated: z
      .number()
      .meta({ description: 'Unix timestamp of last channel update.' }),
    parent_conversation: z
      .string()
      .optional()
      .meta({ description: 'Parent conversation ID (for threads).' }),
    creator: z
      .string()
      .meta({ description: 'User ID who created the channel.' }),
    is_ext_shared: z
      .boolean()
      .meta({ description: 'Whether the channel is externally shared.' }),
    shared_team_ids: z
      .array(z.string())
      .meta({ description: 'List of team IDs this channel is shared with.' }),
    pending_connected_team_ids: z
      .array(z.string())
      .meta({ description: 'List of pending connected team IDs.' }),
    is_member: z
      .boolean()
      .meta({ description: 'Whether the authenticated user is a member.' }),
    topic: z
      .object({
        value: z.string().meta({ description: 'Topic text.' }),
        creator: z.string().meta({ description: 'User ID who set the topic.' }),
        last_set: z
          .number()
          .meta({ description: 'Unix timestamp when topic was last set.' }),
      })
      .optional()
      .meta({ description: 'Channel topic information.' }),
    purpose: z
      .object({
        value: z.string().meta({ description: 'Purpose text.' }),
        creator: z
          .string()
          .meta({ description: 'User ID who set the purpose.' }),
        last_set: z
          .number()
          .meta({ description: 'Unix timestamp when purpose was last set.' }),
      })
      .optional()
      .meta({ description: 'Channel purpose information.' }),
    previous_names: z
      .array(z.string())
      .optional()
      .meta({ description: 'Previous names of the channel.' }),
    num_members: z
      .number()
      .optional()
      .meta({ description: 'Number of members in the channel.' }),
  })
  .meta({
    description: 'Represents a Slack channel/conversation.',
  })

export type Channel = z.infer<typeof ChannelSchema>

/**
 * Response data from listing conversations.
 *
 * @see https://api.slack.com/methods/conversations.list
 */
export const ConversationsListSchema = z
  .object({
    ok: z
      .boolean()
      .meta({ description: 'Whether the request was successful.' }),
    channels: z
      .array(ChannelSchema)
      .meta({ description: 'Array of channel objects.' }),
    response_metadata: z
      .object({
        next_cursor: z
          .string()
          .optional()
          .meta({ description: 'Cursor for pagination.' }),
      })
      .optional()
      .meta({ description: 'Response metadata for pagination.' }),
  })
  .meta({
    description: 'Response data from listing conversations.',
  })

export type ConversationsList = z.infer<typeof ConversationsListSchema>

/**
 * Response data from auth.test method.
 *
 * @see https://api.slack.com/methods/auth.test
 */
export const AuthTestDataSchema = z
  .object({
    ok: z
      .boolean()
      .meta({ description: 'Whether the request was successful.' }),
    url: z.string().meta({ description: 'Workspace URL.' }),
    team: z.string().meta({ description: 'Workspace/team name.' }),
    user: z
      .string()
      .meta({ description: 'Username of the authenticated user.' }),
    team_id: z.string().meta({ description: 'Workspace/team ID.' }),
    user_id: z
      .string()
      .meta({ description: 'User ID of the authenticated user.' }),
    bot_id: z
      .string()
      .optional()
      .meta({ description: 'Bot ID if authenticated as a bot.' }),
    is_enterprise_install: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is an Enterprise Grid install.' }),
  })
  .meta({
    description: 'Response data from auth.test method.',
  })

export type AuthTestData = z.infer<typeof AuthTestDataSchema>
