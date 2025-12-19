import * as z from 'zod'

/**
 * This object represents a Telegram user or bot.
 *
 * @see https://core.telegram.org/bots/api#user
 */
export const UserSchema = z
  .object({
    id: z.number().meta({
      description:
        'Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.',
    }),
    is_bot: z.boolean().meta({ description: '`true` if this user is a bot.' }),
    first_name: z.string().meta({ description: "User's or bot's first name." }),
    last_name: z
      .string()
      .optional()
      .meta({ description: "User's or bot's last name." }),
    username: z
      .string()
      .optional()
      .meta({ description: "User's or bot's username." }),
    language_code: z.string().optional().meta({
      description:
        "[IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language.",
    }),
    is_premium: z
      .boolean()
      .optional()
      .meta({ description: '`true` if this user is a Telegram Premium user.' }),
    added_to_attachment_menu: z.boolean().optional().meta({
      description: '`true` if this user added the bot to the attachment menu.',
    }),
    can_join_groups: z.boolean().optional().meta({
      description:
        '`true` if the bot can be invited to groups. Returned only in getMe.',
    }),
    can_read_all_group_messages: z.boolean().optional().meta({
      description:
        '`true` if privacy mode is disabled for the bot. Returned only in getMe. See https://core.telegram.org/bots/features#privacy-mode',
    }),
    supports_inline_queries: z.boolean().optional().meta({
      description:
        '`true` if the bot supports inline queries. Returned only in getMe. See https://core.telegram.org/bots/api#inline-mode',
    }),
    can_connect_to_business: z.boolean().optional().meta({
      description:
        '`true` if the bot can be connected to a Telegram Business account to receive its messages. Returned only in getMe.',
    }),
    has_main_web_app: z.boolean().optional().meta({
      description:
        '`true` if the bot has a main Web App. Returned only in getMe. See https://core.telegram.org/bots/webapps',
    }),
  })
  .meta({
    description: 'This object represents a Telegram user or bot.',
  })

export type User = z.infer<typeof UserSchema>

/**
 * This object represents a chat.
 *
 * @see https://core.telegram.org/bots/api#chat
 */
export const ChatSchema = z
  .object({
    id: z.number().meta({
      description:
        'Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.',
    }),
    type: z.enum(['private', 'group', 'supergroup', 'channel']).meta({
      description:
        'Type of the chat. - `private` - Private chat with a user - `group` - Group chat - `supergroup` - Supergroup chat - `channel` - Channel',
    }),
    title: z.string().optional().meta({
      description: 'Title, for supergroups, channels and group chats.',
    }),
    username: z.string().optional().meta({
      description:
        'Username, for private chats, supergroups and channels if available.',
    }),
    first_name: z.string().optional().meta({
      description: 'First name of the other party in a private chat.',
    }),
    last_name: z.string().optional().meta({
      description: 'Last name of the other party in a private chat.',
    }),
    is_forum: z.boolean().optional().meta({
      description:
        '`true` if the supergroup chat is a forum (has topics enabled). See https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups',
    }),
  })
  .meta({
    description: 'This object represents a chat.',
  })

export type Chat = z.infer<typeof ChatSchema>

/**
 * This object represents one special entity in a text message.
 * For example, hashtags, usernames, URLs, etc.
 *
 * @see https://core.telegram.org/bots/api#messageentity
 */
export const MessageEntitySchema = z
  .object({
    type: z
      .enum([
        'mention',
        'hashtag',
        'cashtag',
        'bot_command',
        'url',
        'email',
        'phone_number',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'spoiler',
        'blockquote',
        'expandable_blockquote',
        'code',
        'pre',
        'text_link',
        'text_mention',
        'custom_emoji',
      ])
      .meta({
        description:
          'Type of the message entity. Entities represent special elements within message text. Link & Reference: `mention` - User mention (@username), `hashtag` - Hashtag (#hashtag), `cashtag` - Cashtag ($USD), `bot_command` - Bot command (/start@jobs_bot), `url` - URL (https://telegram.org), `email` - Email address (do-not-reply@telegram.org), `phone_number` - Phone number (+1-212-555-0123). Text Formatting: `bold` - Bold text, `italic` - Italic text, `underline` - Underlined text, `strikethrough` - Strikethrough text, `spoiler` - Hidden text revealed on click, `code` - Inline monospace text, `pre` - Monospace code block. Special: `blockquote` - Block quotation, `expandable_blockquote` - Collapsed block quotation, `text_link` - Clickable text URLs, `text_mention` - Mention for users without usernames, `custom_emoji` - Inline custom emoji stickers.',
      }),
    offset: z.number().int().nonnegative().meta({
      description:
        'Offset in [UTF-16 code units](https://core.telegram.org/api/entities#entity-length) to the start of the entity.',
    }),
    length: z.number().int().positive().meta({
      description:
        'Length of the entity in [UTF-16 code units](https://core.telegram.org/api/entities#entity-length).',
    }),
    url: z.url().optional().meta({
      description:
        'For `text_link` only, URL that will be opened after user taps on the text.',
    }),
    user: UserSchema.optional().meta({
      description: 'For `text_mention` only, the mentioned user.',
    }),
    language: z.string().optional().meta({
      description:
        'For `pre` only, the programming language of the entity text.',
    }),
    custom_emoji_id: z.string().optional().meta({
      description:
        'For `custom_emoji` only, unique identifier of the custom emoji. Use https://core.telegram.org/bots/api#getcustomemojistickers getCustomEmojiStickers to get full information about the sticker.',
    }),
  })
  .meta({
    description:
      'This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.',
  })

export type MessageEntity = z.infer<typeof MessageEntitySchema>

/**
 * Describes the options used for link preview generation.
 *
 * @see https://core.telegram.org/bots/api#linkpreviewoptions
 */
export const LinkPreviewOptionsSchema = z
  .object({
    is_disabled: z
      .boolean()
      .optional()
      .meta({ description: '`true` if the link preview is disabled.' }),
    url: z.url().optional().meta({
      description:
        'URL to use for the link preview. If empty, then the first URL found in the message text will be used.',
    }),
    prefer_small_media: z.boolean().optional().meta({
      description:
        "`true` if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.",
    }),
    prefer_large_media: z.boolean().optional().meta({
      description:
        "`true` if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.",
    }),
    show_above_text: z.boolean().optional().meta({
      description:
        '`true` if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text.',
    }),
  })
  .meta({
    description: 'Describes the options used for link preview generation.',
  })

export type LinkPreviewOptions = z.infer<typeof LinkPreviewOptionsSchema>

/**
 * Mode for parsing entities in the message text.
 *
 * @see https://core.telegram.org/bots/api#formatting-options
 */
export const ParseModeSchema = z.enum(['Markdown', 'MarkdownV2', 'HTML'])

export type ParseMode = z.infer<typeof ParseModeSchema>

/**
 * Describes reply parameters for the message that is being sent.
 *
 * @see https://core.telegram.org/bots/api#replyparameters
 */
export const ReplyParametersSchema = z
  .object({
    message_id: z.number().int().positive().meta({
      description:
        'Identifier of the message that will be replied to in the current chat, or in the chat `chat_id` if it is specified.',
    }),
    chat_id: z.union([z.number(), z.string()]).optional().meta({
      description:
        'If the message to be replied to is from a different chat, unique identifier for the chat or username of the channel (in the format `@channelusername`). Not supported for messages sent on behalf of a business account.',
    }),
    allow_sending_without_reply: z.boolean().optional().meta({
      description:
        'Pass `true` if the message should be sent even if the specified message to be replied to is not found. Always `false` for replies in another chat or forum topic. Always `true` for messages sent on behalf of a business account.',
    }),
    quote: z.string().max(1024).optional().meta({
      description:
        "Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, and custom emoji entities. The message will fail to send if the quote isn't found in the original message.",
    }),
    quote_parse_mode: ParseModeSchema.optional().meta({
      description:
        'Mode for parsing entities in the quote. See https://core.telegram.org/bots/api#formatting-options',
    }),
    quote_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'A list of special entities that appear in the quote. It can be specified instead of `quote_parse_mode`.',
    }),
    quote_position: z.number().int().nonnegative().optional().meta({
      description:
        'Position of the quote in the original message in UTF-16 code units.',
    }),
  })
  .meta({
    description:
      'Describes reply parameters for the message that is being sent.',
  })

export type ReplyParameters = z.infer<typeof ReplyParametersSchema>

/**
 * Contains information about a Web App.
 *
 * @see https://core.telegram.org/bots/api#webappinfo
 */
export const WebAppInfoSchema = z
  .object({
    url: z.url().meta({
      description:
        'An HTTPS URL of a Web App to be opened with additional data specified in the Web App. See https://core.telegram.org/bots/webapps#initializing-mini-apps',
    }),
  })
  .meta({
    description: 'Contains information about a Web App.',
  })

export type WebAppInfo = z.infer<typeof WebAppInfoSchema>

/**
 * This object represents a parameter of the inline keyboard button used to automatically authorize a user.
 *
 * @see https://core.telegram.org/bots/api#loginurl
 */
export const LoginUrlSchema = z
  .object({
    url: z.url().meta({
      description:
        'An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data. **NOTE:** You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization.',
    }),
    forward_text: z.string().optional().meta({
      description: 'New text of the button in forwarded messages.',
    }),
    bot_username: z.string().optional().meta({
      description:
        "Username of a bot, which will be used for user authorization. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See https://core.telegram.org/widgets/login#setting-up-a-bot",
    }),
    request_write_access: z.boolean().optional().meta({
      description:
        'Pass `true` to request the permission for your bot to send messages to the user.',
    }),
  })
  .meta({
    description:
      'This object represents a parameter of the inline keyboard button used to automatically authorize a user.',
  })

export type LoginUrl = z.infer<typeof LoginUrlSchema>

/**
 * This object represents an inline button that switches the current user to inline mode
 * in a chosen chat, with an optional default inline query.
 *
 * @see https://core.telegram.org/bots/api#switchinlinequerychosenchat
 */
export const SwitchInlineQueryChosenChatSchema = z
  .object({
    query: z.string().optional().meta({
      description:
        "The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted.",
    }),
    allow_user_chats: z.boolean().optional().meta({
      description: '`true` if private chats with users can be chosen.',
    }),
    allow_bot_chats: z.boolean().optional().meta({
      description: '`true` if private chats with bots can be chosen.',
    }),
    allow_group_chats: z.boolean().optional().meta({
      description: '`true` if group and supergroup chats can be chosen.',
    }),
    allow_channel_chats: z
      .boolean()
      .optional()
      .meta({ description: '`true` if channel chats can be chosen.' }),
  })
  .meta({
    description:
      'This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query.',
  })

export type SwitchInlineQueryChosenChat = z.infer<
  typeof SwitchInlineQueryChosenChatSchema
>

/**
 * This object represents an inline keyboard button that copies specified text to the clipboard.
 *
 * @see https://core.telegram.org/bots/api#copytextbutton
 */
export const CopyTextButtonSchema = z
  .object({
    text: z.string().min(1).max(256).meta({
      description: 'The text to be copied to the clipboard; 1-256 characters.',
    }),
  })
  .meta({
    description:
      'This object represents an inline keyboard button that copies specified text to the clipboard.',
  })

export type CopyTextButton = z.infer<typeof CopyTextButtonSchema>

/**
 * A placeholder, currently holds no information.
 *
 * Use BotFather to set up your game.
 *
 * @see https://core.telegram.org/bots/api#callbackgame
 */
export const CallbackGameSchema = z.object({}).meta({
  description:
    'A placeholder, currently holds no information. Use BotFather to set up your game.',
})

export type CallbackGame = z.infer<typeof CallbackGameSchema>

/**
 * This object represents an inline keyboard button.
 *
 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
 */
export const InlineKeyboardButtonSchema = z
  .object({
    text: z.string().meta({ description: 'Label text on the button.' }),
    url: z.url().optional().meta({
      description:
        'HTTP or tg:// URL to be opened when the button is pressed. Links `tg://user?id=<user_id>` can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings.',
    }),
    callback_data: z.string().min(1).max(64).optional().meta({
      description:
        'Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes.',
    }),
    web_app: WebAppInfoSchema.optional().meta({
      description:
        'Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a Telegram Business account. See https://core.telegram.org/bots/webapps',
    }),
    login_url: LoginUrlSchema.optional().meta({
      description:
        'An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. See https://core.telegram.org/bots/api#loginurl',
    }),
    switch_inline_query: z.string().optional().meta({
      description:
        "If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent on behalf of a Telegram Business account.",
    }),
    switch_inline_query_current_chat: z.string().optional().meta({
      description:
        "If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.",
    }),
    switch_inline_query_chosen_chat:
      SwitchInlineQueryChosenChatSchema.optional().meta({
        description:
          "If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent on behalf of a Telegram Business account.",
      }),
    copy_text: CopyTextButtonSchema.optional().meta({
      description:
        'Description of the button that copies the specified text to the clipboard.',
    }),
    callback_game: CallbackGameSchema.optional().meta({
      description:
        'Description of the game that will be launched when the user presses the button. **NOTE:** This type of button must always be the first button in the first row.',
    }),
    pay: z.boolean().optional().meta({
      description:
        "Specify `true` to send a Pay button. Substrings `⭐` and `XTR` in the button's text will be replaced with a Telegram Star icon. **NOTE:** This type of button must always be the first button in the first row and can only be used in invoice messages. See https://core.telegram.org/bots/api#payments",
    }),
  })
  .meta({
    description: 'This object represents an inline keyboard button.',
  })

export type InlineKeyboardButton = z.infer<typeof InlineKeyboardButtonSchema>

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 *
 * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
 */
export const InlineKeyboardMarkupSchema = z
  .object({
    inline_keyboard: z.array(z.array(InlineKeyboardButtonSchema)).meta({
      description:
        'Array of button rows, each represented by an Array of InlineKeyboardButton objects.',
    }),
  })
  .meta({
    description:
      'This object represents an inline keyboard that appears right next to the message it belongs to.',
  })

export type InlineKeyboardMarkup = z.infer<typeof InlineKeyboardMarkupSchema>

/**
 * This object defines the criteria used to request a suitable user.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonrequestusers
 */
export const KeyboardButtonRequestUsersSchema = z
  .object({
    request_id: z
      .number()
      .int()
      .meta({ description: 'Identifier of the request.' }),
    user_is_bot: z.boolean().optional().meta({
      description:
        'Pass `true` to request bots, `false` to request regular users. If not specified, no additional restrictions are applied.',
    }),
    user_is_premium: z.boolean().optional().meta({
      description:
        'Pass `true` to request premium users, `false` to request non-premium users. If not specified, no additional restrictions are applied.',
    }),
    max_quantity: z.number().int().min(1).max(10).optional().meta({
      description:
        'The maximum number of users to be selected; 1-10. Defaults to 1.',
    }),
    request_name: z.boolean().optional().meta({
      description: "Pass `true` to request the users' first and last names.",
    }),
    request_username: z
      .boolean()
      .optional()
      .meta({ description: "Pass `true` to request the users' username." }),
    request_photo: z
      .boolean()
      .optional()
      .meta({ description: "Pass `true` to request the users' photos." }),
  })
  .meta({
    description:
      'This object defines the criteria used to request a suitable user.',
  })

export type KeyboardButtonRequestUsers = z.infer<
  typeof KeyboardButtonRequestUsersSchema
>

/**
 * Represents the rights of an administrator in a chat.
 *
 * @see https://core.telegram.org/bots/api#chatadministratorrights
 */
export const ChatAdministratorRightsSchema = z
  .object({
    is_anonymous: z.boolean().meta({
      description: "`true` if the user's presence in the chat is hidden.",
    }),
    can_manage_chat: z.boolean().meta({
      description:
        '`true` if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages and ignore slow mode. Implied by any other administrator privilege.',
    }),
    can_delete_messages: z.boolean().meta({
      description:
        '`true` if the administrator can delete messages of other users.',
    }),
    can_manage_video_chats: z.boolean().meta({
      description: '`true` if the administrator can manage video chats.',
    }),
    can_restrict_members: z.boolean().meta({
      description:
        '`true` if the administrator can restrict, ban or unban chat members, or access supergroup statistics.',
    }),
    can_promote_members: z.boolean().meta({
      description:
        '`true` if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user).',
    }),
    can_change_info: z.boolean().meta({
      description:
        '`true` if the user is allowed to change the chat title, photo and other settings.',
    }),
    can_invite_users: z.boolean().meta({
      description:
        '`true` if the user is allowed to invite new users to the chat.',
    }),
    can_post_stories: z.boolean().meta({
      description: '`true` if the administrator can post stories to the chat.',
    }),
    can_edit_stories: z.boolean().meta({
      description:
        "`true` if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive.",
    }),
    can_delete_stories: z.boolean().meta({
      description:
        '`true` if the administrator can delete stories posted by other users.',
    }),
    can_post_messages: z.boolean().optional().meta({
      description:
        '`true` if the administrator can post messages in the channel, or access channel statistics; for channels only.',
    }),
    can_edit_messages: z.boolean().optional().meta({
      description:
        '`true` if the administrator can edit messages of other users and can pin messages; for channels only.',
    }),
    can_pin_messages: z.boolean().optional().meta({
      description:
        '`true` if the user is allowed to pin messages; for groups and supergroups only.',
    }),
    can_manage_topics: z.boolean().optional().meta({
      description:
        '`true` if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only.',
    }),
  })
  .meta({
    description: 'Represents the rights of an administrator in a chat.',
  })

export type ChatAdministratorRights = z.infer<
  typeof ChatAdministratorRightsSchema
>

/**
 * This object defines the criteria used to request a suitable chat.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
 */
export const KeyboardButtonRequestChatSchema = z
  .object({
    request_id: z
      .number()
      .int()
      .meta({ description: 'Identifier of the request.' }),
    chat_is_channel: z.boolean().meta({
      description:
        'Pass `true` to request a channel chat, `false` to request a group or supergroup chat.',
    }),
    chat_is_forum: z.boolean().optional().meta({
      description:
        'Pass `true` to request a forum supergroup, `false` to request a non-forum chat. If not specified, no additional restrictions are applied.',
    }),
    chat_has_username: z.boolean().optional().meta({
      description:
        'Pass `true` to request a supergroup or channel with a username, `false` to request a chat without a username. If not specified, no additional restrictions are applied.',
    }),
    chat_is_created: z.boolean().optional().meta({
      description:
        'Pass `true` to request a chat owned by the user. Otherwise, no additional restrictions are applied.',
    }),
    user_administrator_rights: ChatAdministratorRightsSchema.optional().meta({
      description:
        'An object listing the required administrator rights of the user in the chat. The rights must be a superset of `bot_administrator_rights`. If not specified, no additional restrictions are applied.',
    }),
    bot_administrator_rights: ChatAdministratorRightsSchema.optional().meta({
      description:
        'An object listing the required administrator rights of the bot in the chat. The rights must be a subset of `user_administrator_rights`. If not specified, no additional restrictions are applied.',
    }),
    bot_is_member: z.boolean().optional().meta({
      description:
        'Pass `true` to request a chat with the bot as a member. Otherwise, no additional restrictions are applied.',
    }),
    request_title: z
      .boolean()
      .optional()
      .meta({ description: "Pass `true` to request the chat's title." }),
    request_username: z
      .boolean()
      .optional()
      .meta({ description: "Pass `true` to request the chat's username." }),
    request_photo: z
      .boolean()
      .optional()
      .meta({ description: "Pass `true` to request the chat's photo." }),
  })
  .meta({
    description:
      'This object defines the criteria used to request a suitable chat.',
  })

export type KeyboardButtonRequestChat = z.infer<
  typeof KeyboardButtonRequestChatSchema
>

/**
 * This object type represents a poll type to be sent when the button is pressed.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
 */
export const KeyboardButtonPollTypeSchema = z
  .object({
    type: z.enum(['quiz', 'regular']).optional().meta({
      description:
        'If `quiz` is passed, the user will be allowed to create only polls in the quiz mode. If `regular` is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.',
    }),
  })
  .meta({
    description:
      'This object type represents a poll type to be sent when the button is pressed.',
  })

export type KeyboardButtonPollType = z.infer<
  typeof KeyboardButtonPollTypeSchema
>

/**
 * This object represents one button of the reply keyboard.
 *
 * @see https://core.telegram.org/bots/api#keyboardbutton
 */
export const KeyboardButtonSchema = z
  .object({
    text: z.string().meta({
      description:
        'Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed.',
    }),
    request_users: KeyboardButtonRequestUsersSchema.optional().meta({
      description:
        'If specified, pressing the button will open a list of suitable users. Tapping on any user will send their identifier to the bot in a "users_shared" service message. Available in private chats only.',
    }),
    request_chat: KeyboardButtonRequestChatSchema.optional().meta({
      description:
        'If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a "chat_shared" service message. Available in private chats only.',
    }),
    request_contact: z.boolean().optional().meta({
      description:
        "If `true`, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.",
    }),
    request_location: z.boolean().optional().meta({
      description:
        "If `true`, the user's current location will be sent when the button is pressed. Available in private chats only.",
    }),
    request_poll: KeyboardButtonPollTypeSchema.optional().meta({
      description:
        'If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only.',
    }),
    web_app: WebAppInfoSchema.optional().meta({
      description:
        'If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a "web_app_data" service message. Available in private chats only.',
    }),
  })
  .meta({
    description: 'This object represents one button of the reply keyboard.',
  })

export type KeyboardButton = z.infer<typeof KeyboardButtonSchema>

/**
 * This object represents a custom keyboard with reply options.
 *
 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
 */
export const ReplyKeyboardMarkupSchema = z
  .object({
    keyboard: z.array(z.array(KeyboardButtonSchema)).meta({
      description:
        'Array of button rows, each represented by an Array of KeyboardButton objects.',
    }),
    is_persistent: z.boolean().optional().meta({
      description:
        'Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to `false`, in which case the custom keyboard can be hidden and opened with a keyboard icon.',
    }),
    resize_keyboard: z.boolean().optional().meta({
      description:
        "Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to `false`, in which case the custom keyboard is always of the same height as the app's standard keyboard.",
    }),
    one_time_keyboard: z.boolean().optional().meta({
      description:
        "Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to `false`.",
    }),
    input_field_placeholder: z.string().min(1).max(64).optional().meta({
      description:
        'The placeholder to be shown in the input field when the keyboard is active; 1-64 characters.',
    }),
    selective: z.boolean().optional().meta({
      description:
        "Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard.",
    }),
  })
  .meta({
    description: 'This object represents a custom keyboard with reply options.',
  })

export type ReplyKeyboardMarkup = z.infer<typeof ReplyKeyboardMarkupSchema>

/**
 * Upon receiving a message with this object, Telegram clients will remove
 * the current custom keyboard and display the default letter-keyboard.
 *
 * @see https://core.telegram.org/bots/api#replykeyboardremove
 */
export const ReplyKeyboardRemoveSchema = z
  .object({
    remove_keyboard: z.literal(true).meta({
      description:
        'Requests clients to remove the custom keyboard (user will not be able to summon this keyboard). If you want to hide the keyboard from sight but keep it accessible, use `one_time_keyboard` in ReplyKeyboardMarkup.',
    }),
    selective: z.boolean().optional().meta({
      description:
        "Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.",
    }),
  })
  .meta({
    description:
      'Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard.',
  })

export type ReplyKeyboardRemove = z.infer<typeof ReplyKeyboardRemoveSchema>

/**
 * Upon receiving a message with this object, Telegram clients will display
 * a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply').
 *
 * This can be extremely useful if you want to create user-friendly step-by-step interfaces
 * without having to sacrifice privacy mode.
 * Not supported in channels and for messages sent on behalf of a Telegram Business account.
 *
 * @see https://core.telegram.org/bots/api#forcereply
 */
export const ForceReplySchema = z
  .object({
    force_reply: z.literal(true).meta({
      description:
        "Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply'.",
    }),
    input_field_placeholder: z.string().min(1).max(64).optional().meta({
      description:
        'The placeholder to be shown in the input field when the reply is active; 1-64 characters.',
    }),
    selective: z.boolean().optional().meta({
      description:
        "Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.",
    }),
  })
  .meta({
    description:
      "Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Not supported in channels and for messages sent on behalf of a Telegram Business account.",
  })

export type ForceReply = z.infer<typeof ForceReplySchema>

/**
 * Union type for all reply markup options.
 *
 * Additional interface options for messages. Can be:
 * - An inline keyboard
 * - A custom reply keyboard
 * - Instructions to remove a reply keyboard
 * - Instructions to force a reply from the user
 */
export const ReplyMarkupSchema = z.union([
  InlineKeyboardMarkupSchema,
  ReplyKeyboardMarkupSchema,
  ReplyKeyboardRemoveSchema,
  ForceReplySchema,
])

export type ReplyMarkup = z.infer<typeof ReplyMarkupSchema>

/**
 * Describes data sent from a Web App to the bot.
 *
 * @see https://core.telegram.org/bots/api#webappdata
 */
export const WebAppDataSchema = z
  .object({
    data: z.string().meta({
      description:
        'The data. Be aware that a bad client can send arbitrary data in this field.',
    }),
    button_text: z.string().meta({
      description:
        'Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field.',
    }),
  })
  .meta({
    description: 'Describes data sent from a Web App to the bot.',
  })

export type WebAppData = z.infer<typeof WebAppDataSchema>

/**
 * This object represents a point on the map.
 *
 * @see https://core.telegram.org/bots/api#location
 */
export const LocationSchema = z
  .object({
    latitude: z.number().meta({
      description: 'Latitude as defined by the sender.',
    }),
    longitude: z.number().meta({
      description: 'Longitude as defined by the sender.',
    }),
    horizontal_accuracy: z.number().min(0).max(1500).optional().meta({
      description:
        'The radius of uncertainty for the location, measured in meters; 0-1500.',
    }),
    live_period: z.number().int().positive().optional().meta({
      description:
        'Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only.',
    }),
    heading: z.number().int().min(1).max(360).optional().meta({
      description:
        'The direction in which user is moving, in degrees; 1-360. For active live locations only.',
    }),
    proximity_alert_radius: z.number().int().positive().optional().meta({
      description:
        'The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only.',
    }),
  })
  .meta({
    description: 'This object represents a point on the map.',
  })

export type Location = z.infer<typeof LocationSchema>

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 *
 * @see https://core.telegram.org/bots/api#photosize
 */
export const PhotoSizeSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    width: z.number().int().positive().meta({
      description: 'Photo width.',
    }),
    height: z.number().int().positive().meta({
      description: 'Photo height.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description: 'File size in bytes.',
    }),
  })
  .meta({
    description:
      'This object represents one size of a photo or a file / sticker thumbnail.',
  })

export type PhotoSize = z.infer<typeof PhotoSizeSchema>

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 *
 * @see https://core.telegram.org/bots/api#animation
 */
export const AnimationSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    width: z.number().int().positive().meta({
      description: 'Video width as defined by the sender.',
    }),
    height: z.number().int().positive().meta({
      description: 'Video height as defined by the sender.',
    }),
    duration: z.number().int().positive().meta({
      description: 'Duration of the video in seconds as defined by the sender.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Animation thumbnail as defined by the sender.',
    }),
    file_name: z.string().optional().meta({
      description: 'Original animation filename as defined by the sender.',
    }),
    mime_type: z.string().optional().meta({
      description: 'MIME type of the file as defined by the sender.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
  })
  .meta({
    description:
      'This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).',
  })

export type Animation = z.infer<typeof AnimationSchema>

/**
 * This object represents an audio file to be treated as music by the Telegram clients.
 *
 * @see https://core.telegram.org/bots/api#audio
 */
export const AudioSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    duration: z.number().int().positive().meta({
      description: 'Duration of the audio in seconds as defined by the sender.',
    }),
    performer: z.string().optional().meta({
      description:
        'Performer of the audio as defined by the sender or by audio tags.',
    }),
    title: z.string().optional().meta({
      description:
        'Title of the audio as defined by the sender or by audio tags.',
    }),
    file_name: z.string().optional().meta({
      description: 'Original filename as defined by the sender.',
    }),
    mime_type: z.string().optional().meta({
      description: 'MIME type of the file as defined by the sender.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description:
        'Thumbnail of the album cover to which the music file belongs.',
    }),
  })
  .meta({
    description:
      'This object represents an audio file to be treated as music by the Telegram clients.',
  })

export type Audio = z.infer<typeof AudioSchema>

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 *
 * @see https://core.telegram.org/bots/api#document
 */
export const DocumentSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Document thumbnail as defined by the sender.',
    }),
    file_name: z.string().optional().meta({
      description: 'Original filename as defined by the sender.',
    }),
    mime_type: z.string().optional().meta({
      description: 'MIME type of the file as defined by the sender.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
  })
  .meta({
    description:
      'This object represents a general file (as opposed to photos, voice messages and audio files).',
  })

export type Document = z.infer<typeof DocumentSchema>

/**
 * This object represents a video file.
 *
 * @see https://core.telegram.org/bots/api#video
 */
export const VideoSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    width: z.number().int().positive().meta({
      description: 'Video width as defined by the sender.',
    }),
    height: z.number().int().positive().meta({
      description: 'Video height as defined by the sender.',
    }),
    duration: z.number().int().positive().meta({
      description: 'Duration of the video in seconds as defined by the sender.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Video thumbnail.',
    }),
    file_name: z.string().optional().meta({
      description: 'Original filename as defined by the sender.',
    }),
    mime_type: z.string().optional().meta({
      description: 'MIME type of the file as defined by the sender.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
  })
  .meta({
    description: 'This object represents a video file.',
  })

export type Video = z.infer<typeof VideoSchema>

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 *
 * @see https://core.telegram.org/bots/api#videonote
 */
export const VideoNoteSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    length: z.number().int().positive().meta({
      description:
        'Video width and height (diameter of the video message) as defined by the sender.',
    }),
    duration: z.number().int().positive().meta({
      description: 'Duration of the video in seconds as defined by the sender.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Video thumbnail.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description: 'File size in bytes.',
    }),
  })
  .meta({
    description:
      'This object represents a video message (available in Telegram apps as of v.4.0).',
  })

export type VideoNote = z.infer<typeof VideoNoteSchema>

/**
 * This object represents a voice note.
 *
 * @see https://core.telegram.org/bots/api#voice
 */
export const VoiceSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    duration: z.number().int().positive().meta({
      description: 'Duration of the audio in seconds as defined by the sender.',
    }),
    mime_type: z.string().optional().meta({
      description: 'MIME type of the file as defined by the sender.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
  })
  .meta({
    description: 'This object represents a voice note.',
  })

export type Voice = z.infer<typeof VoiceSchema>

/**
 * This object represents a phone contact.
 *
 * @see https://core.telegram.org/bots/api#contact
 */
export const ContactSchema = z
  .object({
    phone_number: z.string().meta({
      description: "Contact's phone number.",
    }),
    first_name: z.string().meta({
      description: "Contact's first name.",
    }),
    last_name: z.string().optional().meta({
      description: "Contact's last name.",
    }),
    user_id: z.number().int().optional().meta({
      description:
        "Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.",
    }),
    vcard: z.string().optional().meta({
      description:
        'Additional data about the contact in the form of a vCard. See https://en.wikipedia.org/wiki/VCard',
    }),
  })
  .meta({
    description: 'This object represents a phone contact.',
  })

export type Contact = z.infer<typeof ContactSchema>

/**
 * This object represents an animated emoji that displays a random value.
 *
 * @see https://core.telegram.org/bots/api#dice
 */
export const DiceSchema = z
  .object({
    emoji: z.string().meta({
      description:
        'Emoji on which the dice throw animation is based. Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰". Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽", and values 1-64 for "🎰".',
    }),
    value: z.number().int().positive().meta({
      description:
        'Value of the dice. 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji, 1-64 for "🎰" base emoji.',
    }),
  })
  .meta({
    description:
      'This object represents an animated emoji that displays a random value.',
  })

export type Dice = z.infer<typeof DiceSchema>

/**
 * This object represents a venue.
 *
 * @see https://core.telegram.org/bots/api#venue
 */
export const VenueSchema = z
  .object({
    location: LocationSchema.meta({
      description: "Venue location. Can't be a live location.",
    }),
    title: z.string().meta({
      description: 'Name of the venue.',
    }),
    address: z.string().meta({
      description: 'Address of the venue.',
    }),
    foursquare_id: z.string().optional().meta({
      description: 'Foursquare identifier of the venue.',
    }),
    foursquare_type: z.string().optional().meta({
      description:
        'Foursquare type of the venue. For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".',
    }),
    google_place_id: z.string().optional().meta({
      description: 'Google Places identifier of the venue.',
    }),
    google_place_type: z.string().optional().meta({
      description:
        'Google Places type of the venue. See https://developers.google.com/places/web-service/supported_types',
    }),
  })
  .meta({
    description: 'This object represents a venue.',
  })

export type Venue = z.infer<typeof VenueSchema>

/**
 * This object represents a story.
 *
 * @see https://core.telegram.org/bots/api#story
 */
export const StorySchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat that posted the story.',
    }),
    id: z.number().int().positive().meta({
      description: 'Unique identifier for the story in the chat.',
    }),
  })
  .meta({
    description: 'This object represents a story.',
  })

export type Story = z.infer<typeof StorySchema>

/**
 * This object describes the position on faces where a mask should be placed by default.
 *
 * @see https://core.telegram.org/bots/api#maskposition
 */
export const MaskPositionSchema = z
  .object({
    point: z.enum(['forehead', 'eyes', 'mouth', 'chin']).meta({
      description:
        'The part of the face relative to which the mask should be placed. One of "forehead", "eyes", "mouth", or "chin".',
    }),
    x_shift: z.number().meta({
      description:
        'Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.',
    }),
    y_shift: z.number().meta({
      description:
        'Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.',
    }),
    scale: z.number().positive().meta({
      description:
        'Mask scaling coefficient. For example, 2.0 means double size.',
    }),
  })
  .meta({
    description:
      'This object describes the position on faces where a mask should be placed by default.',
  })

export type MaskPosition = z.infer<typeof MaskPositionSchema>

/**
 * This object represents a file ready to be downloaded.
 *
 * @see https://core.telegram.org/bots/api#file
 */
export const FileSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    file_size: z.number().int().positive().optional().meta({
      description:
        'File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value.',
    }),
    file_path: z.string().optional().meta({
      description:
        'File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.',
    }),
  })
  .meta({
    description: 'This object represents a file ready to be downloaded.',
  })

export type File = z.infer<typeof FileSchema>

/**
 * This object represents a sticker.
 *
 * @see https://core.telegram.org/bots/api#sticker
 */
export const StickerSchema = z
  .object({
    file_id: z.string().meta({
      description:
        'Identifier for this file, which can be used to download or reuse the file.',
    }),
    file_unique_id: z.string().meta({
      description:
        "Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.",
    }),
    type: z.enum(['regular', 'mask', 'custom_emoji']).meta({
      description:
        'Type of the sticker, currently one of "regular", "mask", "custom_emoji". The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video.',
    }),
    width: z.number().int().positive().meta({
      description: 'Sticker width.',
    }),
    height: z.number().int().positive().meta({
      description: 'Sticker height.',
    }),
    is_animated: z.boolean().meta({
      description: 'True, if the sticker is animated.',
    }),
    is_video: z.boolean().meta({
      description: 'True, if the sticker is a video sticker.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Sticker thumbnail in the .WEBP or .JPG format.',
    }),
    emoji: z.string().optional().meta({
      description: 'Emoji associated with the sticker.',
    }),
    set_name: z.string().optional().meta({
      description: 'Name of the sticker set to which the sticker belongs.',
    }),
    premium_animation: FileSchema.optional().meta({
      description:
        'For premium regular stickers, premium animation for the sticker.',
    }),
    mask_position: MaskPositionSchema.optional().meta({
      description:
        'For mask stickers, the position where the mask should be placed.',
    }),
    custom_emoji_id: z.string().optional().meta({
      description:
        'For custom emoji stickers, unique identifier of the custom emoji.',
    }),
    needs_repainting: z.boolean().optional().meta({
      description:
        'True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places.',
    }),
    file_size: z.number().int().positive().optional().meta({
      description: 'File size in bytes.',
    }),
  })
  .meta({
    description: 'This object represents a sticker.',
  })

export type Sticker = z.infer<typeof StickerSchema>

/**
 * This object represents a sticker set.
 *
 * @see https://core.telegram.org/bots/api#stickerset
 */
export const StickerSetSchema = z
  .object({
    name: z.string().meta({
      description: 'Sticker set name.',
    }),
    title: z.string().meta({
      description: 'Sticker set title.',
    }),
    sticker_type: z.enum(['regular', 'mask', 'custom_emoji']).meta({
      description:
        'Type of stickers in the set, currently one of "regular", "mask", "custom_emoji".',
    }),
    stickers: z.array(StickerSchema).meta({
      description: 'List of all set stickers.',
    }),
    thumbnail: PhotoSizeSchema.optional().meta({
      description: 'Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format.',
    }),
  })
  .meta({
    description: 'This object represents a sticker set.',
  })

export type StickerSet = z.infer<typeof StickerSetSchema>

/**
 * This object represents a game.
 *
 * Use BotFather to create and edit games, their short names will act as unique identifiers.
 *
 * @see https://core.telegram.org/bots/api#game
 */
export const GameSchema = z
  .object({
    title: z.string().meta({
      description: 'Title of the game.',
    }),
    description: z.string().meta({
      description: 'Description of the game.',
    }),
    photo: z.array(PhotoSizeSchema).meta({
      description: 'Photo that will be displayed in the game message in chats.',
    }),
    text: z.string().max(4096).optional().meta({
      description:
        'Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.',
    }),
    text_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'Special entities that appear in text, such as usernames, URLs, bot commands, etc.',
    }),
    animation: AnimationSchema.optional().meta({
      description:
        'Animation that will be displayed in the game message in chats. Upload via @BotFather.',
    }),
  })
  .meta({
    description:
      'This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.',
  })

export type Game = z.infer<typeof GameSchema>

/**
 * This object represents one row of the high scores table for a game.
 *
 * @see https://core.telegram.org/bots/api#gamehighscore
 */
export const GameHighScoreSchema = z
  .object({
    position: z.number().int().positive().meta({
      description: 'Position in high score table for the game.',
    }),
    user: UserSchema.meta({
      description: 'User.',
    }),
    score: z.number().int().meta({
      description: 'Score.',
    }),
  })
  .meta({
    description:
      'This object represents one row of the high scores table for a game.',
  })

export type GameHighScore = z.infer<typeof GameHighScoreSchema>

/**
 * The paid media isn't available before the payment.
 *
 * @see https://core.telegram.org/bots/api#paidmediapreview
 */
export const PaidMediaPreviewSchema = z
  .object({
    type: z.literal('preview').meta({
      description: 'Type of the paid media, always "preview".',
    }),
    width: z.number().int().positive().optional().meta({
      description: 'Media width as defined by the sender.',
    }),
    height: z.number().int().positive().optional().meta({
      description: 'Media height as defined by the sender.',
    }),
    duration: z.number().int().positive().optional().meta({
      description: 'Duration of the media in seconds as defined by the sender.',
    }),
  })
  .meta({
    description: "The paid media isn't available before the payment.",
  })

export type PaidMediaPreview = z.infer<typeof PaidMediaPreviewSchema>

/**
 * The paid media is a photo.
 *
 * @see https://core.telegram.org/bots/api#paidmediaphoto
 */
export const PaidMediaPhotoSchema = z
  .object({
    type: z.literal('photo').meta({
      description: 'Type of the paid media, always "photo".',
    }),
    photo: z.array(PhotoSizeSchema).meta({
      description: 'The photo.',
    }),
  })
  .meta({
    description: 'The paid media is a photo.',
  })

export type PaidMediaPhoto = z.infer<typeof PaidMediaPhotoSchema>

/**
 * The paid media is a video.
 *
 * @see https://core.telegram.org/bots/api#paidmediavideo
 */
export const PaidMediaVideoSchema = z
  .object({
    type: z.literal('video').meta({
      description: 'Type of the paid media, always "video".',
    }),
    video: VideoSchema.meta({
      description: 'The video.',
    }),
  })
  .meta({
    description: 'The paid media is a video.',
  })

export type PaidMediaVideo = z.infer<typeof PaidMediaVideoSchema>

/**
 * This object describes paid media.
 *
 * @see https://core.telegram.org/bots/api#paidmedia
 */
export const PaidMediaSchema = z.discriminatedUnion('type', [
  PaidMediaPreviewSchema,
  PaidMediaPhotoSchema,
  PaidMediaVideoSchema,
])

export type PaidMedia = z.infer<typeof PaidMediaSchema>

/**
 * Describes the paid media added to a message.
 *
 * @see https://core.telegram.org/bots/api#paidmediainfo
 */
export const PaidMediaInfoSchema = z
  .object({
    star_count: z.number().int().nonnegative().meta({
      description:
        'The number of Telegram Stars that must be paid to buy access to the media.',
    }),
    paid_media: z.array(PaidMediaSchema).meta({
      description: 'Information about the paid media.',
    }),
  })
  .meta({
    description: 'Describes the paid media added to a message.',
  })

export type PaidMediaInfo = z.infer<typeof PaidMediaInfoSchema>

/**
 * The message was originally sent by a known user.
 *
 * @see https://core.telegram.org/bots/api#messageoriginuser
 */
export const MessageOriginUserSchema = z
  .object({
    type: z.literal('user').meta({
      description: 'Type of the message origin, always "user".',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the message was sent originally in Unix time.',
    }),
    sender_user: UserSchema.meta({
      description: 'User that sent the message originally.',
    }),
  })
  .meta({
    description: 'The message was originally sent by a known user.',
  })

export type MessageOriginUser = z.infer<typeof MessageOriginUserSchema>

/**
 * The message was originally sent by an unknown user.
 *
 * @see https://core.telegram.org/bots/api#messageoriginhiddenuser
 */
export const MessageOriginHiddenUserSchema = z
  .object({
    type: z.literal('hidden_user').meta({
      description: 'Type of the message origin, always "hidden_user".',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the message was sent originally in Unix time.',
    }),
    sender_user_name: z.string().meta({
      description: 'Name of the user that sent the message originally.',
    }),
  })
  .meta({
    description: 'The message was originally sent by an unknown user.',
  })

export type MessageOriginHiddenUser = z.infer<
  typeof MessageOriginHiddenUserSchema
>

/**
 * The message was originally sent on behalf of a chat to a group chat.
 *
 * @see https://core.telegram.org/bots/api#messageoriginchat
 */
export const MessageOriginChatSchema = z
  .object({
    type: z.literal('chat').meta({
      description: 'Type of the message origin, always "chat".',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the message was sent originally in Unix time.',
    }),
    sender_chat: ChatSchema.meta({
      description: 'Chat that sent the message originally.',
    }),
    author_signature: z.string().optional().meta({
      description:
        'For messages originally sent by an anonymous chat administrator, original message author signature.',
    }),
  })
  .meta({
    description:
      'The message was originally sent on behalf of a chat to a group chat.',
  })

export type MessageOriginChat = z.infer<typeof MessageOriginChatSchema>

/**
 * The message was originally sent to a channel chat.
 *
 * @see https://core.telegram.org/bots/api#messageoriginchannel
 */
export const MessageOriginChannelSchema = z
  .object({
    type: z.literal('channel').meta({
      description: 'Type of the message origin, always "channel".',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the message was sent originally in Unix time.',
    }),
    chat: ChatSchema.meta({
      description: 'Channel chat to which the message was originally sent.',
    }),
    message_id: z.number().int().positive().meta({
      description: 'Unique message identifier inside the chat.',
    }),
    author_signature: z.string().optional().meta({
      description: 'Signature of the original post author.',
    }),
  })
  .meta({
    description: 'The message was originally sent to a channel chat.',
  })

export type MessageOriginChannel = z.infer<typeof MessageOriginChannelSchema>

/**
 * This object describes the origin of a message.
 *
 * @see https://core.telegram.org/bots/api#messageorigin
 */
export const MessageOriginSchema = z.discriminatedUnion('type', [
  MessageOriginUserSchema,
  MessageOriginHiddenUserSchema,
  MessageOriginChatSchema,
  MessageOriginChannelSchema,
])

export type MessageOrigin = z.infer<typeof MessageOriginSchema>

/**
 * Describes reply information for the message.
 *
 * @see https://core.telegram.org/bots/api#textquote
 */
export const TextQuoteSchema = z
  .object({
    text: z.string().meta({
      description:
        'Text of the quoted part of a message that is replied to by the given message.',
    }),
    entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji entities are kept in quotes.',
    }),
    position: z.number().int().nonnegative().meta({
      description:
        'Approximate quote position in the original message in UTF-16 code units as specified by the sender.',
    }),
    is_manual: z.boolean().optional().meta({
      description:
        'True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server.',
    }),
  })
  .meta({
    description: 'Describes reply information for the message.',
  })

export type TextQuote = z.infer<typeof TextQuoteSchema>

/**
 * This object contains information about a message that is being replied to,
 * which may come from another chat or forum topic.
 *
 * @see https://core.telegram.org/bots/api#externalreplyinfo
 */
export const ExternalReplyInfoSchema = z
  .object({
    origin: MessageOriginSchema.meta({
      description: 'Origin of the message replied to by the given message.',
    }),
    chat: ChatSchema.optional().meta({
      description:
        'Chat the original message belongs to. Available only if the chat is a supergroup or a channel.',
    }),
    message_id: z.number().int().positive().optional().meta({
      description:
        'Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel.',
    }),
    link_preview_options: LinkPreviewOptionsSchema.optional().meta({
      description:
        'Options used for link preview generation for the original message, if it is a text message.',
    }),
    animation: AnimationSchema.optional().meta({
      description: 'Message is an animation, information about the animation.',
    }),
    audio: AudioSchema.optional().meta({
      description: 'Message is an audio file, information about the file.',
    }),
    document: DocumentSchema.optional().meta({
      description: 'Message is a general file, information about the file.',
    }),
    paid_media: PaidMediaInfoSchema.optional().meta({
      description:
        'Message contains paid media; information about the paid media.',
    }),
    photo: z.array(PhotoSizeSchema).optional().meta({
      description: 'Message is a photo, available sizes of the photo.',
    }),
    sticker: StickerSchema.optional().meta({
      description: 'Message is a sticker, information about the sticker.',
    }),
    story: StorySchema.optional().meta({
      description: 'Message is a forwarded story.',
    }),
    video: VideoSchema.optional().meta({
      description: 'Message is a video, information about the video.',
    }),
    video_note: VideoNoteSchema.optional().meta({
      description:
        'Message is a video note, information about the video message.',
    }),
    voice: VoiceSchema.optional().meta({
      description: 'Message is a voice message, information about the file.',
    }),
    has_media_spoiler: z.boolean().optional().meta({
      description:
        'True, if the message media is covered by a spoiler animation.',
    }),
    contact: ContactSchema.optional().meta({
      description:
        'Message is a shared contact, information about the contact.',
    }),
    dice: DiceSchema.optional().meta({
      description: 'Message is a dice with random value.',
    }),
    game: GameSchema.optional().meta({
      description: 'Message is a game, information about the game.',
    }),
    giveaway: z
      .lazy(() => GiveawaySchema)
      .optional()
      .meta({
        description:
          'Message is a scheduled giveaway, information about the giveaway.',
      }),
    giveaway_winners: z
      .lazy(() => GiveawayWinnersSchema)
      .optional()
      .meta({
        description: 'A giveaway with public winners was completed.',
      }),
    invoice: z
      .lazy(() => InvoiceSchema)
      .optional()
      .meta({
        description:
          'Message is an invoice for a payment, information about the invoice.',
      }),
    location: LocationSchema.optional().meta({
      description:
        'Message is a shared location, information about the location.',
    }),
    poll: z
      .lazy(() => PollSchema)
      .optional()
      .meta({
        description: 'Message is a native poll, information about the poll.',
      }),
    venue: VenueSchema.optional().meta({
      description: 'Message is a venue, information about the venue.',
    }),
  })
  .meta({
    description:
      'This object contains information about a message that is being replied to, which may come from another chat or forum topic.',
  })

export type ExternalReplyInfo = z.infer<typeof ExternalReplyInfoSchema>

/**
 * This object represents a service message about a change in auto-delete timer settings.
 *
 * @see https://core.telegram.org/bots/api#messageautodeletetimerchanged
 */
export const MessageAutoDeleteTimerChangedSchema = z
  .object({
    message_auto_delete_time: z.number().int().positive().meta({
      description: 'New auto-delete time for messages in the chat; in seconds.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a change in auto-delete timer settings.',
  })

export type MessageAutoDeleteTimerChanged = z.infer<
  typeof MessageAutoDeleteTimerChangedSchema
>

/**
 * This object contains information about a user that was shared with the bot
 * using a KeyboardButtonRequestUsers button.
 *
 * @see https://core.telegram.org/bots/api#shareduser
 */
export const SharedUserSchema = z
  .object({
    user_id: z.number().int().meta({
      description:
        'Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so 64-bit integers or double-precision float types are safe for storing these identifiers. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means.',
    }),
    first_name: z.string().optional().meta({
      description:
        'First name of the user, if the name was requested by the bot.',
    }),
    last_name: z.string().optional().meta({
      description:
        'Last name of the user, if the name was requested by the bot.',
    }),
    username: z.string().optional().meta({
      description:
        'Username of the user, if the username was requested by the bot.',
    }),
    photo: z.array(PhotoSizeSchema).optional().meta({
      description:
        'Available sizes of the chat photo, if the photo was requested by the bot.',
    }),
  })
  .meta({
    description:
      'This object contains information about a user that was shared with the bot using a KeyboardButtonRequestUsers button.',
  })

export type SharedUser = z.infer<typeof SharedUserSchema>

/**
 * This object contains information about the users whose identifiers were shared
 * with the bot using a KeyboardButtonRequestUsers button.
 *
 * @see https://core.telegram.org/bots/api#usersshared
 */
export const UsersSharedSchema = z
  .object({
    request_id: z.number().int().meta({
      description: 'Identifier of the request.',
    }),
    users: z.array(SharedUserSchema).meta({
      description: 'Information about users shared with the bot.',
    }),
  })
  .meta({
    description:
      'This object contains information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button.',
  })

export type UsersShared = z.infer<typeof UsersSharedSchema>

/**
 * This object contains information about a chat that was shared with the bot
 * using a KeyboardButtonRequestChat button.
 *
 * @see https://core.telegram.org/bots/api#chatshared
 */
export const ChatSharedSchema = z
  .object({
    request_id: z.number().int().meta({
      description: 'Identifier of the request.',
    }),
    chat_id: z.number().int().meta({
      description:
        'Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means.',
    }),
    title: z.string().optional().meta({
      description: 'Title of the chat, if the title was requested by the bot.',
    }),
    username: z.string().optional().meta({
      description:
        'Username of the chat, if the username was requested by the bot and available.',
    }),
    photo: z.array(PhotoSizeSchema).optional().meta({
      description:
        'Available sizes of the chat photo, if the photo was requested by the bot.',
    }),
  })
  .meta({
    description:
      'This object contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button.',
  })

export type ChatShared = z.infer<typeof ChatSharedSchema>

/**
 * This object represents a service message about a user allowing a bot
 * to write messages after adding it to the attachment menu, launching a Web App
 * from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.
 *
 * @see https://core.telegram.org/bots/api#writeaccessallowed
 */
export const WriteAccessAllowedSchema = z
  .object({
    from_request: z.boolean().optional().meta({
      description:
        'True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess.',
    }),
    web_app_name: z.string().optional().meta({
      description:
        'Name of the Web App, if the access was granted when the Web App was launched from a link.',
    }),
    from_attachment_menu: z.boolean().optional().meta({
      description:
        'True, if the access was granted when the bot was added to the attachment or side menu.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.',
  })

export type WriteAccessAllowed = z.infer<typeof WriteAccessAllowedSchema>

/**
 * This object represents a service message about a video chat scheduled in the chat.
 *
 * @see https://core.telegram.org/bots/api#videochatscheduled
 */
export const VideoChatScheduledSchema = z
  .object({
    start_date: z.number().int().positive().meta({
      description:
        'Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a video chat scheduled in the chat.',
  })

export type VideoChatScheduled = z.infer<typeof VideoChatScheduledSchema>

/**
 * This object represents a service message about a video chat started in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#videochatstarted
 */
export const VideoChatStartedSchema = z.object({}).meta({
  description:
    'This object represents a service message about a video chat started in the chat. Currently holds no information.',
})

export type VideoChatStarted = z.infer<typeof VideoChatStartedSchema>

/**
 * This object represents a service message about a video chat ended in the chat.
 *
 * @see https://core.telegram.org/bots/api#videochatended
 */
export const VideoChatEndedSchema = z
  .object({
    duration: z.number().int().positive().meta({
      description: 'Video chat duration in seconds.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a video chat ended in the chat.',
  })

export type VideoChatEnded = z.infer<typeof VideoChatEndedSchema>

/**
 * This object represents a service message about new members invited to a video chat.
 *
 * @see https://core.telegram.org/bots/api#videochatparticipantsinvited
 */
export const VideoChatParticipantsInvitedSchema = z
  .object({
    users: z.array(UserSchema).meta({
      description: 'New members that were invited to the video chat.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about new members invited to a video chat.',
  })

export type VideoChatParticipantsInvited = z.infer<
  typeof VideoChatParticipantsInvitedSchema
>

/**
 * This object represents a service message about a forum topic created in the chat.
 *
 * @see https://core.telegram.org/bots/api#forumtopiccreated
 */
export const ForumTopicCreatedSchema = z
  .object({
    name: z.string().meta({
      description: 'Name of the topic.',
    }),
    icon_color: z.number().int().nonnegative().meta({
      description: 'Color of the topic icon in RGB format.',
    }),
    icon_custom_emoji_id: z.string().optional().meta({
      description:
        'Unique identifier of the custom emoji shown as the topic icon.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a forum topic created in the chat.',
  })

export type ForumTopicCreated = z.infer<typeof ForumTopicCreatedSchema>

/**
 * This object represents a service message about a forum topic closed in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#forumtopicclosed
 */
export const ForumTopicClosedSchema = z.object({}).meta({
  description:
    'This object represents a service message about a forum topic closed in the chat. Currently holds no information.',
})

export type ForumTopicClosed = z.infer<typeof ForumTopicClosedSchema>

/**
 * This object represents a service message about an edited forum topic.
 *
 * @see https://core.telegram.org/bots/api#forumtopicedited
 */
export const ForumTopicEditedSchema = z
  .object({
    name: z.string().optional().meta({
      description: 'New name of the topic, if it was edited.',
    }),
    icon_custom_emoji_id: z.string().optional().meta({
      description:
        'New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about an edited forum topic.',
  })

export type ForumTopicEdited = z.infer<typeof ForumTopicEditedSchema>

/**
 * This object represents a service message about a forum topic reopened in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#forumtopicreopened
 */
export const ForumTopicReopenedSchema = z.object({}).meta({
  description:
    'This object represents a service message about a forum topic reopened in the chat. Currently holds no information.',
})

export type ForumTopicReopened = z.infer<typeof ForumTopicReopenedSchema>

/**
 * This object represents a service message about General forum topic hidden in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#generalforumtopichidden
 */
export const GeneralForumTopicHiddenSchema = z.object({}).meta({
  description:
    'This object represents a service message about General forum topic hidden in the chat. Currently holds no information.',
})

export type GeneralForumTopicHidden = z.infer<
  typeof GeneralForumTopicHiddenSchema
>

/**
 * This object represents a service message about General forum topic unhidden in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#generalforumtopicunhidden
 */
export const GeneralForumTopicUnhiddenSchema = z.object({}).meta({
  description:
    'This object represents a service message about General forum topic unhidden in the chat. Currently holds no information.',
})

export type GeneralForumTopicUnhidden = z.infer<
  typeof GeneralForumTopicUnhiddenSchema
>

/**
 * This object contains information about a user that was shared with the bot.
 *
 * @see https://core.telegram.org/bots/api#proximityalerttriggered
 */
export const ProximityAlertTriggeredSchema = z
  .object({
    traveler: UserSchema.meta({
      description: 'User that triggered the alert.',
    }),
    watcher: UserSchema.meta({
      description: 'User that set the alert.',
    }),
    distance: z.number().int().positive().meta({
      description: 'The distance between the users.',
    }),
  })
  .meta({
    description:
      'This object contains information about a user that was shared with the bot.',
  })

export type ProximityAlertTriggered = z.infer<
  typeof ProximityAlertTriggeredSchema
>

/**
 * This object represents the content of a service message, sent whenever a user
 * in the chat triggers a proximity alert set by another user.
 *
 * @see https://core.telegram.org/bots/api#chatboostadded
 */
export const ChatBoostAddedSchema = z
  .object({
    boost_count: z.number().int().positive().meta({
      description: 'Number of boosts added by the user.',
    }),
  })
  .meta({
    description:
      'This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user.',
  })

export type ChatBoostAdded = z.infer<typeof ChatBoostAddedSchema>

/**
 * This object describes the way a background is filled based on the selected colors.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillsolid
 */
export const BackgroundFillSolidSchema = z
  .object({
    type: z.literal('solid').meta({
      description: 'Type of the background fill, always "solid".',
    }),
    color: z.number().int().nonnegative().meta({
      description: 'The color of the background fill in the RGB24 format.',
    }),
  })
  .meta({
    description:
      'This object describes the way a background is filled based on the selected colors.',
  })

export type BackgroundFillSolid = z.infer<typeof BackgroundFillSolidSchema>

/**
 * The background is a gradient fill.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillgradient
 */
export const BackgroundFillGradientSchema = z
  .object({
    type: z.literal('gradient').meta({
      description: 'Type of the background fill, always "gradient".',
    }),
    top_color: z.number().int().nonnegative().meta({
      description: 'Top color of the gradient in the RGB24 format.',
    }),
    bottom_color: z.number().int().nonnegative().meta({
      description: 'Bottom color of the gradient in the RGB24 format.',
    }),
    rotation_angle: z.number().int().min(0).max(359).meta({
      description:
        'Clockwise rotation angle of the background fill in degrees; 0-359.',
    }),
  })
  .meta({
    description: 'The background is a gradient fill.',
  })

export type BackgroundFillGradient = z.infer<
  typeof BackgroundFillGradientSchema
>

/**
 * The background is a freeform gradient that rotates after every message in the chat.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillfreeformgradient
 */
export const BackgroundFillFreeformGradientSchema = z
  .object({
    type: z.literal('freeform_gradient').meta({
      description: 'Type of the background fill, always "freeform_gradient".',
    }),
    colors: z.array(z.number().int().nonnegative()).min(3).max(4).meta({
      description:
        'A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format.',
    }),
  })
  .meta({
    description:
      'The background is a freeform gradient that rotates after every message in the chat.',
  })

export type BackgroundFillFreeformGradient = z.infer<
  typeof BackgroundFillFreeformGradientSchema
>

/**
 * This object describes the way a background is filled.
 *
 * @see https://core.telegram.org/bots/api#backgroundfill
 */
export const BackgroundFillSchema = z.discriminatedUnion('type', [
  BackgroundFillSolidSchema,
  BackgroundFillGradientSchema,
  BackgroundFillFreeformGradientSchema,
])

export type BackgroundFill = z.infer<typeof BackgroundFillSchema>

/**
 * The background is automatically filled based on the selected colors.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypefill
 */
export const BackgroundTypeFillSchema = z
  .object({
    type: z.literal('fill').meta({
      description: 'Type of the background, always "fill".',
    }),
    fill: BackgroundFillSchema.meta({
      description: 'The background fill.',
    }),
    dark_theme_dimming: z.number().int().min(0).max(100).meta({
      description:
        'Dimming of the background in dark themes, as a percentage; 0-100.',
    }),
  })
  .meta({
    description:
      'The background is automatically filled based on the selected colors.',
  })

export type BackgroundTypeFill = z.infer<typeof BackgroundTypeFillSchema>

/**
 * The background is a wallpaper in the JPEG format.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypewallpaper
 */
export const BackgroundTypeWallpaperSchema = z
  .object({
    type: z.literal('wallpaper').meta({
      description: 'Type of the background, always "wallpaper".',
    }),
    document: DocumentSchema.meta({
      description: 'Document with the wallpaper.',
    }),
    dark_theme_dimming: z.number().int().min(0).max(100).meta({
      description:
        'Dimming of the background in dark themes, as a percentage; 0-100.',
    }),
    is_blurred: z.boolean().optional().meta({
      description:
        'True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12.',
    }),
    is_moving: z.boolean().optional().meta({
      description:
        'True, if the background moves slightly when the device is tilted.',
    }),
  })
  .meta({
    description: 'The background is a wallpaper in the JPEG format.',
  })

export type BackgroundTypeWallpaper = z.infer<
  typeof BackgroundTypeWallpaperSchema
>

/**
 * The background is a PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern")
 * pattern to be combined with the background fill chosen by the user.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypepattern
 */
export const BackgroundTypePatternSchema = z
  .object({
    type: z.literal('pattern').meta({
      description: 'Type of the background, always "pattern".',
    }),
    document: DocumentSchema.meta({
      description: 'Document with the pattern.',
    }),
    fill: BackgroundFillSchema.meta({
      description: 'The background fill that is combined with the pattern.',
    }),
    intensity: z.number().int().min(0).max(100).meta({
      description:
        'Intensity of the pattern when it is shown above the filled background; 0-100.',
    }),
    is_inverted: z.boolean().optional().meta({
      description:
        'True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only.',
    }),
    is_moving: z.boolean().optional().meta({
      description:
        'True, if the background moves slightly when the device is tilted.',
    }),
  })
  .meta({
    description:
      'The background is a PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern") pattern to be combined with the background fill chosen by the user.',
  })

export type BackgroundTypePattern = z.infer<typeof BackgroundTypePatternSchema>

/**
 * The background is taken directly from a built-in chat theme.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypechattheme
 */
export const BackgroundTypeChatThemeSchema = z
  .object({
    type: z.literal('chat_theme').meta({
      description: 'Type of the background, always "chat_theme".',
    }),
    theme_name: z.string().meta({
      description: 'Name of the chat theme, which is usually an emoji.',
    }),
  })
  .meta({
    description: 'The background is taken directly from a built-in chat theme.',
  })

export type BackgroundTypeChatTheme = z.infer<
  typeof BackgroundTypeChatThemeSchema
>

/**
 * This object describes the type of a background.
 *
 * @see https://core.telegram.org/bots/api#backgroundtype
 */
export const BackgroundTypeSchema = z.discriminatedUnion('type', [
  BackgroundTypeFillSchema,
  BackgroundTypeWallpaperSchema,
  BackgroundTypePatternSchema,
  BackgroundTypeChatThemeSchema,
])

export type BackgroundType = z.infer<typeof BackgroundTypeSchema>

/**
 * This object represents a chat background.
 *
 * @see https://core.telegram.org/bots/api#chatbackground
 */
export const ChatBackgroundSchema = z
  .object({
    type: BackgroundTypeSchema.meta({
      description: 'Type of the background.',
    }),
  })
  .meta({
    description: 'This object represents a chat background.',
  })

export type ChatBackground = z.infer<typeof ChatBackgroundSchema>

/**
 * This object represents a service message about a new forum topic created in the chat.
 *
 * @see https://core.telegram.org/bots/api#giveawaycreated
 */
export const GiveawayCreatedSchema = z
  .object({
    prize_star_count: z.number().int().nonnegative().optional().meta({
      description:
        'The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about a new forum topic created in the chat.',
  })

export type GiveawayCreated = z.infer<typeof GiveawayCreatedSchema>

/**
 * This object represents a message about a scheduled giveaway.
 *
 * @see https://core.telegram.org/bots/api#giveaway
 */
export const GiveawaySchema = z
  .object({
    chats: z.array(ChatSchema).meta({
      description:
        'The list of chats which the user must join to participate in the giveaway.',
    }),
    winners_selection_date: z.number().int().positive().meta({
      description:
        'Point in time (Unix timestamp) when winners of the giveaway will be selected.',
    }),
    winner_count: z.number().int().positive().meta({
      description:
        'The number of users which are supposed to be selected as winners of the giveaway.',
    }),
    only_new_members: z.boolean().optional().meta({
      description:
        'True, if only users who join the chats after the giveaway started should be eligible to win.',
    }),
    has_public_winners: z.boolean().optional().meta({
      description:
        'True, if the list of giveaway winners will be visible to everyone.',
    }),
    prize_description: z.string().optional().meta({
      description: 'Description of additional giveaway prize.',
    }),
    country_codes: z.array(z.string().length(2)).optional().meta({
      description:
        'A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways.',
    }),
    prize_star_count: z.number().int().nonnegative().optional().meta({
      description:
        'The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.',
    }),
    premium_subscription_month_count: z
      .number()
      .int()
      .positive()
      .optional()
      .meta({
        description:
          'The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only.',
      }),
  })
  .meta({
    description: 'This object represents a message about a scheduled giveaway.',
  })

export type Giveaway = z.infer<typeof GiveawaySchema>

/**
 * This object represents a message about the completion of a giveaway with public winners.
 *
 * @see https://core.telegram.org/bots/api#giveawaywinners
 */
export const GiveawayWinnersSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'The chat that created the giveaway.',
    }),
    giveaway_message_id: z.number().int().positive().meta({
      description: 'Identifier of the message with the giveaway in the chat.',
    }),
    winners_selection_date: z.number().int().positive().meta({
      description:
        'Point in time (Unix timestamp) when winners of the giveaway were selected.',
    }),
    winner_count: z.number().int().positive().meta({
      description: 'Total number of winners in the giveaway.',
    }),
    winners: z.array(UserSchema).max(100).meta({
      description: 'List of up to 100 winners of the giveaway.',
    }),
    additional_chat_count: z.number().int().nonnegative().optional().meta({
      description:
        'The number of other chats the user had to join in order to be eligible for the giveaway.',
    }),
    prize_star_count: z.number().int().nonnegative().optional().meta({
      description:
        'The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only.',
    }),
    premium_subscription_month_count: z
      .number()
      .int()
      .positive()
      .optional()
      .meta({
        description:
          'The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only.',
      }),
    unclaimed_prize_count: z.number().int().nonnegative().optional().meta({
      description: 'Number of undistributed prizes.',
    }),
    only_new_members: z.boolean().optional().meta({
      description:
        'True, if only users who had joined the chats after the giveaway started were eligible to win.',
    }),
    was_refunded: z.boolean().optional().meta({
      description:
        'True, if the giveaway was canceled because the payment for it was refunded.',
    }),
    prize_description: z.string().optional().meta({
      description: 'Description of additional giveaway prize.',
    }),
  })
  .meta({
    description:
      'This object represents a message about the completion of a giveaway with public winners.',
  })

export type GiveawayWinners = z.infer<typeof GiveawayWinnersSchema>

/**
 * This object represents a service message about the completion of a giveaway without public winners.
 *
 * @see https://core.telegram.org/bots/api#giveawaycompleted
 */
export const GiveawayCompletedSchema = z
  .object({
    winner_count: z.number().int().positive().meta({
      description: 'Number of winners in the giveaway.',
    }),
    unclaimed_prize_count: z.number().int().nonnegative().optional().meta({
      description: 'Number of undistributed prizes.',
    }),
    get giveaway_message(): z.ZodOptional<typeof MessageSchema> {
      return MessageSchema.optional()
    },
    is_star_giveaway: z.boolean().optional().meta({
      description:
        'True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway.',
    }),
  })
  .meta({
    description:
      'This object represents a service message about the completion of a giveaway without public winners.',
  })

export type GiveawayCompleted = z.infer<typeof GiveawayCompletedSchema>

/**
 * This object contains basic information about an invoice.
 *
 * @see https://core.telegram.org/bots/api#invoice
 */
export const InvoiceSchema = z
  .object({
    title: z.string().meta({
      description: 'Product name.',
    }),
    description: z.string().meta({
      description: 'Product description.',
    }),
    start_parameter: z.string().meta({
      description:
        'Unique bot deep-linking parameter that can be used to generate this invoice.',
    }),
    currency: z.string().length(3).meta({
      description:
        'Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.',
    }),
    total_amount: z.number().int().positive().meta({
      description:
        'Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).',
    }),
  })
  .meta({
    description: 'This object contains basic information about an invoice.',
  })

export type Invoice = z.infer<typeof InvoiceSchema>

/**
 * This object contains information about an order.
 *
 * @see https://core.telegram.org/bots/api#orderinfo
 */
export const OrderInfoSchema = z
  .object({
    name: z.string().optional().meta({
      description: 'User name.',
    }),
    phone_number: z.string().optional().meta({
      description: "User's phone number.",
    }),
    email: z.string().email().optional().meta({
      description: 'User email.',
    }),
    shipping_address: z
      .lazy(() => ShippingAddressSchema)
      .optional()
      .meta({
        description: 'User shipping address.',
      }),
  })
  .meta({
    description: 'This object contains information about an order.',
  })

export type OrderInfo = z.infer<typeof OrderInfoSchema>

/**
 * This object represents a shipping address.
 *
 * @see https://core.telegram.org/bots/api#shippingaddress
 */
export const ShippingAddressSchema = z
  .object({
    country_code: z.string().length(2).meta({
      description: 'Two-letter ISO 3166-1 alpha-2 country code.',
    }),
    state: z.string().meta({
      description: 'State, if applicable.',
    }),
    city: z.string().meta({
      description: 'City.',
    }),
    street_line1: z.string().meta({
      description: 'First line for the address.',
    }),
    street_line2: z.string().meta({
      description: 'Second line for the address.',
    }),
    post_code: z.string().meta({
      description: 'Address post code.',
    }),
  })
  .meta({
    description: 'This object represents a shipping address.',
  })

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>

/**
 * This object contains basic information about a successful payment.
 *
 * @see https://core.telegram.org/bots/api#successfulpayment
 */
export const SuccessfulPaymentSchema = z
  .object({
    currency: z.string().length(3).meta({
      description:
        'Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.',
    }),
    total_amount: z.number().int().positive().meta({
      description:
        'Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).',
    }),
    invoice_payload: z.string().meta({
      description: 'Bot-specified invoice payload.',
    }),
    subscription_expiration_date: z.number().int().positive().optional().meta({
      description:
        'Expiration date of the subscription; for recurring payment only.',
    }),
    is_first_recurring: z.boolean().optional().meta({
      description:
        'True, if the payment is the first payment for a subscription.',
    }),
    is_recurring: z.boolean().optional().meta({
      description:
        'True, if the payment is recurring; for recurring payment only.',
    }),
    shipping_option_id: z.string().optional().meta({
      description: 'Identifier of the shipping option chosen by the user.',
    }),
    order_info: OrderInfoSchema.optional().meta({
      description: 'Order information provided by the user.',
    }),
    telegram_payment_charge_id: z.string().meta({
      description: 'Telegram payment identifier.',
    }),
    provider_payment_charge_id: z.string().meta({
      description: 'Provider payment identifier.',
    }),
  })
  .meta({
    description:
      'This object contains basic information about a successful payment.',
  })

export type SuccessfulPayment = z.infer<typeof SuccessfulPaymentSchema>

/**
 * This object contains information about a refunded payment.
 *
 * @see https://core.telegram.org/bots/api#refundedpayment
 */
export const RefundedPaymentSchema = z
  .object({
    currency: z.string().length(3).meta({
      description:
        'Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars. Currently, always "XTR".',
    }),
    total_amount: z.number().int().positive().meta({
      description:
        'Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).',
    }),
    invoice_payload: z.string().meta({
      description: 'Bot-specified invoice payload.',
    }),
    telegram_payment_charge_id: z.string().meta({
      description: 'Telegram payment identifier.',
    }),
    provider_payment_charge_id: z.string().optional().meta({
      description: 'Provider payment identifier.',
    }),
  })
  .meta({
    description: 'This object contains information about a refunded payment.',
  })

export type RefundedPayment = z.infer<typeof RefundedPaymentSchema>

/**
 * This object represents an incoming inline query.
 *
 * When the user sends an empty query, your bot could return some default or trending results.
 *
 * @see https://core.telegram.org/bots/api#inlinequery
 */
export const InlineQuerySchema = z
  .object({
    id: z.string().meta({
      description: 'Unique identifier for this query.',
    }),
    from: UserSchema.meta({
      description: 'Sender of the query.',
    }),
    query: z.string().max(256).meta({
      description: 'Text of the query (up to 256 characters).',
    }),
    offset: z.string().meta({
      description:
        'Offset of the results to be returned, can be controlled by the bot.',
    }),
    chat_type: z
      .enum(['sender', 'private', 'group', 'supergroup', 'channel'])
      .optional()
      .meta({
        description:
          'Type of the chat from which the inline query was sent. Can be either `sender` for a private chat with the inline query sender, `private`, `group`, `supergroup`, or `channel`. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat.',
      }),
    location: LocationSchema.optional().meta({
      description: 'Sender location, only for bots that request user location.',
    }),
  })
  .meta({
    description:
      'This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.',
  })

export type InlineQuery = z.infer<typeof InlineQuerySchema>

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 *
 * **Note:** It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates.
 *
 * @see https://core.telegram.org/bots/api#choseninlineresult
 */
export const ChosenInlineResultSchema = z
  .object({
    result_id: z.string().meta({
      description: 'The unique identifier for the result that was chosen.',
    }),
    from: UserSchema.meta({
      description: 'The user that chose the result.',
    }),
    location: LocationSchema.optional().meta({
      description: 'Sender location, only for bots that require user location.',
    }),
    inline_message_id: z.string().optional().meta({
      description:
        'Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message.',
    }),
    query: z.string().meta({
      description: 'The query that was used to obtain the result.',
    }),
  })
  .meta({
    description:
      'Represents a result of an inline query that was chosen by the user and sent to their chat partner. **Note:** It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates.',
  })

export type ChosenInlineResult = z.infer<typeof ChosenInlineResultSchema>

/**
 * This object contains information about an incoming shipping query.
 *
 * @see https://core.telegram.org/bots/api#shippingquery
 */
export const ShippingQuerySchema = z
  .object({
    id: z.string().meta({
      description: 'Unique query identifier.',
    }),
    from: UserSchema.meta({
      description: 'User who sent the query.',
    }),
    invoice_payload: z.string().meta({
      description: 'Bot-specified invoice payload.',
    }),
    shipping_address: ShippingAddressSchema.meta({
      description: 'User specified shipping address.',
    }),
  })
  .meta({
    description:
      'This object contains information about an incoming shipping query.',
  })

export type ShippingQuery = z.infer<typeof ShippingQuerySchema>

/**
 * This object contains information about an incoming pre-checkout query.
 *
 * @see https://core.telegram.org/bots/api#precheckoutquery
 */
export const PreCheckoutQuerySchema = z
  .object({
    id: z.string().meta({
      description: 'Unique query identifier.',
    }),
    from: UserSchema.meta({
      description: 'User who sent the query.',
    }),
    currency: z.string().length(3).meta({
      description:
        'Three-letter ISO 4217 currency code, or `XTR` for payments in Telegram Stars.',
    }),
    total_amount: z.number().int().positive().meta({
      description:
        'Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See https://core.telegram.org/bots/payments#supported-currencies',
    }),
    invoice_payload: z.string().meta({
      description: 'Bot-specified invoice payload.',
    }),
    shipping_option_id: z.string().optional().meta({
      description: 'Identifier of the shipping option chosen by the user.',
    }),
    order_info: OrderInfoSchema.optional().meta({
      description: 'Order information provided by the user.',
    }),
  })
  .meta({
    description:
      'This object contains information about an incoming pre-checkout query.',
  })

export type PreCheckoutQuery = z.infer<typeof PreCheckoutQuerySchema>

/**
 * This object contains information about one answer option in a poll.
 *
 * @see https://core.telegram.org/bots/api#polloption
 */
export const PollOptionSchema = z
  .object({
    text: z.string().min(1).max(100).meta({
      description: 'Option text, 1-100 characters.',
    }),
    text_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts.',
    }),
    voter_count: z.number().int().nonnegative().meta({
      description: 'Number of users that voted for this option.',
    }),
  })
  .meta({
    description:
      'This object contains information about one answer option in a poll.',
  })

export type PollOption = z.infer<typeof PollOptionSchema>

/**
 * This object represents a poll.
 *
 * @see https://core.telegram.org/bots/api#poll
 */
export const PollSchema = z
  .object({
    id: z.string().meta({
      description: 'Unique poll identifier.',
    }),
    question: z.string().min(1).max(300).meta({
      description: 'Poll question, 1-300 characters.',
    }),
    question_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions.',
    }),
    options: z.array(PollOptionSchema).min(2).max(10).meta({
      description: 'List of poll options.',
    }),
    total_voter_count: z.number().int().nonnegative().meta({
      description: 'Total number of users that voted in the poll.',
    }),
    is_closed: z.boolean().meta({
      description: '`true` if the poll is closed.',
    }),
    is_anonymous: z.boolean().meta({
      description: '`true` if the poll is anonymous.',
    }),
    type: z.enum(['regular', 'quiz']).meta({
      description:
        'Poll type. - `regular` - Regular poll - `quiz` - Quiz poll with a correct answer',
    }),
    allows_multiple_answers: z.boolean().meta({
      description: '`true` if the poll allows multiple answers.',
    }),
    correct_option_id: z.number().int().nonnegative().optional().meta({
      description:
        '0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.',
    }),
    explanation: z.string().max(200).optional().meta({
      description:
        'Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters.',
    }),
    explanation_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'Special entities like usernames, URLs, bot commands, etc. that appear in the explanation.',
    }),
    open_period: z.number().int().positive().optional().meta({
      description:
        'Amount of time in seconds the poll will be active after creation.',
    }),
    close_date: z.number().int().positive().optional().meta({
      description:
        'Point in time (Unix timestamp) when the poll will be automatically closed.',
    }),
  })
  .meta({
    description: 'This object represents a poll.',
  })

export type Poll = z.infer<typeof PollSchema>

/**
 * This object represents an answer of a user in a non-anonymous poll.
 *
 * @see https://core.telegram.org/bots/api#pollanswer
 */
export const PollAnswerSchema = z
  .object({
    poll_id: z.string().meta({
      description: 'Unique poll identifier.',
    }),
    voter_chat: ChatSchema.optional().meta({
      description:
        'The chat that changed the answer to the poll, if the voter is anonymous.',
    }),
    user: UserSchema.optional().meta({
      description:
        "The user that changed the answer to the poll, if the voter isn't anonymous.",
    }),
    option_ids: z.array(z.number().int().nonnegative()).meta({
      description:
        '0-based identifiers of chosen answer options. May be empty if the vote was retracted.',
    }),
  })
  .meta({
    description:
      'This object represents an answer of a user in a non-anonymous poll.',
  })

export type PollAnswer = z.infer<typeof PollAnswerSchema>

/**
 * Represents a chat member that owns the chat and has all administrator privileges.
 *
 * @see https://core.telegram.org/bots/api#chatmemberowner
 */
export const ChatMemberOwnerSchema = z
  .object({
    status: z.literal('creator').meta({
      description: "The member's status in the chat, always `creator`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
    is_anonymous: z.boolean().meta({
      description: "`true` if the user's presence in the chat is hidden.",
    }),
    custom_title: z.string().optional().meta({
      description: 'Custom title for this user.',
    }),
  })
  .meta({
    description:
      'Represents a chat member that owns the chat and has all administrator privileges.',
  })

export type ChatMemberOwner = z.infer<typeof ChatMemberOwnerSchema>

/**
 * Represents a chat member that has some additional privileges.
 *
 * @see https://core.telegram.org/bots/api#chatmemberadministrator
 */
export const ChatMemberAdministratorSchema = z
  .object({
    status: z.literal('administrator').meta({
      description: "The member's status in the chat, always `administrator`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
    can_be_edited: z.boolean().meta({
      description:
        '`true` if the bot is allowed to edit administrator privileges of that user.',
    }),
    is_anonymous: z.boolean().meta({
      description: "`true` if the user's presence in the chat is hidden.",
    }),
    can_manage_chat: z.boolean().meta({
      description:
        '`true` if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages and ignore slow mode. Implied by any other administrator privilege.',
    }),
    can_delete_messages: z.boolean().meta({
      description:
        '`true` if the administrator can delete messages of other users.',
    }),
    can_manage_video_chats: z.boolean().meta({
      description: '`true` if the administrator can manage video chats.',
    }),
    can_restrict_members: z.boolean().meta({
      description:
        '`true` if the administrator can restrict, ban or unban chat members, or access supergroup statistics.',
    }),
    can_promote_members: z.boolean().meta({
      description:
        '`true` if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly.',
    }),
    can_change_info: z.boolean().meta({
      description:
        '`true` if the user is allowed to change the chat title, photo and other settings.',
    }),
    can_invite_users: z.boolean().meta({
      description:
        '`true` if the user is allowed to invite new users to the chat.',
    }),
    can_post_stories: z.boolean().meta({
      description: '`true` if the administrator can post stories to the chat.',
    }),
    can_edit_stories: z.boolean().meta({
      description:
        "`true` if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive.",
    }),
    can_delete_stories: z.boolean().meta({
      description:
        '`true` if the administrator can delete stories posted by other users.',
    }),
    can_post_messages: z.boolean().optional().meta({
      description:
        '`true` if the administrator can post messages in the channel, or access channel statistics; for channels only.',
    }),
    can_edit_messages: z.boolean().optional().meta({
      description:
        '`true` if the administrator can edit messages of other users and can pin messages; for channels only.',
    }),
    can_pin_messages: z.boolean().optional().meta({
      description:
        '`true` if the user is allowed to pin messages; for groups and supergroups only.',
    }),
    can_manage_topics: z.boolean().optional().meta({
      description:
        '`true` if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only.',
    }),
    custom_title: z.string().optional().meta({
      description: 'Custom title for this user.',
    }),
  })
  .meta({
    description:
      'Represents a chat member that has some additional privileges.',
  })

export type ChatMemberAdministrator = z.infer<
  typeof ChatMemberAdministratorSchema
>

/**
 * Represents a chat member that has no additional privileges or restrictions.
 *
 * @see https://core.telegram.org/bots/api#chatmembermember
 */
export const ChatMemberMemberSchema = z
  .object({
    status: z.literal('member').meta({
      description: "The member's status in the chat, always `member`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
    until_date: z.number().int().nonnegative().optional().meta({
      description: "Date when the user's subscription will expire; Unix time.",
    }),
  })
  .meta({
    description:
      'Represents a chat member that has no additional privileges or restrictions.',
  })

export type ChatMemberMember = z.infer<typeof ChatMemberMemberSchema>

/**
 * Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 *
 * @see https://core.telegram.org/bots/api#chatmemberrestricted
 */
export const ChatMemberRestrictedSchema = z
  .object({
    status: z.literal('restricted').meta({
      description: "The member's status in the chat, always `restricted`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
    is_member: z.boolean().meta({
      description:
        '`true` if the user is a member of the chat at the moment of the request.',
    }),
    can_send_messages: z.boolean().meta({
      description:
        '`true` if the user is allowed to send text messages, contacts, giveaways, giveaway winners, invoices, locations and venues.',
    }),
    can_send_audios: z.boolean().meta({
      description: '`true` if the user is allowed to send audios.',
    }),
    can_send_documents: z.boolean().meta({
      description: '`true` if the user is allowed to send documents.',
    }),
    can_send_photos: z.boolean().meta({
      description: '`true` if the user is allowed to send photos.',
    }),
    can_send_videos: z.boolean().meta({
      description: '`true` if the user is allowed to send videos.',
    }),
    can_send_video_notes: z.boolean().meta({
      description: '`true` if the user is allowed to send video notes.',
    }),
    can_send_voice_notes: z.boolean().meta({
      description: '`true` if the user is allowed to send voice notes.',
    }),
    can_send_polls: z.boolean().meta({
      description: '`true` if the user is allowed to send polls.',
    }),
    can_send_other_messages: z.boolean().meta({
      description:
        '`true` if the user is allowed to send animations, games, stickers and use inline bots.',
    }),
    can_add_web_page_previews: z.boolean().meta({
      description:
        '`true` if the user is allowed to add web page previews to their messages.',
    }),
    can_change_info: z.boolean().meta({
      description:
        '`true` if the user is allowed to change the chat title, photo and other settings.',
    }),
    can_invite_users: z.boolean().meta({
      description:
        '`true` if the user is allowed to invite new users to the chat.',
    }),
    can_pin_messages: z.boolean().meta({
      description: '`true` if the user is allowed to pin messages.',
    }),
    can_manage_topics: z.boolean().meta({
      description: '`true` if the user is allowed to create forum topics.',
    }),
    until_date: z.number().int().nonnegative().meta({
      description:
        'Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever.',
    }),
  })
  .meta({
    description:
      'Represents a chat member that is under certain restrictions in the chat. Supergroups only.',
  })

export type ChatMemberRestricted = z.infer<typeof ChatMemberRestrictedSchema>

/**
 * Represents a chat member that isn't currently a member of the chat,
 * but may join it themselves.
 *
 * @see https://core.telegram.org/bots/api#chatmemberleft
 */
export const ChatMemberLeftSchema = z
  .object({
    status: z.literal('left').meta({
      description: "The member's status in the chat, always `left`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
  })
  .meta({
    description:
      "Represents a chat member that isn't currently a member of the chat, but may join it themselves.",
  })

export type ChatMemberLeft = z.infer<typeof ChatMemberLeftSchema>

/**
 * Represents a chat member that was banned in the chat
 * and can't return to the chat or view chat messages.
 *
 * @see https://core.telegram.org/bots/api#chatmemberbanned
 */
export const ChatMemberBannedSchema = z
  .object({
    status: z.literal('kicked').meta({
      description: "The member's status in the chat, always `kicked`.",
    }),
    user: UserSchema.meta({
      description: 'Information about the user.',
    }),
    until_date: z.number().int().nonnegative().meta({
      description:
        'Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever.',
    }),
  })
  .meta({
    description:
      "Represents a chat member that was banned in the chat and can't return to the chat or view chat messages.",
  })

export type ChatMemberBanned = z.infer<typeof ChatMemberBannedSchema>

/**
 * This object contains information about one member of a chat.
 *
 * This is a union type of all possible chat member states.
 *
 * @see https://core.telegram.org/bots/api#chatmember
 */
export const ChatMemberSchema = z.discriminatedUnion('status', [
  ChatMemberOwnerSchema,
  ChatMemberAdministratorSchema,
  ChatMemberMemberSchema,
  ChatMemberRestrictedSchema,
  ChatMemberLeftSchema,
  ChatMemberBannedSchema,
])

export type ChatMember = z.infer<typeof ChatMemberSchema>

/**
 * Represents an invite link for a chat.
 *
 * @see https://core.telegram.org/bots/api#chatinvitelink
 */
export const ChatInviteLinkSchema = z
  .object({
    invite_link: z.string().meta({
      description:
        'The invite link. If the link was created by another chat administrator, then the second part will be replaced with "…".',
    }),
    creator: UserSchema.meta({
      description: 'Creator of the link.',
    }),
    creates_join_request: z.boolean().meta({
      description:
        '`true` if users joining the chat via the link need to be approved by chat administrators.',
    }),
    is_primary: z.boolean().meta({
      description: '`true` if the link is primary.',
    }),
    is_revoked: z.boolean().meta({
      description: '`true` if the link is revoked.',
    }),
    name: z.string().optional().meta({
      description: 'Invite link name.',
    }),
    expire_date: z.number().int().positive().optional().meta({
      description:
        'Point in time (Unix timestamp) when the link will expire or has been expired.',
    }),
    member_limit: z.number().int().min(1).max(99999).optional().meta({
      description:
        'The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999.',
    }),
    pending_join_request_count: z.number().int().nonnegative().optional().meta({
      description: 'Number of pending join requests created using this link.',
    }),
    subscription_period: z.number().int().positive().optional().meta({
      description:
        'The number of seconds the subscription will be active for before the next payment.',
    }),
    subscription_price: z.number().int().nonnegative().optional().meta({
      description:
        'The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link.',
    }),
  })
  .meta({
    description: 'Represents an invite link for a chat.',
  })

export type ChatInviteLink = z.infer<typeof ChatInviteLinkSchema>

/**
 * This object represents changes in the status of a chat member.
 *
 * @see https://core.telegram.org/bots/api#chatmemberupdated
 */
export const ChatMemberUpdatedSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat the user belongs to.',
    }),
    from: UserSchema.meta({
      description: 'Performer of the action, which resulted in the change.',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the change was done in Unix time.',
    }),
    old_chat_member: ChatMemberSchema.meta({
      description: 'Previous information about the chat member.',
    }),
    new_chat_member: ChatMemberSchema.meta({
      description: 'New information about the chat member.',
    }),
    invite_link: ChatInviteLinkSchema.optional().meta({
      description:
        'Chat invite link, which was used by the user to join the chat; for joining by invite link events only.',
    }),
    via_join_request: z.boolean().optional().meta({
      description:
        '`true` if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator.',
    }),
    via_chat_folder_invite_link: z.boolean().optional().meta({
      description:
        '`true` if the user joined the chat via a chat folder invite link.',
    }),
  })
  .meta({
    description:
      'This object represents changes in the status of a chat member.',
  })

export type ChatMemberUpdated = z.infer<typeof ChatMemberUpdatedSchema>

/**
 * Represents a join request sent to a chat.
 *
 * @see https://core.telegram.org/bots/api#chatjoinrequest
 */
export const ChatJoinRequestSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat to which the request was sent.',
    }),
    from: UserSchema.meta({
      description: 'User that sent the join request.',
    }),
    user_chat_id: z.number().int().meta({
      description:
        'Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user.',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the request was sent in Unix time.',
    }),
    bio: z.string().optional().meta({
      description: 'Bio of the user.',
    }),
    invite_link: ChatInviteLinkSchema.optional().meta({
      description:
        'Chat invite link that was used by the user to send the join request.',
    }),
  })
  .meta({
    description: 'Represents a join request sent to a chat.',
  })

export type ChatJoinRequest = z.infer<typeof ChatJoinRequestSchema>

/**
 * The reaction is based on an emoji.
 *
 * @see https://core.telegram.org/bots/api#reactiontypeemoji
 */
export const ReactionTypeEmojiSchema = z
  .object({
    type: z.literal('emoji').meta({
      description: 'Type of the reaction, always `emoji`.',
    }),
    emoji: z.string().meta({
      description:
        'Reaction emoji. Currently, it can be one of the following emojis: 👍, 👎, ❤, 🔥, 🥰, 👏, 😁, 🤔, 🤯, 😱, 🤬, 😢, 🎉, 🤩, 🤮, 💩, 🙏, 👌, 🕊, 🤡, 🥱, 🥴, 😍, 🐳, ❤‍🔥, 🌚, 🌭, 💯, 🤣, ⚡, 🍌, 🏆, 💔, 🤨, 😐, 🍓, 🍾, 💋, 🖕, 😈, 😴, 😭, 🤓, 👻, 👨‍💻, 👀, 🎃, 🙈, 😇, 😨, 🤝, ✍, 🤗, 🫡, 🎅, 🎄, ☃, 💅, 🤪, 🗿, 🆒, 💘, 🙉, 🦄, 😘, 💊, 🙊, 😎, 👾, 🤷‍♂, 🤷, 🤷‍♀, 😡',
    }),
  })
  .meta({
    description: 'The reaction is based on an emoji.',
  })

export type ReactionTypeEmoji = z.infer<typeof ReactionTypeEmojiSchema>

/**
 * The reaction is based on a custom emoji.
 *
 * @see https://core.telegram.org/bots/api#reactiontypecustomemoji
 */
export const ReactionTypeCustomEmojiSchema = z
  .object({
    type: z.literal('custom_emoji').meta({
      description: 'Type of the reaction, always `custom_emoji`.',
    }),
    custom_emoji_id: z.string().meta({
      description: 'Custom emoji identifier.',
    }),
  })
  .meta({
    description: 'The reaction is based on a custom emoji.',
  })

export type ReactionTypeCustomEmoji = z.infer<
  typeof ReactionTypeCustomEmojiSchema
>

/**
 * The reaction is paid.
 *
 * @see https://core.telegram.org/bots/api#reactiontypepaid
 */
export const ReactionTypePaidSchema = z
  .object({
    type: z.literal('paid').meta({
      description: 'Type of the reaction, always `paid`.',
    }),
  })
  .meta({
    description: 'The reaction is paid.',
  })

export type ReactionTypePaid = z.infer<typeof ReactionTypePaidSchema>

/**
 * This object describes the type of a reaction.
 *
 * This is a union type of all possible reaction types.
 *
 * @see https://core.telegram.org/bots/api#reactiontype
 */
export const ReactionTypeSchema = z.discriminatedUnion('type', [
  ReactionTypeEmojiSchema,
  ReactionTypeCustomEmojiSchema,
  ReactionTypePaidSchema,
])

export type ReactionType = z.infer<typeof ReactionTypeSchema>

/**
 * Represents a reaction added to a message along with the number of times it was added.
 *
 * @see https://core.telegram.org/bots/api#reactioncount
 */
export const ReactionCountSchema = z
  .object({
    type: ReactionTypeSchema.meta({
      description: 'Type of the reaction.',
    }),
    total_count: z.number().int().nonnegative().meta({
      description: 'Number of times the reaction was added.',
    }),
  })
  .meta({
    description:
      'Represents a reaction added to a message along with the number of times it was added.',
  })

export type ReactionCount = z.infer<typeof ReactionCountSchema>

/**
 * This object represents a change of a reaction on a message performed by a user.
 *
 * @see https://core.telegram.org/bots/api#messagereactionupdated
 */
export const MessageReactionUpdatedSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'The chat containing the message the user reacted to.',
    }),
    message_id: z.number().int().positive().meta({
      description: 'Unique identifier of the message inside the chat.',
    }),
    user: UserSchema.optional().meta({
      description:
        "The user that changed the reaction, if the user isn't anonymous.",
    }),
    actor_chat: ChatSchema.optional().meta({
      description:
        'The chat on behalf of which the reaction was changed, if the user is anonymous.',
    }),
    date: z.number().int().positive().meta({
      description: 'Date of the change in Unix time.',
    }),
    old_reaction: z.array(ReactionTypeSchema).meta({
      description: 'Previous list of reaction types that were set by the user.',
    }),
    new_reaction: z.array(ReactionTypeSchema).meta({
      description: 'New list of reaction types that have been set by the user.',
    }),
  })
  .meta({
    description:
      'This object represents a change of a reaction on a message performed by a user.',
  })

export type MessageReactionUpdated = z.infer<
  typeof MessageReactionUpdatedSchema
>

/**
 * This object represents reaction changes on a message with anonymous reactions.
 *
 * @see https://core.telegram.org/bots/api#messagereactioncountupdated
 */
export const MessageReactionCountUpdatedSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'The chat containing the message.',
    }),
    message_id: z.number().int().positive().meta({
      description: 'Unique identifier of the message inside the chat.',
    }),
    date: z.number().int().positive().meta({
      description: 'Date of the change in Unix time.',
    }),
    reactions: z.array(ReactionCountSchema).meta({
      description: 'List of reactions that are present on the message.',
    }),
  })
  .meta({
    description:
      'This object represents reaction changes on a message with anonymous reactions.',
  })

export type MessageReactionCountUpdated = z.infer<
  typeof MessageReactionCountUpdatedSchema
>

/**
 * The boost was obtained by subscribing to Telegram Premium
 * or by gifting a Telegram Premium subscription to another user.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcepremium
 */
export const ChatBoostSourcePremiumSchema = z
  .object({
    source: z.literal('premium').meta({
      description: 'Source of the boost, always `premium`.',
    }),
    user: UserSchema.meta({
      description: 'User that boosted the chat.',
    }),
  })
  .meta({
    description:
      'The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user.',
  })

export type ChatBoostSourcePremium = z.infer<
  typeof ChatBoostSourcePremiumSchema
>

/**
 * The boost was obtained by the creation of Telegram Premium gift codes
 * to boost a chat. Each such code boosts the chat 4 times for the duration
 * of the corresponding Telegram Premium subscription.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcegiftcode
 */
export const ChatBoostSourceGiftCodeSchema = z
  .object({
    source: z.literal('gift_code').meta({
      description: 'Source of the boost, always `gift_code`.',
    }),
    user: UserSchema.meta({
      description: 'User for which the gift code was created.',
    }),
  })
  .meta({
    description:
      'The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription.',
  })

export type ChatBoostSourceGiftCode = z.infer<
  typeof ChatBoostSourceGiftCodeSchema
>

/**
 * The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway.
 * This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription
 * for Telegram Premium giveaways and `prize_star_count / 500` times for one year for Telegram Star giveaways.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcegiveaway
 */
export const ChatBoostSourceGiveawaySchema = z
  .object({
    source: z.literal('giveaway').meta({
      description: 'Source of the boost, always `giveaway`.',
    }),
    giveaway_message_id: z.number().int().nonnegative().meta({
      description:
        "Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet.",
    }),
    user: UserSchema.optional().meta({
      description:
        'User that won the prize in the giveaway if any; for Telegram Premium giveaways only.',
    }),
    prize_star_count: z.number().int().nonnegative().optional().meta({
      description:
        'The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.',
    }),
    is_unclaimed: z.boolean().optional().meta({
      description:
        '`true` if the giveaway was completed, but there was no user to win the prize.',
    }),
  })
  .meta({
    description:
      'The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and `prize_star_count / 500` times for one year for Telegram Star giveaways.',
  })

export type ChatBoostSourceGiveaway = z.infer<
  typeof ChatBoostSourceGiveawaySchema
>

/**
 * This object describes the source of a chat boost.
 *
 * This is a union type of all possible boost sources.
 *
 * @see https://core.telegram.org/bots/api#chatboostsource
 */
export const ChatBoostSourceSchema = z.discriminatedUnion('source', [
  ChatBoostSourcePremiumSchema,
  ChatBoostSourceGiftCodeSchema,
  ChatBoostSourceGiveawaySchema,
])

export type ChatBoostSource = z.infer<typeof ChatBoostSourceSchema>

/**
 * This object contains information about a chat boost.
 *
 * @see https://core.telegram.org/bots/api#chatboost
 */
export const ChatBoostSchema = z
  .object({
    boost_id: z.string().meta({
      description: 'Unique identifier of the boost.',
    }),
    add_date: z.number().int().positive().meta({
      description: 'Point in time (Unix timestamp) when the chat was boosted.',
    }),
    expiration_date: z.number().int().positive().meta({
      description:
        "Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged.",
    }),
    source: ChatBoostSourceSchema.meta({
      description: 'Source of the added boost.',
    }),
  })
  .meta({
    description: 'This object contains information about a chat boost.',
  })

export type ChatBoost = z.infer<typeof ChatBoostSchema>

/**
 * This object represents a boost added to a chat or changed.
 *
 * @see https://core.telegram.org/bots/api#chatboostupdated
 */
export const ChatBoostUpdatedSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat which was boosted.',
    }),
    boost: ChatBoostSchema.meta({
      description: 'Information about the chat boost.',
    }),
  })
  .meta({
    description: 'This object represents a boost added to a chat or changed.',
  })

export type ChatBoostUpdated = z.infer<typeof ChatBoostUpdatedSchema>

/**
 * This object represents a boost removed from a chat.
 *
 * @see https://core.telegram.org/bots/api#chatboostremoved
 */
export const ChatBoostRemovedSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat which was boosted.',
    }),
    boost_id: z.string().meta({
      description: 'Unique identifier of the boost.',
    }),
    remove_date: z.number().int().positive().meta({
      description: 'Point in time (Unix timestamp) when the boost was removed.',
    }),
    source: ChatBoostSourceSchema.meta({
      description: 'Source of the removed boost.',
    }),
  })
  .meta({
    description: 'This object represents a boost removed from a chat.',
  })

export type ChatBoostRemoved = z.infer<typeof ChatBoostRemovedSchema>

/**
 * Describes the connection of the bot with a business account.
 *
 * @see https://core.telegram.org/bots/api#businessconnection
 */
export const BusinessConnectionSchema = z
  .object({
    id: z.string().meta({
      description: 'Unique identifier of the business connection.',
    }),
    user: UserSchema.meta({
      description:
        'Business account user that created the business connection.',
    }),
    user_chat_id: z.number().int().meta({
      description:
        'Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.',
    }),
    date: z.number().int().positive().meta({
      description: 'Date the connection was established in Unix time.',
    }),
    can_reply: z.boolean().meta({
      description:
        '`true` if the bot can act on behalf of the business account in chats that were active in the last 24 hours.',
    }),
    is_enabled: z.boolean().meta({
      description: '`true` if the connection is active.',
    }),
  })
  .meta({
    description: 'Describes the connection of the bot with a business account.',
  })

export type BusinessConnection = z.infer<typeof BusinessConnectionSchema>

/**
 * This object is received when messages are deleted from a connected business account.
 *
 * @see https://core.telegram.org/bots/api#businessmessagesdeleted
 */
export const BusinessMessagesDeletedSchema = z
  .object({
    business_connection_id: z.string().meta({
      description: 'Unique identifier of the business connection.',
    }),
    chat: ChatSchema.meta({
      description:
        'Information about a chat in the business account. The bot may not have access to the chat or the corresponding user.',
    }),
    message_ids: z.array(z.number().int().positive()).meta({
      description:
        'The list of identifiers of deleted messages in the chat of the business account.',
    }),
  })
  .meta({
    description:
      'This object is received when messages are deleted from a connected business account.',
  })

export type BusinessMessagesDeleted = z.infer<
  typeof BusinessMessagesDeletedSchema
>

/**
 * This object contains information about a paid media purchase.
 *
 * @see https://core.telegram.org/bots/api#paidmediapurchased
 */
export const PaidMediaPurchasedSchema = z
  .object({
    from: UserSchema.meta({
      description: 'User who purchased the media.',
    }),
    paid_media_payload: z.string().meta({
      description: 'Bot-specified paid media payload.',
    }),
  })
  .meta({
    description:
      'This object contains information about a paid media purchase.',
  })

export type PaidMediaPurchased = z.infer<typeof PaidMediaPurchasedSchema>

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard.
 *
 * @see https://core.telegram.org/bots/api#callbackquery
 */
export const CallbackQuerySchema = z
  .object({
    id: z.string().meta({
      description: 'Unique identifier for this query.',
    }),
    from: UserSchema.meta({
      description: 'Sender.',
    }),
    message: z
      .lazy(() => MessageSchema)
      .optional()
      .meta({
        description:
          'Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old.',
      }),
    inline_message_id: z.string().optional().meta({
      description:
        'Identifier of the message sent via the bot in inline mode, that originated the query.',
    }),
    chat_instance: z.string().meta({
      description:
        'Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games.',
    }),
    data: z.string().max(64).optional().meta({
      description:
        'Data associated with the callback button. Be aware that the message origin data for the callback can contain more than 64 bytes and the data will be truncated to 64 bytes.',
    }),
    game_short_name: z.string().optional().meta({
      description:
        'Short name of a Game to be returned, serves as the unique identifier for the game.',
    }),
  })
  .meta({
    description:
      'This object represents an incoming callback query from a callback button in an inline keyboard.',
  })

export type CallbackQuery = z.infer<typeof CallbackQuerySchema>

export const MessageSchema = z
  .object({
    message_id: z.number().int().nonnegative().meta({
      description:
        'Unique message identifier inside this chat. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent.',
    }),
    message_thread_id: z.number().int().positive().optional().meta({
      description:
        'Unique identifier of a message thread to which the message belongs; for supergroups only.',
    }),
    from: UserSchema.optional().meta({
      description:
        'Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats.',
    }),
    sender_chat: ChatSchema.optional().meta({
      description:
        "Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or the linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, `from` contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat.",
    }),
    sender_boost_count: z.number().int().nonnegative().optional().meta({
      description:
        'If the sender of the message boosted the chat, the number of boosts added by the user.',
    }),
    sender_business_bot: UserSchema.optional().meta({
      description:
        'The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.',
    }),
    date: z.number().int().positive().meta({
      description:
        'Date the message was sent in Unix time. It is always a positive number, representing a valid date.',
    }),
    business_connection_id: z.string().optional().meta({
      description:
        'Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier.',
    }),
    chat: ChatSchema.meta({
      description: 'Chat the message belongs to.',
    }),
    forward_origin: MessageOriginSchema.optional().meta({
      description:
        'Information about the original message for forwarded messages.',
    }),
    is_topic_message: z.boolean().optional().meta({
      description: '`true` if the message is sent to a forum topic.',
    }),
    is_automatic_forward: z.boolean().optional().meta({
      description:
        '`true` if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message.',
    }),
    get reply_to_message(): z.ZodOptional<typeof MessageSchema> {
      return MessageSchema.optional()
    },
    external_reply: ExternalReplyInfoSchema.optional().meta({
      description:
        'Information about the message that is being replied to, which may come from another chat or forum topic.',
    }),
    quote: TextQuoteSchema.optional().meta({
      description:
        'For replies that quote part of the original message, the quoted part of the message.',
    }),
    reply_to_story: StorySchema.optional().meta({
      description: 'For replies to a story, the original story.',
    }),
    via_bot: UserSchema.optional().meta({
      description: 'Bot through which the message was sent.',
    }),
    edit_date: z.number().int().positive().optional().meta({
      description: 'Date the message was last edited in Unix time.',
    }),
    has_protected_content: z.boolean().optional().meta({
      description: "`true` if the message can't be forwarded.",
    }),
    is_from_offline: z.boolean().optional().meta({
      description:
        '`true` if the message was sent because of a scheduled action, or was sent from the offline send queue.',
    }),
    media_group_id: z.string().optional().meta({
      description:
        'The unique identifier of a media message group this message belongs to.',
    }),
    author_signature: z.string().optional().meta({
      description:
        'Signature of the post author for messages in channels, or the custom title of an anonymous group administrator.',
    }),
    text: z.string().max(4096).optional().meta({
      description: 'For text messages, the actual UTF-8 text of the message.',
    }),
    entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text.',
    }),
    link_preview_options: LinkPreviewOptionsSchema.optional().meta({
      description:
        'Options used for link preview generation for the message, if it is a text message and link preview options were changed.',
    }),
    effect_id: z.string().optional().meta({
      description:
        'Unique identifier of the message effect added to the message.',
    }),
    animation: AnimationSchema.optional().meta({
      description:
        'Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set.',
    }),
    audio: AudioSchema.optional().meta({
      description: 'Message is an audio file, information about the file.',
    }),
    document: DocumentSchema.optional().meta({
      description: 'Message is a general file, information about the file.',
    }),
    paid_media: PaidMediaInfoSchema.optional().meta({
      description:
        'Message contains paid media; information about the paid media.',
    }),
    photo: z.array(PhotoSizeSchema).optional().meta({
      description: 'Message is a photo, available sizes of the photo.',
    }),
    sticker: StickerSchema.optional().meta({
      description: 'Message is a sticker, information about the sticker.',
    }),
    story: StorySchema.optional().meta({
      description: 'Message is a forwarded story.',
    }),
    video: VideoSchema.optional().meta({
      description: 'Message is a video, information about the video.',
    }),
    video_note: VideoNoteSchema.optional().meta({
      description:
        'Message is a video note, information about the video message.',
    }),
    voice: VoiceSchema.optional().meta({
      description: 'Message is a voice message, information about the file.',
    }),
    caption: z.string().max(1024).optional().meta({
      description:
        'Caption for the animation, audio, document, paid media, photo, video or voice.',
    }),
    caption_entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption.',
    }),
    show_caption_above_media: z.boolean().optional().meta({
      description:
        '`true` if the caption must be shown above the message media.',
    }),
    has_media_spoiler: z.boolean().optional().meta({
      description:
        '`true` if the message media is covered by a spoiler animation.',
    }),
    contact: ContactSchema.optional().meta({
      description:
        'Message is a shared contact, information about the contact.',
    }),
    dice: DiceSchema.optional().meta({
      description: 'Message is a dice with random value.',
    }),
    game: GameSchema.optional().meta({
      description: 'Message is a game, information about the game.',
    }),
    poll: PollSchema.optional().meta({
      description: 'Message is a native poll, information about the poll.',
    }),
    venue: VenueSchema.optional().meta({
      description:
        'Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set.',
    }),
    location: LocationSchema.optional().meta({
      description:
        'Message is a shared location, information about the location.',
    }),
    new_chat_members: z.array(UserSchema).optional().meta({
      description:
        'New members that were added to the group or supergroup and information about them (the bot itself may be one of these members).',
    }),
    left_chat_member: UserSchema.optional().meta({
      description:
        'A member was removed from the group, information about them (this member may be the bot itself).',
    }),
    new_chat_title: z.string().optional().meta({
      description: 'A chat title was changed to this value.',
    }),
    new_chat_photo: z.array(PhotoSizeSchema).optional().meta({
      description: 'A chat photo was change to this value.',
    }),
    delete_chat_photo: z.boolean().optional().meta({
      description: 'Service message: the chat photo was deleted.',
    }),
    group_chat_created: z.boolean().optional().meta({
      description: 'Service message: the group has been created.',
    }),
    supergroup_chat_created: z.boolean().optional().meta({
      description:
        "Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.",
    }),
    channel_chat_created: z.boolean().optional().meta({
      description:
        "Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.",
    }),
    message_auto_delete_timer_changed:
      MessageAutoDeleteTimerChangedSchema.optional().meta({
        description:
          'Service message: auto-delete timer settings changed in the chat.',
      }),
    migrate_to_chat_id: z
      .number()
      .int()
      .meta({
        description:
          'The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.',
      })
      .optional(),
    migrate_from_chat_id: z
      .number()
      .int()
      .meta({
        description:
          'The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.',
      })
      .optional(),
    get pinned_message(): z.ZodOptional<typeof MessageSchema> {
      return MessageSchema.optional()
    },
    invoice: InvoiceSchema.optional().meta({
      description:
        'Message is an invoice for a payment, information about the invoice.',
    }),
    successful_payment: SuccessfulPaymentSchema.optional().meta({
      description:
        'Message is a service message about a successful payment, information about the payment.',
    }),
    refunded_payment: RefundedPaymentSchema.optional().meta({
      description:
        'Message is a service message about a refunded payment, information about the payment.',
    }),
    users_shared: UsersSharedSchema.optional().meta({
      description: 'Service message: users were shared with the bot.',
    }),
    chat_shared: ChatSharedSchema.optional().meta({
      description: 'Service message: a chat was shared with the bot.',
    }),
    connected_website: z.url().optional().meta({
      description:
        'The domain name of the website on which the user has logged in.',
    }),
    write_access_allowed: WriteAccessAllowedSchema.optional().meta({
      description:
        'Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.',
    }),
    proximity_alert_triggered: ProximityAlertTriggeredSchema.optional().meta({
      description: 'Service message: a user was shared with the bot.',
    }),
    boost_added: ChatBoostAddedSchema.optional().meta({
      description: 'Service message: user boosted the chat.',
    }),
    chat_background_set: ChatBackgroundSchema.optional().meta({
      description: 'Service message: chat background set.',
    }),
    forum_topic_created: ForumTopicCreatedSchema.optional().meta({
      description: 'Service message: forum topic created.',
    }),
    forum_topic_edited: ForumTopicEditedSchema.optional().meta({
      description: 'Service message: forum topic edited.',
    }),
    forum_topic_closed: ForumTopicClosedSchema.optional().meta({
      description: 'Service message: forum topic closed.',
    }),
    forum_topic_reopened: ForumTopicReopenedSchema.optional().meta({
      description: 'Service message: forum topic reopened.',
    }),
    general_forum_topic_hidden: GeneralForumTopicHiddenSchema.optional().meta({
      description: "Service message: the 'General' forum topic hidden.",
    }),
    general_forum_topic_unhidden:
      GeneralForumTopicUnhiddenSchema.optional().meta({
        description: "Service message: the 'General' forum topic unhidden.",
      }),
    giveaway_created: GiveawayCreatedSchema.optional().meta({
      description: 'Service message: a scheduled giveaway was created.',
    }),
    giveaway: GiveawaySchema.optional().meta({
      description: 'The message is a scheduled giveaway message.',
    }),
    giveaway_winners: GiveawayWinnersSchema.optional().meta({
      description: 'A giveaway with public winners was completed.',
    }),
    giveaway_completed: GiveawayCompletedSchema.optional().meta({
      description:
        'Service message: a giveaway without public winners was completed.',
    }),
    video_chat_scheduled: VideoChatScheduledSchema.optional().meta({
      description: 'Service message: video chat scheduled.',
    }),
    video_chat_started: VideoChatStartedSchema.optional().meta({
      description: 'Service message: video chat started.',
    }),
    video_chat_ended: VideoChatEndedSchema.optional().meta({
      description: 'Service message: video chat ended.',
    }),
    video_chat_participants_invited:
      VideoChatParticipantsInvitedSchema.optional().meta({
        description:
          'Service message: new participants invited to a video chat.',
      }),
    web_app_data: WebAppDataSchema.optional().meta({
      description: 'Service message: data sent by a Web App.',
    }),
    reply_markup: InlineKeyboardMarkupSchema.optional().meta({
      description:
        'Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons.',
    }),
  })
  .meta({
    description: 'This object represents a message.',
  })

export type Message = z.infer<typeof MessageSchema>

/**
 * Type of updates the bot can receive.
 *
 * Used to specify which types of updates you want your bot to receive in `allowedUpdates`.
 *
 * @see https://core.telegram.org/bots/api#update
 * @see https://core.telegram.org/bots/api#setwebhook
 */
export const UpdateTypeSchema = z.enum([
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'business_connection',
  'business_message',
  'edited_business_message',
  'deleted_business_messages',
  'message_reaction',
  'message_reaction_count',
  'inline_query',
  'chosen_inline_result',
  'callback_query',
  'shipping_query',
  'pre_checkout_query',
  'purchased_paid_media',
  'poll',
  'poll_answer',
  'my_chat_member',
  'chat_member',
  'chat_join_request',
  'chat_boost',
  'removed_chat_boost',
])

export type UpdateType = z.infer<typeof UpdateTypeSchema>

/**
 * This object describes a message that was deleted or is otherwise inaccessible to the bot.
 *
 * @see https://core.telegram.org/bots/api#inaccessiblemessage
 */
export const InaccessibleMessageSchema = z
  .object({
    chat: ChatSchema.meta({
      description: 'Chat the message belonged to.',
    }),
    message_id: z.number().int().positive().meta({
      description: 'Unique message identifier inside the chat.',
    }),
    date: z.literal(0).meta({
      description:
        'Always 0. The field can be used to differentiate regular and inaccessible messages.',
    }),
  })
  .meta({
    description:
      'This object describes a message that was deleted or is otherwise inaccessible to the bot.',
  })

export type InaccessibleMessage = z.infer<typeof InaccessibleMessageSchema>

/**
 * This object describes a message that can be inaccessible to the bot.
 *
 * It can be one of:
 * - Message
 * - InaccessibleMessage
 *
 * @see https://core.telegram.org/bots/api#maybeinaccessiblemessage
 */
export const MaybeInaccessibleMessageSchema = z.union([
  MessageSchema,
  InaccessibleMessageSchema,
])

export type MaybeInaccessibleMessage = z.infer<
  typeof MaybeInaccessibleMessageSchema
>

/**
 * This object represents an incoming update.
 *
 * At most one of the optional parameters can be present in any given update.
 *
 * @see https://core.telegram.org/bots/api#update
 */
export const UpdateSchema = z
  .object({
    update_id: z.number().int().positive().meta({
      description:
        "The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially.",
    }),
    message: MessageSchema.optional().meta({
      description:
        'New incoming message of any kind - text, photo, sticker, etc.',
    }),
    edited_message: MessageSchema.optional().meta({
      description:
        'New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot.',
    }),
    channel_post: MessageSchema.optional().meta({
      description:
        'New incoming channel post of any kind - text, photo, sticker, etc.',
    }),
    edited_channel_post: MessageSchema.optional().meta({
      description:
        'New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot.',
    }),
    business_connection: BusinessConnectionSchema.optional().meta({
      description:
        'The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot.',
    }),
    business_message: MessageSchema.optional().meta({
      description: 'New message from a connected business account.',
    }),
    edited_business_message: MessageSchema.optional().meta({
      description:
        'New version of a message from a connected business account.',
    }),
    deleted_business_messages: BusinessMessagesDeletedSchema.optional().meta({
      description: 'Messages were deleted from a connected business account.',
    }),
    message_reaction: MessageReactionUpdatedSchema.optional().meta({
      description:
        "A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify `message_reaction` in the list of `allowed_updates` to receive these updates. The update isn't received for reactions set by bots.",
    }),
    message_reaction_count: MessageReactionCountUpdatedSchema.optional().meta({
      description:
        'Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify `message_reaction_count` in the list of `allowed_updates` to receive these updates. The updates are grouped and can be sent with delay up to a few minutes.',
    }),
    inline_query: InlineQuerySchema.optional().meta({
      description: 'New incoming inline query.',
    }),
    chosen_inline_result: ChosenInlineResultSchema.optional().meta({
      description:
        'The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot.',
    }),
    callback_query: CallbackQuerySchema.optional().meta({
      description: 'New incoming callback query.',
    }),
    shipping_query: ShippingQuerySchema.optional().meta({
      description:
        'New incoming shipping query. Only for invoices with flexible price.',
    }),
    pre_checkout_query: PreCheckoutQuerySchema.optional().meta({
      description:
        'New incoming pre-checkout query. Contains full information about checkout.',
    }),
    purchased_paid_media: PaidMediaPurchasedSchema.optional().meta({
      description:
        'A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat.',
    }),
    poll: PollSchema.optional().meta({
      description:
        'New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot.',
    }),
    poll_answer: PollAnswerSchema.optional().meta({
      description:
        'A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.',
    }),
    my_chat_member: ChatMemberUpdatedSchema.optional().meta({
      description:
        "The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user.",
    }),
    chat_member: ChatMemberUpdatedSchema.optional().meta({
      description:
        "A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify `chat_member` in the list of `allowed_updates` to receive these updates.",
    }),
    chat_join_request: ChatJoinRequestSchema.optional().meta({
      description:
        'A request to join the chat has been sent. The bot must have the `can_invite_users` administrator right in the chat to receive these updates.',
    }),
    chat_boost: ChatBoostUpdatedSchema.optional().meta({
      description:
        'A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates.',
    }),
    removed_chat_boost: ChatBoostRemovedSchema.optional().meta({
      description:
        'A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates.',
    }),
  })
  .meta({
    description:
      'This object represents an incoming update. At most one of the optional parameters can be present in any given update.',
  })

export type Update = z.infer<typeof UpdateSchema>

/**
 * Describes the current status of a webhook.
 *
 * @see https://core.telegram.org/bots/api#webhookinfo
 */
export const WebhookInfoSchema = z
  .object({
    url: z.url().meta({
      description: 'Webhook URL, may be empty if webhook is not set up.',
    }),
    has_custom_certificate: z.boolean().meta({
      description:
        '`true` if a custom certificate was provided for webhook certificate checks.',
    }),
    pending_update_count: z.number().int().nonnegative().meta({
      description: 'Number of updates awaiting delivery.',
    }),
    ip_address: z.string().optional().meta({
      description: 'Currently used webhook IP address.',
    }),
    last_error_date: z.number().int().positive().optional().meta({
      description:
        'Unix time for the most recent error that happened when trying to deliver an update via webhook.',
    }),
    last_error_message: z.string().optional().meta({
      description:
        'Error message in human-readable format for the most recent error.',
    }),
    last_synchronization_error_date: z
      .number()
      .int()
      .positive()
      .optional()
      .meta({
        description:
          'Unix time of the most recent error that happened when trying to synchronize available updates.',
      }),
    max_connections: z.number().int().min(1).max(100).optional().meta({
      description:
        'The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery.',
    }),
    allowed_updates: z.array(UpdateTypeSchema).optional().meta({
      description: 'A list of update types the bot is subscribed to.',
    }),
  })
  .meta({
    description: 'Describes the current status of a webhook.',
  })

export type WebhookInfo = z.infer<typeof WebhookInfoSchema>

/**
 * Parameters for sending a text message via Telegram Bot API.
 *
 * Use this method to send text messages. On success, the sent Message is returned.
 *
 * @see https://core.telegram.org/bots/api#sendmessage
 */
export const SendMessageParamsSchema = z
  .object({
    chat_id: z.union([z.number().int(), z.string()]).meta({
      description:
        'Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).',
    }),
    text: z.string().min(1).max(4096).meta({
      description:
        'Text of the message to be sent, 1-4096 characters after entities parsing. See https://core.telegram.org/bots/api#formatting-options',
    }),
    business_connection_id: z.string().optional().meta({
      description:
        'Unique identifier of the business connection on behalf of which the message will be sent. Use this when your bot is connected to a Telegram Business account. See https://core.telegram.org/bots/api#business-connection',
    }),
    message_thread_id: z.number().int().positive().optional().meta({
      description:
        'Unique identifier for the target message thread (topic) of the forum; for forum supergroups only. See https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups',
    }),
    parse_mode: ParseModeSchema.optional().meta({
      description:
        'Mode for parsing entities in the message text. - `Markdown` - Legacy Markdown-style formatting (limited) - `MarkdownV2` - Extended Markdown-style formatting (recommended) - `HTML` - HTML-style formatting. See https://core.telegram.org/bots/api#formatting-options',
    }),
    entities: z.array(MessageEntitySchema).optional().meta({
      description:
        'A list of special entities that appear in the message text, which can be specified instead of `parse_mode`. Use this for fine-grained control over text formatting. See https://core.telegram.org/bots/api#messageentity',
    }),
    link_preview_options: LinkPreviewOptionsSchema.optional().meta({
      description:
        'Link preview generation options for the message. See https://core.telegram.org/bots/api#linkpreviewoptions',
    }),
    disable_notification: z.boolean().optional().meta({
      description:
        'Sends the message silently. Users will receive a notification with no sound.',
    }),
    protect_content: z.boolean().optional().meta({
      description:
        'Protects the contents of the sent message from forwarding and saving. When enabled, users cannot forward or save the message content.',
    }),
    allow_paid_broadcast: z.boolean().optional().meta({
      description:
        "Pass `true` to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. See https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once",
    }),
    message_effect_id: z.string().optional().meta({
      description:
        'Unique identifier of the message effect to be added to the message; for private chats only. Message effects add animations/reactions to messages.',
    }),
    reply_parameters: ReplyParametersSchema.optional().meta({
      description:
        'Description of the message to reply to. See https://core.telegram.org/bots/api#replyparameters',
    }),
    reply_markup: ReplyMarkupSchema.optional().meta({
      description:
        'Additional interface options. A JSON-serialized object for: An InlineKeyboardMarkup inline keyboard, A ReplyKeyboardMarkup custom reply keyboard, Instructions to ReplyKeyboardRemove remove a reply keyboard, Instructions to ForceReply force a reply from the user. See https://core.telegram.org/bots/api#inlinekeyboardmarkup',
    }),
  })
  .meta({
    description:
      'Parameters for sending a text message via Telegram Bot API. Use this method to send text messages. On success, the sent Message is returned.',
  })

export type SendMessageParams = z.infer<typeof SendMessageParamsSchema>

/**
 * Response data returned after successfully sending a message.
 *
 * Contains the full sent Message object with all its properties.
 *
 * @see https://core.telegram.org/bots/api#message
 */
export const SendMessageDataSchema = MessageSchema

export type SendMessageData = z.infer<typeof SendMessageDataSchema>

/**
 * Parameters for setting a webhook.
 *
 * @see https://core.telegram.org/bots/api#setwebhook
 */
export const SetWebhookParamsSchema = z
  .object({
    url: z.string().url().meta({
      description:
        'HTTPS URL to send updates to. Use an empty string to remove webhook integration.',
    }),
    ip_address: z.string().optional().meta({
      description:
        'The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS.',
    }),
    max_connections: z.number().int().min(1).max(100).optional().meta({
      description:
        'The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40.',
    }),
    allowed_updates: z.array(UpdateTypeSchema).optional().meta({
      description: 'A list of the update types you want your bot to receive.',
    }),
    drop_pending_updates: z.boolean().optional().meta({
      description: 'Pass `true` to drop all pending updates.',
    }),
    secret_token: z.string().min(1).max(256).optional().meta({
      description:
        'A secret token to be sent in a header "X-Telegram-Bot-Api-Secret-Token" in every webhook request, 1-256 characters.',
    }),
  })
  .meta({
    description: 'Parameters for setting a webhook.',
  })

export type SetWebhookParams = z.infer<typeof SetWebhookParamsSchema>

/**
 * Parameters for deleting a webhook.
 *
 * @see https://core.telegram.org/bots/api#deletewebhook
 */
export const DeleteWebhookParamsSchema = z
  .object({
    drop_pending_updates: z.boolean().optional().meta({
      description: 'Pass `true` to drop all pending updates.',
    }),
  })
  .meta({
    description: 'Parameters for deleting a webhook.',
  })

export type DeleteWebhookParams = z.infer<typeof DeleteWebhookParamsSchema>

/**
 * Response data returned from the getMe method.
 *
 * @see https://core.telegram.org/bots/api#getme
 * @see https://core.telegram.org/bots/api#user
 */
export const GetMeDataSchema = UserSchema

export type GetMeData = z.infer<typeof GetMeDataSchema>
