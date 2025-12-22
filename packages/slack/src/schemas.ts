import { z } from 'zod'

/**
 * Represents a Slack user.
 *
 * @see https://api.slack.com/types/user
 * @see https://api.slack.com/methods/users.info
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
        image_original: z
          .string()
          .optional()
          .meta({ description: 'URL of original avatar image.' }),
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
    has_2fa: z.boolean().optional().meta({
      description: 'Whether the user has two-factor authentication enabled.',
    }),
    is_stranger: z.boolean().optional().meta({
      description:
        'Whether the user belongs to a foreign workspace party to a shared channel.',
    }),
  })
  .meta({
    description: 'Represents a Slack user.',
  })

export type User = z.infer<typeof UserSchema>

/**
 * Block Kit text object.
 *
 * @see https://api.slack.com/reference/block-kit/composition-objects#text
 */
export const BlockKitTextSchema = z
  .object({
    type: z.enum(['plain_text', 'mrkdwn']).meta({
      description: 'The formatting to use for this text object.',
    }),
    text: z.string().meta({ description: 'The text for the block.' }),
    emoji: z.boolean().optional().meta({
      description:
        'Indicates whether emojis in a text field should be escaped into the colon emoji format.',
    }),
    verbatim: z.boolean().optional().meta({
      description:
        'When set to false (as is default) URLs will be auto-converted into links.',
    }),
  })
  .meta({
    description: 'Block Kit text object.',
  })

export type BlockKitText = z.infer<typeof BlockKitTextSchema>

/**
 * Block Kit block element (simplified structure for type safety).
 * For full Block Kit documentation, see: https://api.slack.com/block-kit
 */
export const BlockKitBlockSchema: z.ZodType<any> = z
  .object({
    type: z.string().meta({ description: 'The type of block.' }),
  })
  .passthrough()
  .meta({
    description:
      'Block Kit block element. See https://api.slack.com/block-kit for full documentation.',
  })

export type BlockKitBlock = z.infer<typeof BlockKitBlockSchema>

/**
 * Legacy message attachment.
 *
 * @see https://api.slack.com/reference/messaging/attachments
 */
export const AttachmentSchema = z
  .object({
    fallback: z
      .string()
      .optional()
      .meta({ description: 'A plain-text summary of the attachment.' }),
    color: z.string().optional().meta({
      description: 'Color bar along the left side of the attachment.',
    }),
    pretext: z
      .string()
      .optional()
      .meta({ description: 'Text that appears above the attachment block.' }),
    author_name: z
      .string()
      .optional()
      .meta({ description: 'Small text used to display the author name.' }),
    author_link: z.string().optional().meta({
      description: 'A valid URL that will hyperlink the author_name text.',
    }),
    author_icon: z.string().optional().meta({
      description:
        'A valid URL that displays a small 16x16px image to the left of the author_name text.',
    }),
    title: z.string().optional().meta({
      description:
        'The title is displayed as larger, bold text near the top of a message attachment.',
    }),
    title_link: z.string().optional().meta({
      description: 'A valid URL that turns the title text into a hyperlink.',
    }),
    text: z
      .string()
      .optional()
      .meta({ description: 'The main text in a message attachment.' }),
    fields: z
      .array(
        z.object({
          title: z
            .string()
            .optional()
            .meta({ description: 'The title may not contain markup.' }),
          value: z
            .string()
            .optional()
            .meta({ description: 'The value of the field.' }),
          short: z.boolean().optional().meta({
            description:
              'Whether the field object is short enough to be displayed side-by-side with other field objects.',
          }),
        }),
      )
      .optional()
      .meta({ description: 'An array of field objects.' }),
    image_url: z.string().optional().meta({
      description:
        'A valid URL to an image file that will be displayed inside a message attachment.',
    }),
    thumb_url: z.string().optional().meta({
      description:
        'A valid URL to an image file that will be displayed as a thumbnail on the right side of a message attachment.',
    }),
    footer: z.string().optional().meta({
      description:
        'Add some brief text to help contextualize and identify an attachment.',
    }),
    footer_icon: z.string().optional().meta({
      description:
        'A valid URL to an image file that will be displayed beside the footer text.',
    }),
    ts: z.number().optional().meta({
      description:
        'A Unix timestamp that is used to relate your attachment to a specific time.',
    }),
    id: z
      .number()
      .optional()
      .meta({ description: 'A unique identifier for the attachment.' }),
  })
  .passthrough()
  .meta({
    description:
      'Legacy message attachment. See https://api.slack.com/reference/messaging/attachments for full documentation.',
  })

export type Attachment = z.infer<typeof AttachmentSchema>

/**
 * Message metadata object.
 *
 * @see https://api.slack.com/methods/chat.postMessage
 */
export const MessageMetadataSchema = z
  .object({
    event_type: z.string().meta({
      description: 'The type of event associated with this message.',
    }),
    event_payload: z
      .record(
        z.string(),
        z.union([
          z.string(),
          z.number(),
          z.boolean(),
          z.null(),
          z.array(z.any()),
          z.record(z.string(), z.any()),
        ]),
      )
      .meta({
        description:
          'The payload of the event. Can contain strings, numbers, booleans, null, arrays, or nested objects.',
      }),
  })
  .passthrough()
  .meta({
    description:
      'JSON object with event_type and event_payload fields. You can also provide Work Object entity metadata using this parameter.',
  })

export type MessageMetadata = z.infer<typeof MessageMetadataSchema>

/**
 * Represents a Slack message.
 *
 * @see https://api.slack.com/messaging/retrieving#individual_messages
 * @see https://api.slack.com/methods/chat.postMessage
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
    username: z
      .string()
      .optional()
      .meta({ description: 'Username of the bot that sent the message.' }),
    blocks: z
      .array(BlockKitBlockSchema)
      .optional()
      .meta({ description: 'Block Kit blocks for rich formatting.' }),
    attachments: z
      .array(AttachmentSchema)
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
 * Sends a message to a channel.
 *
 * @see https://api.slack.com/methods/chat.postMessage
 */
export const PostMessageParamsSchema = z
  .object({
    channel: z.string().min(1).meta({
      description:
        'An encoded ID or channel name that represents a channel, private group, or IM channel to send the message to.',
    }),
    text: z.string().max(40000).optional().meta({
      description:
        'How this field works and whether it is required depends on other fields you use in your API call. If you are using blocks, this is used as a fallback string to display in notifications. If you are not using blocks, this is the main body text of the message. It can be formatted as plain text, or with mrkdwn.',
    }),
    as_user: z.boolean().optional().meta({
      description:
        '(Legacy) Pass true to post the message as the authed user instead of as a bot. Defaults to false. Can only be used by classic apps.',
    }),
    attachments: z.array(AttachmentSchema).max(100).optional().meta({
      description:
        'A JSON-based array of structured attachments, presented as a URL-encoded string.',
    }),
    blocks: z.array(BlockKitBlockSchema).optional().meta({
      description:
        'A JSON-based array of structured blocks, presented as a URL-encoded string.',
    }),
    current_draft_last_updated_ts: z.string().optional().meta({
      description:
        "This field represents the timestamp of the draft's last update at the time this API is called. If the current message is a draft, this field can be provided to ensure synchronization with the server.",
    }),
    icon_emoji: z.string().optional().meta({
      description:
        'Emoji to use as the icon for this message. Overrides icon_url.',
    }),
    icon_url: z.string().url().optional().meta({
      description: 'URL to an image to use as the icon for this message.',
    }),
    link_names: z.boolean().optional().meta({
      description:
        'Find and link user groups. No longer supports linking individual users; use syntax shown in Mentioning Users instead.',
    }),
    markdown_text: z.string().max(12000).optional().meta({
      description:
        'Accepts message text formatted in markdown. This argument should not be used in conjunction with blocks or text. Limit this field to 12,000 characters.',
    }),
    metadata: MessageMetadataSchema.optional().meta({
      description:
        'JSON object with event_type and event_payload fields, presented as a URL-encoded string. You can also provide Work Object entity metadata using this parameter. Metadata you post to Slack is accessible to any app or user who is a member of that workspace.',
    }),
    mrkdwn: z.boolean().optional().meta({
      description:
        'Disable Slack markup parsing by setting to false. Enabled by default.',
    }),
    parse: z.enum(['full', 'none']).optional().meta({
      description: 'Change how messages are treated.',
    }),
    reply_broadcast: z.boolean().optional().meta({
      description:
        'Used in conjunction with thread_ts and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to false.',
    }),
    thread_ts: z.string().optional().meta({
      description:
        "Provide another message's ts value to make this message a reply. Avoid using a reply's ts value; use its parent instead.",
    }),
    unfurl_links: z.boolean().optional().meta({
      description:
        'Pass true to enable unfurling of primarily text-based content.',
    }),
    unfurl_media: z.boolean().optional().meta({
      description: 'Pass false to disable unfurling of media content.',
    }),
    username: z.string().optional().meta({
      description: "Set your bot's user name.",
    }),
  })
  .meta({
    description:
      'Parameters for posting a message to a channel. Sends a message to a channel.',
  })

export type PostMessageParams = z.infer<typeof PostMessageParamsSchema>

/**
 * Parameters for getting user information.
 *
 * Gets information about a user.
 *
 * @see https://api.slack.com/methods/users.info
 */
export const GetUserInfoParamsSchema = z
  .object({
    user: z.string().min(1).meta({ description: 'User to get info on' }),
    include_locale: z.boolean().optional().meta({
      description:
        'Set this to true to receive the locale for this user. Defaults to false',
    }),
  })
  .meta({
    description:
      'Parameters for getting user information. Gets information about a user.',
  })

export type GetUserInfoParams = z.infer<typeof GetUserInfoParamsSchema>

/**
 * Parameters for listing conversations (channels).
 *
 * Lists all channels in a Slack team.
 *
 * @see https://api.slack.com/methods/conversations.list
 */
export const ListConversationsParamsSchema = z
  .object({
    cursor: z.string().optional().meta({
      description:
        'Paginate through collections of data by setting the cursor parameter to a next_cursor attribute returned by a previous request\'s response_metadata. Default value fetches the first "page" of the collection.',
    }),
    exclude_archived: z.boolean().optional().meta({
      description:
        'Set to true to exclude archived channels from the list. Default: false',
    }),
    limit: z.number().min(1).max(1000).optional().meta({
      description:
        "The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer under 1000. Default: 100",
    }),
    team_id: z.string().optional().meta({
      description:
        'Encoded team id to list channels in, required if token belongs to org-wide app',
    }),
    types: z.string().optional().meta({
      description:
        'Mix and match channel types by providing a comma-separated list of any combination of public_channel, private_channel, mpim, im. Default: public_channel',
    }),
  })
  .meta({
    description:
      'Parameters for listing conversations (channels). Lists all channels in a Slack team.',
  })

export type ListConversationsParams = z.infer<
  typeof ListConversationsParamsSchema
>

/**
 * Represents a Slack channel/conversation.
 *
 * @see https://api.slack.com/types/conversation
 * @see https://api.slack.com/methods/conversations.list
 */
export const ChannelSchema = z
  .object({
    id: z.string().meta({ description: 'Unique identifier for the channel.' }),
    name: z.string().optional().meta({ description: 'Channel name.' }),
    is_channel: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a public channel.' }),
    is_group: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a private channel.' }),
    is_im: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a direct message.' }),
    is_mpim: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a multi-person direct message.' }),
    is_private: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the channel is private.' }),
    created: z
      .number()
      .optional()
      .meta({ description: 'Unix timestamp of channel creation.' }),
    is_archived: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the channel is archived.' }),
    is_general: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is the #general channel.' }),
    unlinked: z
      .number()
      .optional()
      .meta({ description: 'Number of times channel has been unlinked.' }),
    name_normalized: z
      .string()
      .optional()
      .meta({ description: 'Normalized channel name.' }),
    is_shared: z.boolean().optional().meta({
      description: 'Whether the channel is shared with another workspace.',
    }),
    is_ext_shared: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the channel is externally shared.' }),
    is_org_shared: z.boolean().optional().meta({
      description: 'Whether the channel is shared across an organization.',
    }),
    is_pending_ext_shared: z
      .boolean()
      .optional()
      .meta({ description: 'Whether external sharing is pending.' }),
    pending_shared: z
      .array(z.string())
      .optional()
      .meta({ description: 'List of pending shared workspace IDs.' }),
    context_team_id: z
      .string()
      .optional()
      .meta({ description: 'Team/workspace ID for context.' }),
    updated: z
      .number()
      .optional()
      .meta({ description: 'Unix timestamp of last channel update.' }),
    parent_conversation: z
      .string()
      .optional()
      .meta({ description: 'Parent conversation ID (for threads).' }),
    creator: z
      .string()
      .optional()
      .meta({ description: 'User ID who created the channel.' }),
    shared_team_ids: z
      .array(z.string())
      .optional()
      .meta({ description: 'List of team IDs this channel is shared with.' }),
    pending_connected_team_ids: z
      .array(z.string())
      .optional()
      .meta({ description: 'List of pending connected team IDs.' }),
    is_member: z
      .boolean()
      .optional()
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
    user: z
      .string()
      .optional()
      .meta({ description: 'User ID for direct message channels.' }),
    is_user_deleted: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the user in a DM has been deleted.' }),
    is_open: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the channel is open.' }),
    priority: z
      .number()
      .optional()
      .meta({ description: 'Priority value for the channel.' }),
    unread_count: z
      .number()
      .optional()
      .meta({ description: 'Unread count (for DM conversations only).' }),
    unread_count_display: z.number().optional().meta({
      description: 'Unread count display (for DM conversations only).',
    }),
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
 * Checks authentication & identity.
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
    enterprise_id: z.string().optional().meta({
      description:
        'When working against a team within an Enterprise organization, you will also find their enterprise_id here.',
    }),
  })
  .meta({
    description:
      'Response data from auth.test method. Checks authentication & identity.',
  })

export type AuthTestData = z.infer<typeof AuthTestDataSchema>
