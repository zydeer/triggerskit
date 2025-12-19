/**
 * This object represents a Telegram user or bot.
 *
 * @see https://core.telegram.org/bots/api#user
 */
export type User = {
  /**
   * Unique identifier for this user or bot.
   *
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a 64-bit integer or double-precision float type are safe
   * for storing this identifier.
   */
  id: number
  /**
   * `true` if this user is a bot.
   */
  isBot: boolean
  /**
   * User's or bot's first name.
   */
  firstName: string
  /**
   * User's or bot's last name.
   */
  lastName?: string
  /**
   * User's or bot's username.
   */
  username?: string
  /**
   * [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language.
   */
  languageCode?: string
  /**
   * `true` if this user is a Telegram Premium user.
   */
  isPremium?: boolean
  /**
   * `true` if this user added the bot to the attachment menu.
   */
  addedToAttachmentMenu?: boolean
  /**
   * `true` if the bot can be invited to groups.
   *
   * Returned only in {@link getMe}.
   */
  canJoinGroups?: boolean
  /**
   * `true` if privacy mode is disabled for the bot.
   *
   * Returned only in {@link getMe}.
   *
   * @see https://core.telegram.org/bots/features#privacy-mode
   */
  canReadAllGroupMessages?: boolean
  /**
   * `true` if the bot supports inline queries.
   *
   * Returned only in {@link getMe}.
   *
   * @see https://core.telegram.org/bots/api#inline-mode
   */
  supportsInlineQueries?: boolean
  /**
   * `true` if the bot can be connected to a Telegram Business account to receive its messages.
   *
   * Returned only in {@link getMe}.
   */
  canConnectToBusiness?: boolean
  /**
   * `true` if the bot has a main Web App.
   *
   * Returned only in {@link getMe}.
   *
   * @see https://core.telegram.org/bots/webapps
   */
  hasMainWebApp?: boolean
}

/**
 * This object represents a chat.
 *
 * @see https://core.telegram.org/bots/api#chat
 */
export type Chat = {
  /**
   * Unique identifier for this chat.
   *
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type are
   * safe for storing this identifier.
   */
  id: number
  /**
   * Type of the chat.
   *
   * - `private` - Private chat with a user
   * - `group` - Group chat
   * - `supergroup` - Supergroup chat
   * - `channel` - Channel
   */
  type: 'private' | 'group' | 'supergroup' | 'channel'
  /**
   * Title, for supergroups, channels and group chats.
   */
  title?: string
  /**
   * Username, for private chats, supergroups and channels if available.
   */
  username?: string
  /**
   * First name of the other party in a private chat.
   */
  firstName?: string
  /**
   * Last name of the other party in a private chat.
   */
  lastName?: string
  /**
   * `true` if the supergroup chat is a forum (has topics enabled).
   *
   * @see https://telegram.org/blog/topics-in-groups-collectible-usernames#topics-in-groups
   */
  isForum?: boolean
}

/**
 * This object represents one special entity in a text message.
 * For example, hashtags, usernames, URLs, etc.
 *
 * @see https://core.telegram.org/bots/api#messageentity
 */
export type MessageEntity = {
  /**
   * Type of the message entity.
   *
   * Entities represent special elements within message text.
   *
   * @category Link & Reference
   * - `mention` - User mention (@username)
   * - `hashtag` - Hashtag (#hashtag)
   * - `cashtag` - Cashtag ($USD)
   * - `botCommand` - Bot command (/start@jobs_bot)
   * - `url` - URL (https://telegram.org)
   * - `email` - Email address (do-not-reply@telegram.org)
   * - `phoneNumber` - Phone number (+1-212-555-0123)
   *
   * @category Text Formatting
   * - `bold` - Bold text
   * - `italic` - Italic text
   * - `underline` - Underlined text
   * - `strikethrough` - Strikethrough text
   * - `spoiler` - Hidden text revealed on click
   * - `code` - Inline monospace text
   * - `pre` - Monospace code block
   *
   * @category Special
   * - `blockquote` - Block quotation
   * - `expandableBlockquote` - Collapsed block quotation
   * - `textLink` - Clickable text URLs
   * - `textMention` - Mention for users without usernames
   * - `customEmoji` - Inline custom emoji stickers
   */
  type:
    | 'mention'
    | 'hashtag'
    | 'cashtag'
    | 'botCommand'
    | 'url'
    | 'email'
    | 'phoneNumber'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'spoiler'
    | 'blockquote'
    | 'expandableBlockquote'
    | 'code'
    | 'pre'
    | 'textLink'
    | 'textMention'
    | 'customEmoji'

  /**
   * Offset in [UTF-16 code units](https://core.telegram.org/api/entities#entity-length) to the start of the entity.
   */
  offset: number
  /**
   * Length of the entity in [UTF-16 code units](https://core.telegram.org/api/entities#entity-length).
   */
  length: number
  /**
   * For `textLink` only, URL that will be opened after user taps on the text.
   */
  url?: string
  /**
   * For `textMention` only, the mentioned user.
   */
  user?: User
  /**
   * For `pre` only, the programming language of the entity text.
   */
  language?: string
  /**
   * For `customEmoji` only, unique identifier of the custom emoji.
   *
   * Use {@link https://core.telegram.org/bots/api#getcustomemojistickers getCustomEmojiStickers} to get full information about the sticker.
   */
  customEmojiId?: string
}

/**
 * Describes the options used for link preview generation.
 *
 * @see https://core.telegram.org/bots/api#linkpreviewoptions
 */
export type LinkPreviewOptions = {
  /**
   * `true` if the link preview is disabled.
   */
  isDisabled?: boolean
  /**
   * URL to use for the link preview. If empty, then the first URL found in the message text will be used.
   */
  url?: string
  /**
   * `true` if the media in the link preview is supposed to be shrunk;
   * ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.
   */
  preferSmallMedia?: boolean
  /**
   * `true` if the media in the link preview is supposed to be enlarged;
   * ignored if the URL isn't explicitly specified or media size change isn't supported for the preview.
   */
  preferLargeMedia?: boolean
  /**
   * `true` if the link preview must be shown above the message text;
   * otherwise, the link preview will be shown below the message text.
   */
  showAboveText?: boolean
}

/**
 * Describes reply parameters for the message that is being sent.
 *
 * @see https://core.telegram.org/bots/api#replyparameters
 */
export type ReplyParameters = {
  /**
   * Identifier of the message that will be replied to in the current chat,
   * or in the chat `chatId` if it is specified.
   */
  messageId: number
  /**
   * If the message to be replied to is from a different chat, unique identifier
   * for the chat or username of the channel (in the format `@channelusername`).
   *
   * Not supported for messages sent on behalf of a business account.
   */
  chatId?: number | string
  /**
   * Pass `true` if the message should be sent even if the specified message
   * to be replied to is not found.
   *
   * Always `false` for replies in another chat or forum topic.
   * Always `true` for messages sent on behalf of a business account.
   */
  allowSendingWithoutReply?: boolean
  /**
   * Quoted part of the message to be replied to; 0-1024 characters after entities parsing.
   *
   * The quote must be an exact substring of the message to be replied to,
   * including bold, italic, underline, strikethrough, spoiler, and custom emoji entities.
   * The message will fail to send if the quote isn't found in the original message.
   */
  quote?: string
  /**
   * Mode for parsing entities in the quote.
   *
   * @see https://core.telegram.org/bots/api#formatting-options
   */
  quoteParseMode?: ParseMode
  /**
   * A list of special entities that appear in the quote.
   *
   * It can be specified instead of `quoteParseMode`.
   */
  quoteEntities?: MessageEntity[]
  /**
   * Position of the quote in the original message in UTF-16 code units.
   */
  quotePosition?: number
}

/**
 * This object represents an inline keyboard button.
 *
 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
 */
export type InlineKeyboardButton = {
  /**
   * Label text on the button.
   */
  text: string
  /**
   * HTTP or tg:// URL to be opened when the button is pressed.
   *
   * Links `tg://user?id=<user_id>` can be used to mention a user by their identifier
   * without using a username, if this is allowed by their privacy settings.
   */
  url?: string
  /**
   * Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes.
   */
  callbackData?: string
  /**
   * Description of the Web App that will be launched when the user presses the button.
   *
   * The Web App will be able to send an arbitrary message on behalf of the user
   * using the method answerWebAppQuery.
   *
   * Available only in private chats between a user and the bot.
   * Not supported for messages sent on behalf of a Telegram Business account.
   *
   * @see https://core.telegram.org/bots/webapps
   */
  webApp?: WebAppInfo
  /**
   * An HTTPS URL used to automatically authorize the user.
   *
   * Can be used as a replacement for the Telegram Login Widget.
   *
   * @see https://core.telegram.org/bots/api#loginurl
   */
  loginUrl?: LoginUrl
  /**
   * If set, pressing the button will prompt the user to select one of their chats,
   * open that chat and insert the bot's username and the specified inline query in the input field.
   *
   * May be empty, in which case just the bot's username will be inserted.
   * Not supported for messages sent on behalf of a Telegram Business account.
   */
  switchInlineQuery?: string
  /**
   * If set, pressing the button will insert the bot's username and the specified inline query
   * in the current chat's input field.
   *
   * May be empty, in which case only the bot's username will be inserted.
   */
  switchInlineQueryCurrentChat?: string
  /**
   * If set, pressing the button will prompt the user to select one of their chats of the specified type,
   * open that chat and insert the bot's username and the specified inline query in the input field.
   *
   * Not supported for messages sent on behalf of a Telegram Business account.
   */
  switchInlineQueryChosenChat?: SwitchInlineQueryChosenChat
  /**
   * Description of the button that copies the specified text to the clipboard.
   */
  copyText?: CopyTextButton
  /**
   * Description of the game that will be launched when the user presses the button.
   *
   * **NOTE:** This type of button must always be the first button in the first row.
   */
  callbackGame?: CallbackGame
  /**
   * Specify `true` to send a Pay button.
   * Substrings `⭐` and `XTR` in the button's text will be replaced with a Telegram Star icon.
   *
   * **NOTE:** This type of button must always be the first button in the first row
   * and can only be used in invoice messages.
   *
   * @see https://core.telegram.org/bots/api#payments
   */
  pay?: boolean
}

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 *
 * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
 */
export type InlineKeyboardMarkup = {
  /**
   * Array of button rows, each represented by an Array of {@link InlineKeyboardButton} objects.
   */
  inlineKeyboard: InlineKeyboardButton[][]
}

/**
 * This object represents one button of the reply keyboard.
 *
 * @see https://core.telegram.org/bots/api#keyboardbutton
 */
export type KeyboardButton = {
  /**
   * Text of the button. If none of the optional fields are used,
   * it will be sent as a message when the button is pressed.
   */
  text: string
  /**
   * If specified, pressing the button will open a list of suitable users.
   *
   * Tapping on any user will send their identifier to the bot in a "users_shared" service message.
   * Available in private chats only.
   */
  requestUsers?: KeyboardButtonRequestUsers
  /**
   * If specified, pressing the button will open a list of suitable chats.
   *
   * Tapping on a chat will send its identifier to the bot in a "chat_shared" service message.
   * Available in private chats only.
   */
  requestChat?: KeyboardButtonRequestChat
  /**
   * If `true`, the user's phone number will be sent as a contact when the button is pressed.
   *
   * Available in private chats only.
   */
  requestContact?: boolean
  /**
   * If `true`, the user's current location will be sent when the button is pressed.
   *
   * Available in private chats only.
   */
  requestLocation?: boolean
  /**
   * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
   *
   * Available in private chats only.
   */
  requestPoll?: KeyboardButtonPollType
  /**
   * If specified, the described Web App will be launched when the button is pressed.
   *
   * The Web App will be able to send a "web_app_data" service message.
   * Available in private chats only.
   */
  webApp?: WebAppInfo
}

/**
 * This object represents a custom keyboard with reply options.
 *
 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
 */
export type ReplyKeyboardMarkup = {
  /**
   * Array of button rows, each represented by an Array of {@link KeyboardButton} objects.
   */
  keyboard: KeyboardButton[][]
  /**
   * Requests clients to always show the keyboard when the regular keyboard is hidden.
   *
   * Defaults to `false`, in which case the custom keyboard can be hidden
   * and opened with a keyboard icon.
   */
  isPersistent?: boolean
  /**
   * Requests clients to resize the keyboard vertically for optimal fit
   * (e.g., make the keyboard smaller if there are just two rows of buttons).
   *
   * Defaults to `false`, in which case the custom keyboard is always
   * of the same height as the app's standard keyboard.
   */
  resizeKeyboard?: boolean
  /**
   * Requests clients to hide the keyboard as soon as it's been used.
   *
   * The keyboard will still be available, but clients will automatically display
   * the usual letter-keyboard in the chat - the user can press a special button
   * in the input field to see the custom keyboard again.
   *
   * Defaults to `false`.
   */
  oneTimeKeyboard?: boolean
  /**
   * The placeholder to be shown in the input field when the keyboard is active; 1-64 characters.
   */
  inputFieldPlaceholder?: string
  /**
   * Use this parameter if you want to show the keyboard to specific users only.
   *
   * Targets: 1) users that are @mentioned in the text of the Message object;
   * 2) if the bot's message is a reply to a message in the same chat and forum topic,
   * sender of the original message.
   *
   * Example: A user requests to change the bot's language, bot replies to the request
   * with a keyboard to select the new language. Other users in the group
   * don't see the keyboard.
   */
  selective?: boolean
}

/**
 * Upon receiving a message with this object, Telegram clients will remove
 * the current custom keyboard and display the default letter-keyboard.
 *
 * @see https://core.telegram.org/bots/api#replykeyboardremove
 */
export type ReplyKeyboardRemove = {
  /**
   * Requests clients to remove the custom keyboard
   * (user will not be able to summon this keyboard).
   *
   * If you want to hide the keyboard from sight but keep it accessible,
   * use `oneTimeKeyboard` in {@link ReplyKeyboardMarkup}.
   */
  removeKeyboard: true
  /**
   * Use this parameter if you want to remove the keyboard for specific users only.
   *
   * Targets: 1) users that are @mentioned in the text of the Message object;
   * 2) if the bot's message is a reply to a message in the same chat and forum topic,
   * sender of the original message.
   *
   * Example: A user votes in a poll, bot returns confirmation message in reply
   * to the vote and removes the keyboard for that user, while still showing
   * the keyboard with poll options to users who haven't voted yet.
   */
  selective?: boolean
}

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
export type ForceReply = {
  /**
   * Shows reply interface to the user,
   * as if they manually selected the bot's message and tapped 'Reply'.
   */
  forceReply: true
  /**
   * The placeholder to be shown in the input field when the reply is active; 1-64 characters.
   */
  inputFieldPlaceholder?: string
  /**
   * Use this parameter if you want to force reply from specific users only.
   *
   * Targets: 1) users that are @mentioned in the text of the Message object;
   * 2) if the bot's message is a reply to a message in the same chat and forum topic,
   * sender of the original message.
   */
  selective?: boolean
}

/**
 * Union type for all reply markup options.
 *
 * Additional interface options for messages. Can be:
 * - An inline keyboard
 * - A custom reply keyboard
 * - Instructions to remove a reply keyboard
 * - Instructions to force a reply from the user
 */
export type ReplyMarkup =
  | InlineKeyboardMarkup
  | ReplyKeyboardMarkup
  | ReplyKeyboardRemove
  | ForceReply

/**
 * Contains information about a Web App.
 *
 * @see https://core.telegram.org/bots/api#webappinfo
 */
export type WebAppInfo = {
  /**
   * An HTTPS URL of a Web App to be opened with additional data specified in the Web App.
   *
   * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
   */
  url: string
}

/**
 * This object represents a parameter of the inline keyboard button used to automatically authorize a user.
 *
 * @see https://core.telegram.org/bots/api#loginurl
 */
export type LoginUrl = {
  /**
   * An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed.
   *
   * If the user refuses to provide authorization data, the original URL without information about the user will be opened.
   * The data added is the same as described in Receiving authorization data.
   *
   * **NOTE:** You must always check the hash of the received data to verify the authentication
   * and the integrity of the data as described in Checking authorization.
   */
  url: string
  /**
   * New text of the button in forwarded messages.
   */
  forwardText?: string
  /**
   * Username of a bot, which will be used for user authorization.
   *
   * See Setting up a bot for more details.
   * If not specified, the current bot's username will be assumed.
   * The url's domain must be the same as the domain linked with the bot.
   *
   * @see https://core.telegram.org/widgets/login#setting-up-a-bot
   */
  botUsername?: string
  /**
   * Pass `true` to request the permission for your bot to send messages to the user.
   */
  requestWriteAccess?: boolean
}

/**
 * This object represents an inline button that switches the current user to inline mode
 * in a chosen chat, with an optional default inline query.
 *
 * @see https://core.telegram.org/bots/api#switchinlinequerychosenchat
 */
export type SwitchInlineQueryChosenChat = {
  /**
   * The default inline query to be inserted in the input field.
   * If left empty, only the bot's username will be inserted.
   */
  query?: string
  /**
   * `true` if private chats with users can be chosen.
   */
  allowUserChats?: boolean
  /**
   * `true` if private chats with bots can be chosen.
   */
  allowBotChats?: boolean
  /**
   * `true` if group and supergroup chats can be chosen.
   */
  allowGroupChats?: boolean
  /**
   * `true` if channel chats can be chosen.
   */
  allowChannelChats?: boolean
}

/**
 * This object represents an inline keyboard button that copies specified text to the clipboard.
 *
 * @see https://core.telegram.org/bots/api#copytextbutton
 */
export type CopyTextButton = {
  /**
   * The text to be copied to the clipboard; 1-256 characters.
   */
  text: string
}

/**
 * A placeholder, currently holds no information.
 *
 * Use BotFather to set up your game.
 *
 * @see https://core.telegram.org/bots/api#callbackgame
 */
export type CallbackGame = Record<string, never>

/**
 * This object defines the criteria used to request a suitable user.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonrequestusers
 */
export type KeyboardButtonRequestUsers = {
  /**
   * Identifier of the request.
   */
  requestId: number
  /**
   * Pass `true` to request bots, `false` to request regular users.
   * If not specified, no additional restrictions are applied.
   */
  userIsBot?: boolean
  /**
   * Pass `true` to request premium users, `false` to request non-premium users.
   * If not specified, no additional restrictions are applied.
   */
  userIsPremium?: boolean
  /**
   * The maximum number of users to be selected; 1-10. Defaults to 1.
   */
  maxQuantity?: number
  /**
   * Pass `true` to request the users' first and last names.
   */
  requestName?: boolean
  /**
   * Pass `true` to request the users' username.
   */
  requestUsername?: boolean
  /**
   * Pass `true` to request the users' photos.
   */
  requestPhoto?: boolean
}

/**
 * This object defines the criteria used to request a suitable chat.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonrequestchat
 */
export type KeyboardButtonRequestChat = {
  /**
   * Identifier of the request.
   */
  requestId: number
  /**
   * Pass `true` to request a channel chat, `false` to request a group or supergroup chat.
   */
  chatIsChannel: boolean
  /**
   * Pass `true` to request a forum supergroup, `false` to request a non-forum chat.
   * If not specified, no additional restrictions are applied.
   */
  chatIsForum?: boolean
  /**
   * Pass `true` to request a supergroup or channel with a username, `false` to request a chat without a username.
   * If not specified, no additional restrictions are applied.
   */
  chatHasUsername?: boolean
  /**
   * Pass `true` to request a chat owned by the user. Otherwise, no additional restrictions are applied.
   */
  chatIsCreated?: boolean
  /**
   * An object listing the required administrator rights of the user in the chat.
   * The rights must be a superset of `botAdministratorRights`.
   * If not specified, no additional restrictions are applied.
   */
  userAdministratorRights?: ChatAdministratorRights
  /**
   * An object listing the required administrator rights of the bot in the chat.
   * The rights must be a subset of `userAdministratorRights`.
   * If not specified, no additional restrictions are applied.
   */
  botAdministratorRights?: ChatAdministratorRights
  /**
   * Pass `true` to request a chat with the bot as a member. Otherwise, no additional restrictions are applied.
   */
  botIsMember?: boolean
  /**
   * Pass `true` to request the chat's title.
   */
  requestTitle?: boolean
  /**
   * Pass `true` to request the chat's username.
   */
  requestUsername?: boolean
  /**
   * Pass `true` to request the chat's photo.
   */
  requestPhoto?: boolean
}

/**
 * This object type represents a poll type to be sent when the button is pressed.
 *
 * @see https://core.telegram.org/bots/api#keyboardbuttonpolltype
 */
export type KeyboardButtonPollType = {
  /**
   * If `quiz` is passed, the user will be allowed to create only polls in the quiz mode.
   * If `regular` is passed, only regular polls will be allowed.
   * Otherwise, the user will be allowed to create a poll of any type.
   */
  type?: 'quiz' | 'regular'
}

/**
 * Represents the rights of an administrator in a chat.
 *
 * @see https://core.telegram.org/bots/api#chatadministratorrights
 */
export type ChatAdministratorRights = {
  /**
   * `true` if the user's presence in the chat is hidden.
   */
  isAnonymous: boolean
  /**
   * `true` if the administrator can access the chat event log, get boost list,
   * see hidden supergroup and channel members, report spam messages and ignore slow mode.
   *
   * Implied by any other administrator privilege.
   */
  canManageChat: boolean
  /**
   * `true` if the administrator can delete messages of other users.
   */
  canDeleteMessages: boolean
  /**
   * `true` if the administrator can manage video chats.
   */
  canManageVideoChats: boolean
  /**
   * `true` if the administrator can restrict, ban or unban chat members, or access supergroup statistics.
   */
  canRestrictMembers: boolean
  /**
   * `true` if the administrator can add new administrators with a subset of their own privileges
   * or demote administrators that they have promoted, directly or indirectly
   * (promoted by administrators that were appointed by the user).
   */
  canPromoteMembers: boolean
  /**
   * `true` if the user is allowed to change the chat title, photo and other settings.
   */
  canChangeInfo: boolean
  /**
   * `true` if the user is allowed to invite new users to the chat.
   */
  canInviteUsers: boolean
  /**
   * `true` if the administrator can post stories to the chat.
   */
  canPostStories: boolean
  /**
   * `true` if the administrator can edit stories posted by other users,
   * post stories to the chat page, pin chat stories, and access the chat's story archive.
   */
  canEditStories: boolean
  /**
   * `true` if the administrator can delete stories posted by other users.
   */
  canDeleteStories: boolean
  /**
   * `true` if the administrator can post messages in the channel, or access channel statistics;
   * for channels only.
   */
  canPostMessages?: boolean
  /**
   * `true` if the administrator can edit messages of other users and can pin messages;
   * for channels only.
   */
  canEditMessages?: boolean
  /**
   * `true` if the user is allowed to pin messages; for groups and supergroups only.
   */
  canPinMessages?: boolean
  /**
   * `true` if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only.
   */
  canManageTopics?: boolean
}

/**
 * Describes data sent from a Web App to the bot.
 *
 * @see https://core.telegram.org/bots/api#webappdata
 */
export type WebAppData = {
  /**
   * The data. Be aware that a bad client can send arbitrary data in this field.
   */
  data: string
  /**
   * Text of the web_app keyboard button from which the Web App was opened.
   * Be aware that a bad client can send arbitrary data in this field.
   */
  buttonText: string
}

/**
 * This object represents a message.
 *
 * @see https://core.telegram.org/bots/api#message
 */
export type Message = {
  /**
   * Unique message identifier inside this chat.
   *
   * In specific instances (e.g., message containing a video sent to a big chat),
   * the server might automatically schedule a message instead of sending it immediately.
   * In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent.
   */
  messageId: number
  /**
   * Unique identifier of a message thread to which the message belongs; for supergroups only.
   */
  messageThreadId?: number
  /**
   * Sender of the message; may be empty for messages sent to channels.
   *
   * For backward compatibility, if the message was sent on behalf of a chat,
   * the field contains a fake sender user in non-channel chats.
   */
  from?: User
  /**
   * Sender of the message when sent on behalf of a chat.
   *
   * For example, the supergroup itself for messages sent by its anonymous administrators
   * or the linked channel for messages automatically forwarded to the channel's discussion group.
   * For backward compatibility, `from` contains a fake sender user in non-channel chats,
   * if the message was sent on behalf of a chat.
   */
  senderChat?: Chat
  /**
   * If the sender of the message boosted the chat, the number of boosts added by the user.
   */
  senderBoostCount?: number
  /**
   * The bot that actually sent the message on behalf of the business account.
   *
   * Available only for outgoing messages sent on behalf of the connected business account.
   */
  senderBusinessBot?: User
  /**
   * Date the message was sent in Unix time.
   *
   * It is always a positive number, representing a valid date.
   */
  date: number
  /**
   * Unique identifier of the business connection from which the message was received.
   *
   * If non-empty, the message belongs to a chat of the corresponding business account
   * that is independent from any potential bot chat which might share the same identifier.
   */
  businessConnectionId?: string
  /**
   * Chat the message belongs to.
   */
  chat: Chat
  /**
   * Information about the original message for forwarded messages.
   */
  forwardOrigin?: MessageOrigin
  /**
   * `true` if the message is sent to a forum topic.
   */
  isTopicMessage?: boolean
  /**
   * `true` if the message was sent by an implicit action, for example,
   * as an away or a greeting business message, or as a scheduled message.
   */
  isAutomaticForward?: boolean
  /**
   * For replies in the same chat and message thread, the original message.
   *
   * Note that the Message object in this field will not contain
   * further `replyToMessage` fields even if it itself is a reply.
   */
  replyToMessage?: Message
  /**
   * Information about the message that is being replied to, which may come from
   * another chat or forum topic.
   */
  externalReply?: ExternalReplyInfo
  /**
   * For replies that quote part of the original message, the quoted part of the message.
   */
  quote?: TextQuote
  /**
   * For replies to a story, the original story.
   */
  replyToStory?: Story
  /**
   * Bot through which the message was sent.
   */
  viaBot?: User
  /**
   * Date the message was last edited in Unix time.
   */
  editDate?: number
  /**
   * `true` if the message can't be forwarded.
   */
  hasProtectedContent?: boolean
  /**
   * `true` if the message was sent because of a scheduled action,
   * or was sent from the offline send queue.
   */
  isFromOffline?: boolean
  /**
   * The unique identifier of a media message group this message belongs to.
   */
  mediaGroupId?: string
  /**
   * Signature of the post author for messages in channels,
   * or the custom title of an anonymous group administrator.
   */
  authorSignature?: string
  /**
   * For text messages, the actual UTF-8 text of the message.
   */
  text?: string
  /**
   * For text messages, special entities like usernames, URLs, bot commands, etc.
   * that appear in the text.
   */
  entities?: MessageEntity[]
  /**
   * Options used for link preview generation for the message,
   * if it is a text message and link preview options were changed.
   */
  linkPreviewOptions?: LinkPreviewOptions
  /**
   * Unique identifier of the message effect added to the message.
   */
  effectId?: string
  /**
   * Message is an animation, information about the animation.
   * For backward compatibility, when this field is set, the document field will also be set.
   */
  animation?: Animation
  /**
   * Message is an audio file, information about the file.
   */
  audio?: Audio
  /**
   * Message is a general file, information about the file.
   */
  document?: Document
  /**
   * Message contains paid media; information about the paid media.
   */
  paidMedia?: PaidMediaInfo
  /**
   * Message is a photo, available sizes of the photo.
   */
  photo?: PhotoSize[]
  /**
   * Message is a sticker, information about the sticker.
   */
  sticker?: Sticker
  /**
   * Message is a forwarded story.
   */
  story?: Story
  /**
   * Message is a video, information about the video.
   */
  video?: Video
  /**
   * Message is a video note, information about the video message.
   */
  videoNote?: VideoNote
  /**
   * Message is a voice message, information about the file.
   */
  voice?: Voice
  /**
   * Caption for the animation, audio, document, paid media, photo, video or voice.
   */
  caption?: string
  /**
   * For messages with a caption, special entities like usernames, URLs, bot commands, etc.
   * that appear in the caption.
   */
  captionEntities?: MessageEntity[]
  /**
   * `true` if the caption must be shown above the message media.
   */
  showCaptionAboveMedia?: boolean
  /**
   * `true` if the message media is covered by a spoiler animation.
   */
  hasMediaSpoiler?: boolean
  /**
   * Message is a shared contact, information about the contact.
   */
  contact?: Contact
  /**
   * Message is a dice with random value.
   */
  dice?: Dice
  /**
   * Message is a game, information about the game.
   */
  game?: Game
  /**
   * Message is a native poll, information about the poll.
   */
  poll?: Poll
  /**
   * Message is a venue, information about the venue.
   * For backward compatibility, when this field is set, the location field will also be set.
   */
  venue?: Venue
  /**
   * Message is a shared location, information about the location.
   */
  location?: Location
  /**
   * New members that were added to the group or supergroup and information about them
   * (the bot itself may be one of these members).
   */
  newChatMembers?: User[]
  /**
   * A member was removed from the group, information about them
   * (this member may be the bot itself).
   */
  leftChatMember?: User
  /**
   * A chat title was changed to this value.
   */
  newChatTitle?: string
  /**
   * A chat photo was change to this value.
   */
  newChatPhoto?: PhotoSize[]
  /**
   * Service message: the chat photo was deleted.
   */
  deleteChatPhoto?: boolean
  /**
   * Service message: the group has been created.
   */
  groupChatCreated?: boolean
  /**
   * Service message: the supergroup has been created.
   * This field can't be received in a message coming through updates,
   * because bot can't be a member of a supergroup when it is created.
   * It can only be found in replyToMessage if someone replies to a very
   * first message in a directly created supergroup.
   */
  supergroupChatCreated?: boolean
  /**
   * Service message: the channel has been created.
   * This field can't be received in a message coming through updates,
   * because bot can't be a member of a channel when it is created.
   * It can only be found in replyToMessage if someone replies to a very
   * first message in a channel.
   */
  channelChatCreated?: boolean
  /**
   * Service message: auto-delete timer settings changed in the chat.
   */
  messageAutoDeleteTimerChanged?: MessageAutoDeleteTimerChanged
  /**
   * The group has been migrated to a supergroup with the specified identifier.
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this identifier.
   */
  migrateToChatId?: number
  /**
   * The supergroup has been migrated from a group with the specified identifier.
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this identifier.
   */
  migrateFromChatId?: number
  /**
   * Specified message was pinned.
   * Note that the Message object in this field will not contain further
   * replyToMessage fields even if it itself is a reply.
   */
  pinnedMessage?: Message
  /**
   * Message is an invoice for a payment, information about the invoice.
   */
  invoice?: Invoice
  /**
   * Message is a service message about a successful payment, information about the payment.
   */
  successfulPayment?: SuccessfulPayment
  /**
   * Message is a service message about a refunded payment, information about the payment.
   */
  refundedPayment?: RefundedPayment
  /**
   * Service message: users were shared with the bot.
   */
  usersShared?: UsersShared
  /**
   * Service message: a chat was shared with the bot.
   */
  chatShared?: ChatShared
  /**
   * The domain name of the website on which the user has logged in.
   */
  connectedWebsite?: string
  /**
   * Service message: the user allowed the bot to write messages after adding it
   * to the attachment or side menu, launching a Web App from a link,
   * or accepting an explicit request from a Web App sent by the method requestWriteAccess.
   */
  writeAccessAllowed?: WriteAccessAllowed
  /**
   * Service message: a user was shared with the bot.
   */
  proximityAlertTriggered?: ProximityAlertTriggered
  /**
   * Service message: user boosted the chat.
   */
  boostAdded?: ChatBoostAdded
  /**
   * Service message: chat background set.
   */
  chatBackgroundSet?: ChatBackground
  /**
   * Service message: forum topic created.
   */
  forumTopicCreated?: ForumTopicCreated
  /**
   * Service message: forum topic edited.
   */
  forumTopicEdited?: ForumTopicEdited
  /**
   * Service message: forum topic closed.
   */
  forumTopicClosed?: ForumTopicClosed
  /**
   * Service message: forum topic reopened.
   */
  forumTopicReopened?: ForumTopicReopened
  /**
   * Service message: the 'General' forum topic hidden.
   */
  generalForumTopicHidden?: GeneralForumTopicHidden
  /**
   * Service message: the 'General' forum topic unhidden.
   */
  generalForumTopicUnhidden?: GeneralForumTopicUnhidden
  /**
   * Service message: a scheduled giveaway was created.
   */
  giveawayCreated?: GiveawayCreated
  /**
   * The message is a scheduled giveaway message.
   */
  giveaway?: Giveaway
  /**
   * A giveaway with public winners was completed.
   */
  giveawayWinners?: GiveawayWinners
  /**
   * Service message: a giveaway without public winners was completed.
   */
  giveawayCompleted?: GiveawayCompleted
  /**
   * Service message: video chat scheduled.
   */
  videoChatScheduled?: VideoChatScheduled
  /**
   * Service message: video chat started.
   */
  videoChatStarted?: VideoChatStarted
  /**
   * Service message: video chat ended.
   */
  videoChatEnded?: VideoChatEnded
  /**
   * Service message: new participants invited to a video chat.
   */
  videoChatParticipantsInvited?: VideoChatParticipantsInvited
  /**
   * Service message: data sent by a Web App.
   */
  webAppData?: WebAppData
  /**
   * Inline keyboard attached to the message.
   * login_url buttons are represented as ordinary url buttons.
   */
  replyMarkup?: InlineKeyboardMarkup
}

/**
 * Mode for parsing entities in the message text.
 *
 * @see https://core.telegram.org/bots/api#formatting-options
 */
export type ParseMode = 'Markdown' | 'MarkdownV2' | 'HTML'

/**
 * This object represents a point on the map.
 *
 * @see https://core.telegram.org/bots/api#location
 */
export type Location = {
  /**
   * Latitude as defined by the sender.
   */
  latitude: number
  /**
   * Longitude as defined by the sender.
   */
  longitude: number
  /**
   * The radius of uncertainty for the location, measured in meters; 0-1500.
   */
  horizontalAccuracy?: number
  /**
   * Time relative to the message sending date, during which the location can be updated; in seconds.
   * For active live locations only.
   */
  livePeriod?: number
  /**
   * The direction in which user is moving, in degrees; 1-360.
   * For active live locations only.
   */
  heading?: number
  /**
   * The maximum distance for proximity alerts about approaching another chat member, in meters.
   * For sent live locations only.
   */
  proximityAlertRadius?: number
}

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 *
 * @see https://core.telegram.org/bots/api#photosize
 */
export type PhotoSize = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Photo width.
   */
  width: number
  /**
   * Photo height.
   */
  height: number
  /**
   * File size in bytes.
   */
  fileSize?: number
}

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 *
 * @see https://core.telegram.org/bots/api#animation
 */
export type Animation = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Video width as defined by the sender.
   */
  width: number
  /**
   * Video height as defined by the sender.
   */
  height: number
  /**
   * Duration of the video in seconds as defined by the sender.
   */
  duration: number
  /**
   * Animation thumbnail as defined by the sender.
   */
  thumbnail?: PhotoSize
  /**
   * Original animation filename as defined by the sender.
   */
  fileName?: string
  /**
   * MIME type of the file as defined by the sender.
   */
  mimeType?: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
}

/**
 * This object represents an audio file to be treated as music by the Telegram clients.
 *
 * @see https://core.telegram.org/bots/api#audio
 */
export type Audio = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Duration of the audio in seconds as defined by the sender.
   */
  duration: number
  /**
   * Performer of the audio as defined by the sender or by audio tags.
   */
  performer?: string
  /**
   * Title of the audio as defined by the sender or by audio tags.
   */
  title?: string
  /**
   * Original filename as defined by the sender.
   */
  fileName?: string
  /**
   * MIME type of the file as defined by the sender.
   */
  mimeType?: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
  /**
   * Thumbnail of the album cover to which the music file belongs.
   */
  thumbnail?: PhotoSize
}

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 *
 * @see https://core.telegram.org/bots/api#document
 */
export type Document = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Document thumbnail as defined by the sender.
   */
  thumbnail?: PhotoSize
  /**
   * Original filename as defined by the sender.
   */
  fileName?: string
  /**
   * MIME type of the file as defined by the sender.
   */
  mimeType?: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
}

/**
 * This object represents a video file.
 *
 * @see https://core.telegram.org/bots/api#video
 */
export type Video = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Video width as defined by the sender.
   */
  width: number
  /**
   * Video height as defined by the sender.
   */
  height: number
  /**
   * Duration of the video in seconds as defined by the sender.
   */
  duration: number
  /**
   * Video thumbnail.
   */
  thumbnail?: PhotoSize
  /**
   * Original filename as defined by the sender.
   */
  fileName?: string
  /**
   * MIME type of the file as defined by the sender.
   */
  mimeType?: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
}

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 *
 * @see https://core.telegram.org/bots/api#videonote
 */
export type VideoNote = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Video width and height (diameter of the video message) as defined by the sender.
   */
  length: number
  /**
   * Duration of the video in seconds as defined by the sender.
   */
  duration: number
  /**
   * Video thumbnail.
   */
  thumbnail?: PhotoSize
  /**
   * File size in bytes.
   */
  fileSize?: number
}

/**
 * This object represents a voice note.
 *
 * @see https://core.telegram.org/bots/api#voice
 */
export type Voice = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Duration of the audio in seconds as defined by the sender.
   */
  duration: number
  /**
   * MIME type of the file as defined by the sender.
   */
  mimeType?: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
}

/**
 * This object represents a phone contact.
 *
 * @see https://core.telegram.org/bots/api#contact
 */
export type Contact = {
  /**
   * Contact's phone number.
   */
  phoneNumber: string
  /**
   * Contact's first name.
   */
  firstName: string
  /**
   * Contact's last name.
   */
  lastName?: string
  /**
   * Contact's user identifier in Telegram.
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a 64-bit integer or double-precision float type are safe
   * for storing this identifier.
   */
  userId?: number
  /**
   * Additional data about the contact in the form of a vCard.
   *
   * @see https://en.wikipedia.org/wiki/VCard
   */
  vcard?: string
}

/**
 * This object represents an animated emoji that displays a random value.
 *
 * @see https://core.telegram.org/bots/api#dice
 */
export type Dice = {
  /**
   * Emoji on which the dice throw animation is based.
   *
   * Currently, must be one of "🎲", "🎯", "🏀", "⚽", "🎳", or "🎰".
   * Dice can have values 1-6 for "🎲", "🎯" and "🎳", values 1-5 for "🏀" and "⚽",
   * and values 1-64 for "🎰".
   */
  emoji: string
  /**
   * Value of the dice.
   *
   * 1-6 for "🎲", "🎯" and "🎳" base emoji, 1-5 for "🏀" and "⚽" base emoji,
   * 1-64 for "🎰" base emoji.
   */
  value: number
}

/**
 * This object represents a venue.
 *
 * @see https://core.telegram.org/bots/api#venue
 */
export type Venue = {
  /**
   * Venue location. Can't be a live location.
   */
  location: Location
  /**
   * Name of the venue.
   */
  title: string
  /**
   * Address of the venue.
   */
  address: string
  /**
   * Foursquare identifier of the venue.
   */
  foursquareId?: string
  /**
   * Foursquare type of the venue.
   * For example, "arts_entertainment/default", "arts_entertainment/aquarium" or "food/icecream".
   */
  foursquareType?: string
  /**
   * Google Places identifier of the venue.
   */
  googlePlaceId?: string
  /**
   * Google Places type of the venue.
   *
   * @see https://developers.google.com/places/web-service/supported_types
   */
  googlePlaceType?: string
}

/**
 * This object represents a story.
 *
 * @see https://core.telegram.org/bots/api#story
 */
export type Story = {
  /**
   * Chat that posted the story.
   */
  chat: Chat
  /**
   * Unique identifier for the story in the chat.
   */
  id: number
}

/**
 * This object describes the position on faces where a mask should be placed by default.
 *
 * @see https://core.telegram.org/bots/api#maskposition
 */
export type MaskPosition = {
  /**
   * The part of the face relative to which the mask should be placed.
   * One of "forehead", "eyes", "mouth", or "chin".
   */
  point: 'forehead' | 'eyes' | 'mouth' | 'chin'
  /**
   * Shift by X-axis measured in widths of the mask scaled to the face size, from left to right.
   * For example, choosing -1.0 will place mask just to the left of the default mask position.
   */
  xShift: number
  /**
   * Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom.
   * For example, 1.0 will place the mask just below the default mask position.
   */
  yShift: number
  /**
   * Mask scaling coefficient. For example, 2.0 means double size.
   */
  scale: number
}

/**
 * This object represents a file ready to be downloaded.
 *
 * @see https://core.telegram.org/bots/api#file
 */
export type File = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * File size in bytes. It can be bigger than 2^31 and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52
   * significant bits, so a signed 64-bit integer or double-precision float type
   * are safe for storing this value.
   */
  fileSize?: number
  /**
   * File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.
   */
  filePath?: string
}

/**
 * This object represents a sticker.
 *
 * @see https://core.telegram.org/bots/api#sticker
 */
export type Sticker = {
  /**
   * Identifier for this file, which can be used to download or reuse the file.
   */
  fileId: string
  /**
   * Unique identifier for this file, which is supposed to be the same over time
   * and for different bots. Can't be used to download or reuse the file.
   */
  fileUniqueId: string
  /**
   * Type of the sticker, currently one of "regular", "mask", "custom_emoji".
   * The type of the sticker is independent from its format, which is determined by the fields
   * is_animated and is_video.
   */
  type: 'regular' | 'mask' | 'customEmoji'
  /**
   * Sticker width.
   */
  width: number
  /**
   * Sticker height.
   */
  height: number
  /**
   * True, if the sticker is animated.
   */
  isAnimated: boolean
  /**
   * True, if the sticker is a video sticker.
   */
  isVideo: boolean
  /**
   * Sticker thumbnail in the .WEBP or .JPG format.
   */
  thumbnail?: PhotoSize
  /**
   * Emoji associated with the sticker.
   */
  emoji?: string
  /**
   * Name of the sticker set to which the sticker belongs.
   */
  setName?: string
  /**
   * For premium regular stickers, premium animation for the sticker.
   */
  premiumAnimation?: File
  /**
   * For mask stickers, the position where the mask should be placed.
   */
  maskPosition?: MaskPosition
  /**
   * For custom emoji stickers, unique identifier of the custom emoji.
   */
  customEmojiId?: string
  /**
   * True, if the sticker must be repainted to a text color in messages,
   * the color of the Telegram Premium badge in emoji status,
   * white color on chat photos, or another appropriate color in other places.
   */
  needsRepainting?: boolean
  /**
   * File size in bytes.
   */
  fileSize?: number
}

/**
 * This object represents a sticker set.
 *
 * @see https://core.telegram.org/bots/api#stickerset
 */
export type StickerSet = {
  /**
   * Sticker set name.
   */
  name: string
  /**
   * Sticker set title.
   */
  title: string
  /**
   * Type of stickers in the set, currently one of "regular", "mask", "custom_emoji".
   */
  stickerType: 'regular' | 'mask' | 'customEmoji'
  /**
   * List of all set stickers.
   */
  stickers: Sticker[]
  /**
   * Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format.
   */
  thumbnail?: PhotoSize
}

/**
 * This object represents a game.
 *
 * Use BotFather to create and edit games, their short names will act as unique identifiers.
 *
 * @see https://core.telegram.org/bots/api#game
 */
export type Game = {
  /**
   * Title of the game.
   */
  title: string
  /**
   * Description of the game.
   */
  description: string
  /**
   * Photo that will be displayed in the game message in chats.
   */
  photo: PhotoSize[]
  /**
   * Brief description of the game or high scores included in the game message.
   * Can be automatically edited to include current high scores for the game when
   * the bot calls setGameScore, or manually edited using editMessageText.
   * 0-4096 characters.
   */
  text?: string
  /**
   * Special entities that appear in text, such as usernames, URLs, bot commands, etc.
   */
  textEntities?: MessageEntity[]
  /**
   * Animation that will be displayed in the game message in chats.
   * Upload via @BotFather.
   */
  animation?: Animation
}

/**
 * This object represents one row of the high scores table for a game.
 *
 * @see https://core.telegram.org/bots/api#gamehighscore
 */
export type GameHighScore = {
  /**
   * Position in high score table for the game.
   */
  position: number
  /**
   * User.
   */
  user: User
  /**
   * Score.
   */
  score: number
}

/**
 * The paid media isn't available before the payment.
 *
 * @see https://core.telegram.org/bots/api#paidmediapreview
 */
export type PaidMediaPreview = {
  /**
   * Type of the paid media, always "preview".
   */
  type: 'preview'
  /**
   * Media width as defined by the sender.
   */
  width?: number
  /**
   * Media height as defined by the sender.
   */
  height?: number
  /**
   * Duration of the media in seconds as defined by the sender.
   */
  duration?: number
}

/**
 * The paid media is a photo.
 *
 * @see https://core.telegram.org/bots/api#paidmediaphoto
 */
export type PaidMediaPhoto = {
  /**
   * Type of the paid media, always "photo".
   */
  type: 'photo'
  /**
   * The photo.
   */
  photo: PhotoSize[]
}

/**
 * The paid media is a video.
 *
 * @see https://core.telegram.org/bots/api#paidmediavideo
 */
export type PaidMediaVideo = {
  /**
   * Type of the paid media, always "video".
   */
  type: 'video'
  /**
   * The video.
   */
  video: Video
}

/**
 * This object describes paid media.
 *
 * @see https://core.telegram.org/bots/api#paidmedia
 */
export type PaidMedia = PaidMediaPreview | PaidMediaPhoto | PaidMediaVideo

/**
 * Describes the paid media added to a message.
 *
 * @see https://core.telegram.org/bots/api#paidmediainfo
 */
export type PaidMediaInfo = {
  /**
   * The number of Telegram Stars that must be paid to buy access to the media.
   */
  starCount: number
  /**
   * Information about the paid media.
   */
  paidMedia: PaidMedia[]
}

/**
 * The message was originally sent by a known user.
 *
 * @see https://core.telegram.org/bots/api#messageoriginuser
 */
export type MessageOriginUser = {
  /**
   * Type of the message origin, always "user".
   */
  type: 'user'
  /**
   * Date the message was sent originally in Unix time.
   */
  date: number
  /**
   * User that sent the message originally.
   */
  senderUser: User
}

/**
 * The message was originally sent by an unknown user.
 *
 * @see https://core.telegram.org/bots/api#messageoriginhiddenuser
 */
export type MessageOriginHiddenUser = {
  /**
   * Type of the message origin, always "hidden_user".
   */
  type: 'hiddenUser'
  /**
   * Date the message was sent originally in Unix time.
   */
  date: number
  /**
   * Name of the user that sent the message originally.
   */
  senderUserName: string
}

/**
 * The message was originally sent on behalf of a chat to a group chat.
 *
 * @see https://core.telegram.org/bots/api#messageoriginchat
 */
export type MessageOriginChat = {
  /**
   * Type of the message origin, always "chat".
   */
  type: 'chat'
  /**
   * Date the message was sent originally in Unix time.
   */
  date: number
  /**
   * Chat that sent the message originally.
   */
  senderChat: Chat
  /**
   * For messages originally sent by an anonymous chat administrator,
   * original message author signature.
   */
  authorSignature?: string
}

/**
 * The message was originally sent to a channel chat.
 *
 * @see https://core.telegram.org/bots/api#messageoriginchannel
 */
export type MessageOriginChannel = {
  /**
   * Type of the message origin, always "channel".
   */
  type: 'channel'
  /**
   * Date the message was sent originally in Unix time.
   */
  date: number
  /**
   * Channel chat to which the message was originally sent.
   */
  chat: Chat
  /**
   * Unique message identifier inside the chat.
   */
  messageId: number
  /**
   * Signature of the original post author.
   */
  authorSignature?: string
}

/**
 * This object describes the origin of a message.
 *
 * @see https://core.telegram.org/bots/api#messageorigin
 */
export type MessageOrigin =
  | MessageOriginUser
  | MessageOriginHiddenUser
  | MessageOriginChat
  | MessageOriginChannel

/**
 * Describes reply information for the message.
 *
 * @see https://core.telegram.org/bots/api#textquote
 */
export type TextQuote = {
  /**
   * Text of the quoted part of a message that is replied to by the given message.
   */
  text: string
  /**
   * Special entities that appear in the quote.
   * Currently, only bold, italic, underline, strikethrough, spoiler, and custom_emoji
   * entities are kept in quotes.
   */
  entities?: MessageEntity[]
  /**
   * Approximate quote position in the original message in UTF-16 code units
   * as specified by the sender.
   */
  position: number
  /**
   * True, if the quote was chosen manually by the message sender.
   * Otherwise, the quote was added automatically by the server.
   */
  isManual?: boolean
}

/**
 * This object contains information about a message that is being replied to,
 * which may come from another chat or forum topic.
 *
 * @see https://core.telegram.org/bots/api#externalreplyinfo
 */
export type ExternalReplyInfo = {
  /**
   * Origin of the message replied to by the given message.
   */
  origin: MessageOrigin
  /**
   * Chat the original message belongs to. Available only if the chat is a supergroup or a channel.
   */
  chat?: Chat
  /**
   * Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel.
   */
  messageId?: number
  /**
   * Options used for link preview generation for the original message, if it is a text message.
   */
  linkPreviewOptions?: LinkPreviewOptions
  /**
   * Message is an animation, information about the animation.
   */
  animation?: Animation
  /**
   * Message is an audio file, information about the file.
   */
  audio?: Audio
  /**
   * Message is a general file, information about the file.
   */
  document?: Document
  /**
   * Message contains paid media; information about the paid media.
   */
  paidMedia?: PaidMediaInfo
  /**
   * Message is a photo, available sizes of the photo.
   */
  photo?: PhotoSize[]
  /**
   * Message is a sticker, information about the sticker.
   */
  sticker?: Sticker
  /**
   * Message is a forwarded story.
   */
  story?: Story
  /**
   * Message is a video, information about the video.
   */
  video?: Video
  /**
   * Message is a video note, information about the video message.
   */
  videoNote?: VideoNote
  /**
   * Message is a voice message, information about the file.
   */
  voice?: Voice
  /**
   * True, if the message media is covered by a spoiler animation.
   */
  hasMediaSpoiler?: boolean
  /**
   * Message is a shared contact, information about the contact.
   */
  contact?: Contact
  /**
   * Message is a dice with random value.
   */
  dice?: Dice
  /**
   * Message is a game, information about the game.
   */
  game?: Game
  /**
   * Message is a scheduled giveaway, information about the giveaway.
   */
  giveaway?: Giveaway
  /**
   * A giveaway with public winners was completed.
   */
  giveawayWinners?: GiveawayWinners
  /**
   * Message is an invoice for a payment, information about the invoice.
   */
  invoice?: Invoice
  /**
   * Message is a shared location, information about the location.
   */
  location?: Location
  /**
   * Message is a native poll, information about the poll.
   */
  poll?: Poll
  /**
   * Message is a venue, information about the venue.
   */
  venue?: Venue
}

/**
 * This object represents a service message about a change in auto-delete timer settings.
 *
 * @see https://core.telegram.org/bots/api#messageautodeletetimerchanged
 */
export type MessageAutoDeleteTimerChanged = {
  /**
   * New auto-delete time for messages in the chat; in seconds.
   */
  messageAutoDeleteTime: number
}

/**
 * This object contains information about the users whose identifiers were shared
 * with the bot using a KeyboardButtonRequestUsers button.
 *
 * @see https://core.telegram.org/bots/api#usersshared
 */
export type UsersShared = {
  /**
   * Identifier of the request.
   */
  requestId: number
  /**
   * Information about users shared with the bot.
   */
  users: SharedUser[]
}

/**
 * This object contains information about a user that was shared with the bot
 * using a KeyboardButtonRequestUsers button.
 *
 * @see https://core.telegram.org/bots/api#shareduser
 */
export type SharedUser = {
  /**
   * Identifier of the shared user. This number may have more than 32 significant bits
   * and some programming languages may have difficulty/silent defects in interpreting it.
   * But it has at most 52 significant bits, so 64-bit integers or double-precision float types
   * are safe for storing these identifiers. The bot may not have access to the user and could
   * be unable to use this identifier, unless the user is already known to the bot by some other means.
   */
  userId: number
  /**
   * First name of the user, if the name was requested by the bot.
   */
  firstName?: string
  /**
   * Last name of the user, if the name was requested by the bot.
   */
  lastName?: string
  /**
   * Username of the user, if the username was requested by the bot.
   */
  username?: string
  /**
   * Available sizes of the chat photo, if the photo was requested by the bot.
   */
  photo?: PhotoSize[]
}

/**
 * This object contains information about a chat that was shared with the bot
 * using a KeyboardButtonRequestChat button.
 *
 * @see https://core.telegram.org/bots/api#chatshared
 */
export type ChatShared = {
  /**
   * Identifier of the request.
   */
  requestId: number
  /**
   * Identifier of the shared chat. This number may have more than 32 significant bits
   * and some programming languages may have difficulty/silent defects in interpreting it.
   * But it has at most 52 significant bits, so a 64-bit integer or double-precision float type
   * are safe for storing this identifier. The bot may not have access to the chat and could be
   * unable to use this identifier, unless the chat is already known to the bot by some other means.
   */
  chatId: number
  /**
   * Title of the chat, if the title was requested by the bot.
   */
  title?: string
  /**
   * Username of the chat, if the username was requested by the bot and available.
   */
  username?: string
  /**
   * Available sizes of the chat photo, if the photo was requested by the bot.
   */
  photo?: PhotoSize[]
}

/**
 * This object represents a service message about a user allowing a bot
 * to write messages after adding it to the attachment menu, launching a Web App
 * from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess.
 *
 * @see https://core.telegram.org/bots/api#writeaccessallowed
 */
export type WriteAccessAllowed = {
  /**
   * True, if the access was granted after the user accepted an explicit request from a Web App
   * sent by the method requestWriteAccess.
   */
  fromRequest?: boolean
  /**
   * Name of the Web App, if the access was granted when the Web App was launched from a link.
   */
  webAppName?: string
  /**
   * True, if the access was granted when the bot was added to the attachment or side menu.
   */
  fromAttachmentMenu?: boolean
}

/**
 * This object represents a service message about a video chat scheduled in the chat.
 *
 * @see https://core.telegram.org/bots/api#videochatscheduled
 */
export type VideoChatScheduled = {
  /**
   * Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator.
   */
  startDate: number
}

/**
 * This object represents a service message about a video chat started in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#videochatstarted
 */
export type VideoChatStarted = Record<string, never>

/**
 * This object represents a service message about a video chat ended in the chat.
 *
 * @see https://core.telegram.org/bots/api#videochatended
 */
export type VideoChatEnded = {
  /**
   * Video chat duration in seconds.
   */
  duration: number
}

/**
 * This object represents a service message about new members invited to a video chat.
 *
 * @see https://core.telegram.org/bots/api#videochatparticipantsinvited
 */
export type VideoChatParticipantsInvited = {
  /**
   * New members that were invited to the video chat.
   */
  users: User[]
}

/**
 * This object represents a service message about a forum topic created in the chat.
 *
 * @see https://core.telegram.org/bots/api#forumtopiccreated
 */
export type ForumTopicCreated = {
  /**
   * Name of the topic.
   */
  name: string
  /**
   * Color of the topic icon in RGB format.
   */
  iconColor: number
  /**
   * Unique identifier of the custom emoji shown as the topic icon.
   */
  iconCustomEmojiId?: string
}

/**
 * This object represents a service message about a forum topic closed in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#forumtopicclosed
 */
export type ForumTopicClosed = Record<string, never>

/**
 * This object represents a service message about an edited forum topic.
 *
 * @see https://core.telegram.org/bots/api#forumtopicedited
 */
export type ForumTopicEdited = {
  /**
   * New name of the topic, if it was edited.
   */
  name?: string
  /**
   * New identifier of the custom emoji shown as the topic icon, if it was edited;
   * an empty string if the icon was removed.
   */
  iconCustomEmojiId?: string
}

/**
 * This object represents a service message about a forum topic reopened in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#forumtopicreopened
 */
export type ForumTopicReopened = Record<string, never>

/**
 * This object represents a service message about General forum topic hidden in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#generalforumtopichidden
 */
export type GeneralForumTopicHidden = Record<string, never>

/**
 * This object represents a service message about General forum topic unhidden in the chat.
 * Currently holds no information.
 *
 * @see https://core.telegram.org/bots/api#generalforumtopicunhidden
 */
export type GeneralForumTopicUnhidden = Record<string, never>

/**
 * This object contains information about a user that was shared with the bot.
 *
 * @see https://core.telegram.org/bots/api#proximityalerttriggered
 */
export type ProximityAlertTriggered = {
  /**
   * User that triggered the alert.
   */
  traveler: User
  /**
   * User that set the alert.
   */
  watcher: User
  /**
   * The distance between the users.
   */
  distance: number
}

/**
 * This object represents the content of a service message, sent whenever a user
 * in the chat triggers a proximity alert set by another user.
 *
 * @see https://core.telegram.org/bots/api#chatboostadded
 */
export type ChatBoostAdded = {
  /**
   * Number of boosts added by the user.
   */
  boostCount: number
}

/**
 * This object describes the way a background is filled based on the selected colors.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillsolid
 */
export type BackgroundFillSolid = {
  /**
   * Type of the background fill, always "solid".
   */
  type: 'solid'
  /**
   * The color of the background fill in the RGB24 format.
   */
  color: number
}

/**
 * The background is a gradient fill.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillgradient
 */
export type BackgroundFillGradient = {
  /**
   * Type of the background fill, always "gradient".
   */
  type: 'gradient'
  /**
   * Top color of the gradient in the RGB24 format.
   */
  topColor: number
  /**
   * Bottom color of the gradient in the RGB24 format.
   */
  bottomColor: number
  /**
   * Clockwise rotation angle of the background fill in degrees; 0-359.
   */
  rotationAngle: number
}

/**
 * The background is a freeform gradient that rotates after every message in the chat.
 *
 * @see https://core.telegram.org/bots/api#backgroundfillfreeformgradient
 */
export type BackgroundFillFreeformGradient = {
  /**
   * Type of the background fill, always "freeform_gradient".
   */
  type: 'freeformGradient'
  /**
   * A list of the 3 or 4 base colors that are used to generate the freeform gradient
   * in the RGB24 format.
   */
  colors: number[]
}

/**
 * This object describes the way a background is filled.
 *
 * @see https://core.telegram.org/bots/api#backgroundfill
 */
export type BackgroundFill =
  | BackgroundFillSolid
  | BackgroundFillGradient
  | BackgroundFillFreeformGradient

/**
 * The background is automatically filled based on the selected colors.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypefill
 */
export type BackgroundTypeFill = {
  /**
   * Type of the background, always "fill".
   */
  type: 'fill'
  /**
   * The background fill.
   */
  fill: BackgroundFill
  /**
   * Dimming of the background in dark themes, as a percentage; 0-100.
   */
  darkThemeDimming: number
}

/**
 * The background is a wallpaper in the JPEG format.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypewallpaper
 */
export type BackgroundTypeWallpaper = {
  /**
   * Type of the background, always "wallpaper".
   */
  type: 'wallpaper'
  /**
   * Document with the wallpaper.
   */
  document: Document
  /**
   * Dimming of the background in dark themes, as a percentage; 0-100.
   */
  darkThemeDimming: number
  /**
   * True, if the wallpaper is downscaled to fit in a 450x450 square and then
   * box-blurred with radius 12.
   */
  isBlurred?: boolean
  /**
   * True, if the background moves slightly when the device is tilted.
   */
  isMoving?: boolean
}

/**
 * The background is a PNG or TGV (gzipped subset of SVG with MIME type "application/x-tgwallpattern")
 * pattern to be combined with the background fill chosen by the user.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypepattern
 */
export type BackgroundTypePattern = {
  /**
   * Type of the background, always "pattern".
   */
  type: 'pattern'
  /**
   * Document with the pattern.
   */
  document: Document
  /**
   * The background fill that is combined with the pattern.
   */
  fill: BackgroundFill
  /**
   * Intensity of the pattern when it is shown above the filled background; 0-100.
   */
  intensity: number
  /**
   * True, if the background fill must be applied only to the pattern itself.
   * All other pixels are black in this case. For dark themes only.
   */
  isInverted?: boolean
  /**
   * True, if the background moves slightly when the device is tilted.
   */
  isMoving?: boolean
}

/**
 * The background is taken directly from a built-in chat theme.
 *
 * @see https://core.telegram.org/bots/api#backgroundtypechattheme
 */
export type BackgroundTypeChatTheme = {
  /**
   * Type of the background, always "chat_theme".
   */
  type: 'chatTheme'
  /**
   * Name of the chat theme, which is usually an emoji.
   */
  themeName: string
}

/**
 * This object describes the type of a background.
 *
 * @see https://core.telegram.org/bots/api#backgroundtype
 */
export type BackgroundType =
  | BackgroundTypeFill
  | BackgroundTypeWallpaper
  | BackgroundTypePattern
  | BackgroundTypeChatTheme

/**
 * This object represents a chat background.
 *
 * @see https://core.telegram.org/bots/api#chatbackground
 */
export type ChatBackground = {
  /**
   * Type of the background.
   */
  type: BackgroundType
}

/**
 * This object represents a service message about a new forum topic created in the chat.
 *
 * @see https://core.telegram.org/bots/api#giveawaycreated
 */
export type GiveawayCreated = {
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.
   */
  prizeStarCount?: number
}

/**
 * This object represents a message about a scheduled giveaway.
 *
 * @see https://core.telegram.org/bots/api#giveaway
 */
export type Giveaway = {
  /**
   * The list of chats which the user must join to participate in the giveaway.
   */
  chats: Chat[]
  /**
   * Point in time (Unix timestamp) when winners of the giveaway will be selected.
   */
  winnersSelectionDate: number
  /**
   * The number of users which are supposed to be selected as winners of the giveaway.
   */
  winnerCount: number
  /**
   * True, if only users who join the chats after the giveaway started should be eligible to win.
   */
  onlyNewMembers?: boolean
  /**
   * True, if the list of giveaway winners will be visible to everyone.
   */
  hasPublicWinners?: boolean
  /**
   * Description of additional giveaway prize.
   */
  prizeDescription?: string
  /**
   * A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries
   * from which eligible users for the giveaway must come.
   * If empty, then all users can participate in the giveaway.
   * Users with a phone number that was bought on Fragment can always participate in giveaways.
   */
  countryCodes?: string[]
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.
   */
  prizeStarCount?: number
  /**
   * The number of months the Telegram Premium subscription won from the giveaway will be active for;
   * for Telegram Premium giveaways only.
   */
  premiumSubscriptionMonthCount?: number
}

/**
 * This object represents a message about the completion of a giveaway with public winners.
 *
 * @see https://core.telegram.org/bots/api#giveawaywinners
 */
export type GiveawayWinners = {
  /**
   * The chat that created the giveaway.
   */
  chat: Chat
  /**
   * Identifier of the message with the giveaway in the chat.
   */
  giveawayMessageId: number
  /**
   * Point in time (Unix timestamp) when winners of the giveaway were selected.
   */
  winnersSelectionDate: number
  /**
   * Total number of winners in the giveaway.
   */
  winnerCount: number
  /**
   * List of up to 100 winners of the giveaway.
   */
  winners: User[]
  /**
   * The number of other chats the user had to join in order to be eligible for the giveaway.
   */
  additionalChatCount?: number
  /**
   * The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only.
   */
  prizeStarCount?: number
  /**
   * The number of months the Telegram Premium subscription won from the giveaway will be active for;
   * for Telegram Premium giveaways only.
   */
  premiumSubscriptionMonthCount?: number
  /**
   * Number of undistributed prizes.
   */
  unclaimedPrizeCount?: number
  /**
   * True, if only users who had joined the chats after the giveaway started were eligible to win.
   */
  onlyNewMembers?: boolean
  /**
   * True, if the giveaway was canceled because the payment for it was refunded.
   */
  wasRefunded?: boolean
  /**
   * Description of additional giveaway prize.
   */
  prizeDescription?: string
}

/**
 * This object represents a service message about the completion of a giveaway without public winners.
 *
 * @see https://core.telegram.org/bots/api#giveawaycompleted
 */
export type GiveawayCompleted = {
  /**
   * Number of winners in the giveaway.
   */
  winnerCount: number
  /**
   * Number of undistributed prizes.
   */
  unclaimedPrizeCount?: number
  /**
   * Message with the giveaway that was completed, if it wasn't deleted.
   */
  giveawayMessage?: Message
  /**
   * True, if the giveaway is a Telegram Star giveaway. Otherwise, currently,
   * the giveaway is a Telegram Premium giveaway.
   */
  isStarGiveaway?: boolean
}

/**
 * This object contains basic information about an invoice.
 *
 * @see https://core.telegram.org/bots/api#invoice
 */
export type Invoice = {
  /**
   * Product name.
   */
  title: string
  /**
   * Product description.
   */
  description: string
  /**
   * Unique bot deep-linking parameter that can be used to generate this invoice.
   */
  startParameter: string
  /**
   * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.
   */
  currency: string
  /**
   * Total price in the smallest units of the currency (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145.
   * See the exp parameter in currencies.json, it shows the number of digits past
   * the decimal point for each currency (2 for the majority of currencies).
   */
  totalAmount: number
}

/**
 * This object contains basic information about a successful payment.
 *
 * @see https://core.telegram.org/bots/api#successfulpayment
 */
export type SuccessfulPayment = {
  /**
   * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.
   */
  currency: string
  /**
   * Total price in the smallest units of the currency (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145.
   * See the exp parameter in currencies.json, it shows the number of digits past
   * the decimal point for each currency (2 for the majority of currencies).
   */
  totalAmount: number
  /**
   * Bot-specified invoice payload.
   */
  invoicePayload: string
  /**
   * Expiration date of the subscription; for recurring payment only.
   */
  subscriptionExpirationDate?: number
  /**
   * True, if the payment is the first payment for a subscription.
   */
  isFirstRecurring?: boolean
  /**
   * True, if the payment is recurring; for recurring payment only.
   */
  isRecurring?: boolean
  /**
   * Identifier of the shipping option chosen by the user.
   */
  shippingOptionId?: string
  /**
   * Order information provided by the user.
   */
  orderInfo?: OrderInfo
  /**
   * Telegram payment identifier.
   */
  telegramPaymentChargeId: string
  /**
   * Provider payment identifier.
   */
  providerPaymentChargeId: string
}

/**
 * This object contains information about a refunded payment.
 *
 * @see https://core.telegram.org/bots/api#refundedpayment
 */
export type RefundedPayment = {
  /**
   * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars.
   * Currently, always "XTR".
   */
  currency: string
  /**
   * Total refunded price in the smallest units of the currency (integer, not float/double).
   * For example, for a price of US$ 1.45, total_amount = 145.
   * See the exp parameter in currencies.json, it shows the number of digits past
   * the decimal point for each currency (2 for the majority of currencies).
   */
  totalAmount: number
  /**
   * Bot-specified invoice payload.
   */
  invoicePayload: string
  /**
   * Telegram payment identifier.
   */
  telegramPaymentChargeId: string
  /**
   * Provider payment identifier.
   */
  providerPaymentChargeId?: string
}

/**
 * This object represents an incoming inline query.
 *
 * When the user sends an empty query, your bot could return some default or trending results.
 *
 * @see https://core.telegram.org/bots/api#inlinequery
 */
export type InlineQuery = {
  /**
   * Unique identifier for this query.
   */
  id: string
  /**
   * Sender of the query.
   */
  from: User
  /**
   * Text of the query (up to 256 characters).
   */
  query: string
  /**
   * Offset of the results to be returned, can be controlled by the bot.
   */
  offset: string
  /**
   * Type of the chat from which the inline query was sent.
   *
   * Can be either `sender` for a private chat with the inline query sender,
   * `private`, `group`, `supergroup`, or `channel`.
   *
   * The chat type should be always known for requests sent from official clients
   * and most third-party clients, unless the request was sent from a secret chat.
   */
  chatType?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel'
  /**
   * Sender location, only for bots that request user location.
   */
  location?: Location
}

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 *
 * **Note:** It is necessary to enable inline feedback via @BotFather in order to receive these objects in updates.
 *
 * @see https://core.telegram.org/bots/api#choseninlineresult
 */
export type ChosenInlineResult = {
  /**
   * The unique identifier for the result that was chosen.
   */
  resultId: string
  /**
   * The user that chose the result.
   */
  from: User
  /**
   * Sender location, only for bots that require user location.
   */
  location?: Location
  /**
   * Identifier of the sent inline message.
   *
   * Available only if there is an inline keyboard attached to the message.
   * Will be also received in callback queries and can be used to edit the message.
   */
  inlineMessageId?: string
  /**
   * The query that was used to obtain the result.
   */
  query: string
}

/**
 * This object represents a shipping address.
 *
 * @see https://core.telegram.org/bots/api#shippingaddress
 */
export type ShippingAddress = {
  /**
   * Two-letter ISO 3166-1 alpha-2 country code.
   */
  countryCode: string
  /**
   * State, if applicable.
   */
  state: string
  /**
   * City.
   */
  city: string
  /**
   * First line for the address.
   */
  streetLine1: string
  /**
   * Second line for the address.
   */
  streetLine2: string
  /**
   * Address post code.
   */
  postCode: string
}

/**
 * This object contains information about an incoming shipping query.
 *
 * @see https://core.telegram.org/bots/api#shippingquery
 */
export type ShippingQuery = {
  /**
   * Unique query identifier.
   */
  id: string
  /**
   * User who sent the query.
   */
  from: User
  /**
   * Bot-specified invoice payload.
   */
  invoicePayload: string
  /**
   * User specified shipping address.
   */
  shippingAddress: ShippingAddress
}

/**
 * This object represents information about an order.
 *
 * @see https://core.telegram.org/bots/api#orderinfo
 */
export type OrderInfo = {
  /**
   * User name.
   */
  name?: string
  /**
   * User's phone number.
   */
  phoneNumber?: string
  /**
   * User email.
   */
  email?: string
  /**
   * User shipping address.
   */
  shippingAddress?: ShippingAddress
}

/**
 * This object contains information about an incoming pre-checkout query.
 *
 * @see https://core.telegram.org/bots/api#precheckoutquery
 */
export type PreCheckoutQuery = {
  /**
   * Unique query identifier.
   */
  id: string
  /**
   * User who sent the query.
   */
  from: User
  /**
   * Three-letter ISO 4217 currency code, or `XTR` for payments in Telegram Stars.
   */
  currency: string
  /**
   * Total price in the smallest units of the currency (integer, not float/double).
   *
   * For example, for a price of `US$ 1.45` pass `amount = 145`.
   *
   * @see https://core.telegram.org/bots/payments#supported-currencies
   */
  totalAmount: number
  /**
   * Bot-specified invoice payload.
   */
  invoicePayload: string
  /**
   * Identifier of the shipping option chosen by the user.
   */
  shippingOptionId?: string
  /**
   * Order information provided by the user.
   */
  orderInfo?: OrderInfo
}

/**
 * This object contains information about one answer option in a poll.
 *
 * @see https://core.telegram.org/bots/api#polloption
 */
export type PollOption = {
  /**
   * Option text, 1-100 characters.
   */
  text: string
  /**
   * Special entities that appear in the option text.
   * Currently, only custom emoji entities are allowed in poll option texts.
   */
  textEntities?: MessageEntity[]
  /**
   * Number of users that voted for this option.
   */
  voterCount: number
}

/**
 * This object represents a poll.
 *
 * @see https://core.telegram.org/bots/api#poll
 */
export type Poll = {
  /**
   * Unique poll identifier.
   */
  id: string
  /**
   * Poll question, 1-300 characters.
   */
  question: string
  /**
   * Special entities that appear in the question.
   * Currently, only custom emoji entities are allowed in poll questions.
   */
  questionEntities?: MessageEntity[]
  /**
   * List of poll options.
   */
  options: PollOption[]
  /**
   * Total number of users that voted in the poll.
   */
  totalVoterCount: number
  /**
   * `true` if the poll is closed.
   */
  isClosed: boolean
  /**
   * `true` if the poll is anonymous.
   */
  isAnonymous: boolean
  /**
   * Poll type.
   *
   * - `regular` - Regular poll
   * - `quiz` - Quiz poll with a correct answer
   */
  type: 'regular' | 'quiz'
  /**
   * `true` if the poll allows multiple answers.
   */
  allowsMultipleAnswers: boolean
  /**
   * 0-based identifier of the correct answer option.
   *
   * Available only for polls in the quiz mode, which are closed,
   * or was sent (not forwarded) by the bot or to the private chat with the bot.
   */
  correctOptionId?: number
  /**
   * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon
   * in a quiz-style poll, 0-200 characters.
   */
  explanation?: string
  /**
   * Special entities like usernames, URLs, bot commands, etc. that appear in the explanation.
   */
  explanationEntities?: MessageEntity[]
  /**
   * Amount of time in seconds the poll will be active after creation.
   */
  openPeriod?: number
  /**
   * Point in time (Unix timestamp) when the poll will be automatically closed.
   */
  closeDate?: number
}

/**
 * This object represents an answer of a user in a non-anonymous poll.
 *
 * @see https://core.telegram.org/bots/api#pollanswer
 */
export type PollAnswer = {
  /**
   * Unique poll identifier.
   */
  pollId: string
  /**
   * The chat that changed the answer to the poll, if the voter is anonymous.
   */
  voterChat?: Chat
  /**
   * The user that changed the answer to the poll, if the voter isn't anonymous.
   */
  user?: User
  /**
   * 0-based identifiers of chosen answer options.
   * May be empty if the vote was retracted.
   */
  optionIds: number[]
}

/**
 * Represents a chat member that owns the chat and has all administrator privileges.
 *
 * @see https://core.telegram.org/bots/api#chatmemberowner
 */
export type ChatMemberOwner = {
  /**
   * The member's status in the chat, always `creator`.
   */
  status: 'creator'
  /**
   * Information about the user.
   */
  user: User
  /**
   * `true` if the user's presence in the chat is hidden.
   */
  isAnonymous: boolean
  /**
   * Custom title for this user.
   */
  customTitle?: string
}

/**
 * Represents a chat member that has some additional privileges.
 *
 * @see https://core.telegram.org/bots/api#chatmemberadministrator
 */
export type ChatMemberAdministrator = {
  /**
   * The member's status in the chat, always `administrator`.
   */
  status: 'administrator'
  /**
   * Information about the user.
   */
  user: User
  /**
   * `true` if the bot is allowed to edit administrator privileges of that user.
   */
  canBeEdited: boolean
  /**
   * `true` if the user's presence in the chat is hidden.
   */
  isAnonymous: boolean
  /**
   * `true` if the administrator can access the chat event log, get boost list,
   * see hidden supergroup and channel members, report spam messages and ignore slow mode.
   * Implied by any other administrator privilege.
   */
  canManageChat: boolean
  /**
   * `true` if the administrator can delete messages of other users.
   */
  canDeleteMessages: boolean
  /**
   * `true` if the administrator can manage video chats.
   */
  canManageVideoChats: boolean
  /**
   * `true` if the administrator can restrict, ban or unban chat members,
   * or access supergroup statistics.
   */
  canRestrictMembers: boolean
  /**
   * `true` if the administrator can add new administrators with a subset of their own privileges
   * or demote administrators that they have promoted, directly or indirectly.
   */
  canPromoteMembers: boolean
  /**
   * `true` if the user is allowed to change the chat title, photo and other settings.
   */
  canChangeInfo: boolean
  /**
   * `true` if the user is allowed to invite new users to the chat.
   */
  canInviteUsers: boolean
  /**
   * `true` if the administrator can post stories to the chat.
   */
  canPostStories: boolean
  /**
   * `true` if the administrator can edit stories posted by other users,
   * post stories to the chat page, pin chat stories, and access the chat's story archive.
   */
  canEditStories: boolean
  /**
   * `true` if the administrator can delete stories posted by other users.
   */
  canDeleteStories: boolean
  /**
   * `true` if the administrator can post messages in the channel,
   * or access channel statistics; for channels only.
   */
  canPostMessages?: boolean
  /**
   * `true` if the administrator can edit messages of other users and can pin messages;
   * for channels only.
   */
  canEditMessages?: boolean
  /**
   * `true` if the user is allowed to pin messages; for groups and supergroups only.
   */
  canPinMessages?: boolean
  /**
   * `true` if the user is allowed to create, rename, close, and reopen forum topics;
   * for supergroups only.
   */
  canManageTopics?: boolean
  /**
   * Custom title for this user.
   */
  customTitle?: string
}

/**
 * Represents a chat member that has no additional privileges or restrictions.
 *
 * @see https://core.telegram.org/bots/api#chatmembermember
 */
export type ChatMemberMember = {
  /**
   * The member's status in the chat, always `member`.
   */
  status: 'member'
  /**
   * Information about the user.
   */
  user: User
  /**
   * Date when the user's subscription will expire; Unix time.
   */
  untilDate?: number
}

/**
 * Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 *
 * @see https://core.telegram.org/bots/api#chatmemberrestricted
 */
export type ChatMemberRestricted = {
  /**
   * The member's status in the chat, always `restricted`.
   */
  status: 'restricted'
  /**
   * Information about the user.
   */
  user: User
  /**
   * `true` if the user is a member of the chat at the moment of the request.
   */
  isMember: boolean
  /**
   * `true` if the user is allowed to send text messages, contacts, giveaways, giveaway winners,
   * invoices, locations and venues.
   */
  canSendMessages: boolean
  /**
   * `true` if the user is allowed to send audios.
   */
  canSendAudios: boolean
  /**
   * `true` if the user is allowed to send documents.
   */
  canSendDocuments: boolean
  /**
   * `true` if the user is allowed to send photos.
   */
  canSendPhotos: boolean
  /**
   * `true` if the user is allowed to send videos.
   */
  canSendVideos: boolean
  /**
   * `true` if the user is allowed to send video notes.
   */
  canSendVideoNotes: boolean
  /**
   * `true` if the user is allowed to send voice notes.
   */
  canSendVoiceNotes: boolean
  /**
   * `true` if the user is allowed to send polls.
   */
  canSendPolls: boolean
  /**
   * `true` if the user is allowed to send animations, games, stickers and use inline bots.
   */
  canSendOtherMessages: boolean
  /**
   * `true` if the user is allowed to add web page previews to their messages.
   */
  canAddWebPagePreviews: boolean
  /**
   * `true` if the user is allowed to change the chat title, photo and other settings.
   */
  canChangeInfo: boolean
  /**
   * `true` if the user is allowed to invite new users to the chat.
   */
  canInviteUsers: boolean
  /**
   * `true` if the user is allowed to pin messages.
   */
  canPinMessages: boolean
  /**
   * `true` if the user is allowed to create forum topics.
   */
  canManageTopics: boolean
  /**
   * Date when restrictions will be lifted for this user; Unix time.
   * If 0, then the user is restricted forever.
   */
  untilDate: number
}

/**
 * Represents a chat member that isn't currently a member of the chat,
 * but may join it themselves.
 *
 * @see https://core.telegram.org/bots/api#chatmemberleft
 */
export type ChatMemberLeft = {
  /**
   * The member's status in the chat, always `left`.
   */
  status: 'left'
  /**
   * Information about the user.
   */
  user: User
}

/**
 * Represents a chat member that was banned in the chat
 * and can't return to the chat or view chat messages.
 *
 * @see https://core.telegram.org/bots/api#chatmemberbanned
 */
export type ChatMemberBanned = {
  /**
   * The member's status in the chat, always `kicked`.
   */
  status: 'kicked'
  /**
   * Information about the user.
   */
  user: User
  /**
   * Date when restrictions will be lifted for this user; Unix time.
   * If 0, then the user is banned forever.
   */
  untilDate: number
}

/**
 * This object contains information about one member of a chat.
 *
 * This is a union type of all possible chat member states.
 *
 * @see https://core.telegram.org/bots/api#chatmember
 */
export type ChatMember =
  | ChatMemberOwner
  | ChatMemberAdministrator
  | ChatMemberMember
  | ChatMemberRestricted
  | ChatMemberLeft
  | ChatMemberBanned

/**
 * Represents an invite link for a chat.
 *
 * @see https://core.telegram.org/bots/api#chatinvitelink
 */
export type ChatInviteLink = {
  /**
   * The invite link.
   * If the link was created by another chat administrator, then the second part will be replaced with "…".
   */
  inviteLink: string
  /**
   * Creator of the link.
   */
  creator: User
  /**
   * `true` if users joining the chat via the link need to be approved by chat administrators.
   */
  createsJoinRequest: boolean
  /**
   * `true` if the link is primary.
   */
  isPrimary: boolean
  /**
   * `true` if the link is revoked.
   */
  isRevoked: boolean
  /**
   * Invite link name.
   */
  name?: string
  /**
   * Point in time (Unix timestamp) when the link will expire or has been expired.
   */
  expireDate?: number
  /**
   * The maximum number of users that can be members of the chat simultaneously
   * after joining the chat via this invite link; 1-99999.
   */
  memberLimit?: number
  /**
   * Number of pending join requests created using this link.
   */
  pendingJoinRequestCount?: number
  /**
   * The number of seconds the subscription will be active for before the next payment.
   */
  subscriptionPeriod?: number
  /**
   * The amount of Telegram Stars a user must pay initially and after each subsequent
   * subscription period to be a member of the chat using the link.
   */
  subscriptionPrice?: number
}

/**
 * This object represents changes in the status of a chat member.
 *
 * @see https://core.telegram.org/bots/api#chatmemberupdated
 */
export type ChatMemberUpdated = {
  /**
   * Chat the user belongs to.
   */
  chat: Chat
  /**
   * Performer of the action, which resulted in the change.
   */
  from: User
  /**
   * Date the change was done in Unix time.
   */
  date: number
  /**
   * Previous information about the chat member.
   */
  oldChatMember: ChatMember
  /**
   * New information about the chat member.
   */
  newChatMember: ChatMember
  /**
   * Chat invite link, which was used by the user to join the chat;
   * for joining by invite link events only.
   */
  inviteLink?: ChatInviteLink
  /**
   * `true` if the user joined the chat after sending a direct join request
   * without using an invite link and being approved by an administrator.
   */
  viaJoinRequest?: boolean
  /**
   * `true` if the user joined the chat via a chat folder invite link.
   */
  viaChatFolderInviteLink?: boolean
}

/**
 * Represents a join request sent to a chat.
 *
 * @see https://core.telegram.org/bots/api#chatjoinrequest
 */
export type ChatJoinRequest = {
  /**
   * Chat to which the request was sent.
   */
  chat: Chat
  /**
   * User that sent the join request.
   */
  from: User
  /**
   * Identifier of a private chat with the user who sent the join request.
   *
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it.
   * But it has at most 52 significant bits, so a 64-bit integer or double-precision
   * float type are safe for storing this identifier.
   *
   * The bot can use this identifier for 5 minutes to send messages until the join request is processed,
   * assuming no other administrator contacted the user.
   */
  userChatId: number
  /**
   * Date the request was sent in Unix time.
   */
  date: number
  /**
   * Bio of the user.
   */
  bio?: string
  /**
   * Chat invite link that was used by the user to send the join request.
   */
  inviteLink?: ChatInviteLink
}

/**
 * The reaction is based on an emoji.
 *
 * @see https://core.telegram.org/bots/api#reactiontypeemoji
 */
export type ReactionTypeEmoji = {
  /**
   * Type of the reaction, always `emoji`.
   */
  type: 'emoji'
  /**
   * Reaction emoji.
   *
   * Currently, it can be one of the following emojis:
   * 👍, 👎, ❤, 🔥, 🥰, 👏, 😁, 🤔, 🤯, 😱, 🤬, 😢, 🎉, 🤩, 🤮, 💩, 🙏, 👌, 🕊, 🤡, 🥱, 🥴, 😍, 🐳, ❤‍🔥, 🌚, 🌭, 💯, 🤣, ⚡, 🍌, 🏆, 💔, 🤨, 😐, 🍓, 🍾, 💋, 🖕, 😈, 😴, 😭, 🤓, 👻, 👨‍💻, 👀, 🎃, 🙈, 😇, 😨, 🤝, ✍, 🤗, 🫡, 🎅, 🎄, ☃, 💅, 🤪, 🗿, 🆒, 💘, 🙉, 🦄, 😘, 💊, 🙊, 😎, 👾, 🤷‍♂, 🤷, 🤷‍♀, 😡
   */
  emoji: string
}

/**
 * The reaction is based on a custom emoji.
 *
 * @see https://core.telegram.org/bots/api#reactiontypecustomemoji
 */
export type ReactionTypeCustomEmoji = {
  /**
   * Type of the reaction, always `custom_emoji`.
   */
  type: 'customEmoji'
  /**
   * Custom emoji identifier.
   */
  customEmojiId: string
}

/**
 * The reaction is paid.
 *
 * @see https://core.telegram.org/bots/api#reactiontypepaid
 */
export type ReactionTypePaid = {
  /**
   * Type of the reaction, always `paid`.
   */
  type: 'paid'
}

/**
 * This object describes the type of a reaction.
 *
 * This is a union type of all possible reaction types.
 *
 * @see https://core.telegram.org/bots/api#reactiontype
 */
export type ReactionType =
  | ReactionTypeEmoji
  | ReactionTypeCustomEmoji
  | ReactionTypePaid

/**
 * Represents a reaction added to a message along with the number of times it was added.
 *
 * @see https://core.telegram.org/bots/api#reactioncount
 */
export type ReactionCount = {
  /**
   * Type of the reaction.
   */
  type: ReactionType
  /**
   * Number of times the reaction was added.
   */
  totalCount: number
}

/**
 * This object represents a change of a reaction on a message performed by a user.
 *
 * @see https://core.telegram.org/bots/api#messagereactionupdated
 */
export type MessageReactionUpdated = {
  /**
   * The chat containing the message the user reacted to.
   */
  chat: Chat
  /**
   * Unique identifier of the message inside the chat.
   */
  messageId: number
  /**
   * The user that changed the reaction, if the user isn't anonymous.
   */
  user?: User
  /**
   * The chat on behalf of which the reaction was changed, if the user is anonymous.
   */
  actorChat?: Chat
  /**
   * Date of the change in Unix time.
   */
  date: number
  /**
   * Previous list of reaction types that were set by the user.
   */
  oldReaction: ReactionType[]
  /**
   * New list of reaction types that have been set by the user.
   */
  newReaction: ReactionType[]
}

/**
 * This object represents reaction changes on a message with anonymous reactions.
 *
 * @see https://core.telegram.org/bots/api#messagereactioncountupdated
 */
export type MessageReactionCountUpdated = {
  /**
   * The chat containing the message.
   */
  chat: Chat
  /**
   * Unique identifier of the message inside the chat.
   */
  messageId: number
  /**
   * Date of the change in Unix time.
   */
  date: number
  /**
   * List of reactions that are present on the message.
   */
  reactions: ReactionCount[]
}

/**
 * The boost was obtained by subscribing to Telegram Premium
 * or by gifting a Telegram Premium subscription to another user.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcepremium
 */
export type ChatBoostSourcePremium = {
  /**
   * Source of the boost, always `premium`.
   */
  source: 'premium'
  /**
   * User that boosted the chat.
   */
  user: User
}

/**
 * The boost was obtained by the creation of Telegram Premium gift codes
 * to boost a chat. Each such code boosts the chat 4 times for the duration
 * of the corresponding Telegram Premium subscription.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcegiftcode
 */
export type ChatBoostSourceGiftCode = {
  /**
   * Source of the boost, always `gift_code`.
   */
  source: 'giftCode'
  /**
   * User for which the gift code was created.
   */
  user: User
}

/**
 * The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway.
 * This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription
 * for Telegram Premium giveaways and `prize_star_count / 500` times for one year for Telegram Star giveaways.
 *
 * @see https://core.telegram.org/bots/api#chatboostsourcegiveaway
 */
export type ChatBoostSourceGiveaway = {
  /**
   * Source of the boost, always `giveaway`.
   */
  source: 'giveaway'
  /**
   * Identifier of a message in the chat with the giveaway; the message could have been deleted already.
   * May be 0 if the message isn't sent yet.
   */
  giveawayMessageId: number
  /**
   * User that won the prize in the giveaway if any; for Telegram Premium giveaways only.
   */
  user?: User
  /**
   * The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only.
   */
  prizeStarCount?: number
  /**
   * `true` if the giveaway was completed, but there was no user to win the prize.
   */
  isUnclaimed?: boolean
}

/**
 * This object describes the source of a chat boost.
 *
 * This is a union type of all possible boost sources.
 *
 * @see https://core.telegram.org/bots/api#chatboostsource
 */
export type ChatBoostSource =
  | ChatBoostSourcePremium
  | ChatBoostSourceGiftCode
  | ChatBoostSourceGiveaway

/**
 * This object contains information about a chat boost.
 *
 * @see https://core.telegram.org/bots/api#chatboost
 */
export type ChatBoost = {
  /**
   * Unique identifier of the boost.
   */
  boostId: string
  /**
   * Point in time (Unix timestamp) when the chat was boosted.
   */
  addDate: number
  /**
   * Point in time (Unix timestamp) when the boost will automatically expire,
   * unless the booster's Telegram Premium subscription is prolonged.
   */
  expirationDate: number
  /**
   * Source of the added boost.
   */
  source: ChatBoostSource
}

/**
 * This object represents a boost added to a chat or changed.
 *
 * @see https://core.telegram.org/bots/api#chatboostupdated
 */
export type ChatBoostUpdated = {
  /**
   * Chat which was boosted.
   */
  chat: Chat
  /**
   * Information about the chat boost.
   */
  boost: ChatBoost
}

/**
 * This object represents a boost removed from a chat.
 *
 * @see https://core.telegram.org/bots/api#chatboostremoved
 */
export type ChatBoostRemoved = {
  /**
   * Chat which was boosted.
   */
  chat: Chat
  /**
   * Unique identifier of the boost.
   */
  boostId: string
  /**
   * Point in time (Unix timestamp) when the boost was removed.
   */
  removeDate: number
  /**
   * Source of the removed boost.
   */
  source: ChatBoostSource
}

/**
 * Describes the connection of the bot with a business account.
 *
 * @see https://core.telegram.org/bots/api#businessconnection
 */
export type BusinessConnection = {
  /**
   * Unique identifier of the business connection.
   */
  id: string
  /**
   * Business account user that created the business connection.
   */
  user: User
  /**
   * Identifier of a private chat with the user who created the business connection.
   *
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it.
   * But it has at most 52 significant bits, so a 64-bit integer or double-precision
   * float type are safe for storing this identifier.
   */
  userChatId: number
  /**
   * Date the connection was established in Unix time.
   */
  date: number
  /**
   * `true` if the bot can act on behalf of the business account in chats that were active in the last 24 hours.
   */
  canReply: boolean
  /**
   * `true` if the connection is active.
   */
  isEnabled: boolean
}

/**
 * This object is received when messages are deleted from a connected business account.
 *
 * @see https://core.telegram.org/bots/api#businessmessagesdeleted
 */
export type BusinessMessagesDeleted = {
  /**
   * Unique identifier of the business connection.
   */
  businessConnectionId: string
  /**
   * Information about a chat in the business account.
   * The bot may not have access to the chat or the corresponding user.
   */
  chat: Chat
  /**
   * The list of identifiers of deleted messages in the chat of the business account.
   */
  messageIds: number[]
}

/**
 * This object contains information about a paid media purchase.
 *
 * @see https://core.telegram.org/bots/api#paidmediapurchased
 */
export type PaidMediaPurchased = {
  /**
   * User who purchased the media.
   */
  from: User
  /**
   * Bot-specified paid media payload.
   */
  paidMediaPayload: string
}

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard.
 *
 * @see https://core.telegram.org/bots/api#callbackquery
 */
export type CallbackQuery = {
  /**
   * Unique identifier for this query.
   */
  id: string
  /**
   * Sender.
   */
  from: User
  /**
   * Message sent by the bot with the callback button that originated the query.
   */
  message?: Message
  /**
   * Identifier of the message sent via the bot in inline mode, that originated the query.
   */
  inlineMessageId?: string
  /**
   * Global identifier, uniquely corresponding to the chat to which the message
   * with the callback button was sent.
   */
  chatInstance: string
  /**
   * Data associated with the callback button.
   */
  data?: string
  /**
   * Short name of a Game to be returned.
   */
  gameShortName?: string
}

/**
 * This object represents an incoming update.
 *
 * At most one of the optional parameters can be present in any given update.
 *
 * @see https://core.telegram.org/bots/api#update
 */
export type Update = {
  /**
   * The update's unique identifier.
   *
   * Update identifiers start from a certain positive number and increase sequentially.
   * This identifier becomes especially handy if you're using webhooks,
   * since it allows you to ignore repeated updates or to restore the correct update sequence,
   * should they get out of order.
   *
   * If there are no new updates for at least a week, then identifier of the next update
   * will be chosen randomly instead of sequentially.
   */
  updateId: number

  // --- Message updates ---

  /**
   * New incoming message of any kind - text, photo, sticker, etc.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  message?: Message
  /**
   * New version of a message that is known to the bot and was edited.
   *
   * This update may at times be triggered by changes to message fields that are either
   * unavailable or not actively used by your bot.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  editedMessage?: Message
  /**
   * New incoming channel post of any kind - text, photo, sticker, etc.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  channelPost?: Message
  /**
   * New version of a channel post that is known to the bot and was edited.
   *
   * This update may at times be triggered by changes to message fields that are either
   * unavailable or not actively used by your bot.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  editedChannelPost?: Message

  // --- Business updates ---

  /**
   * The bot was connected to or disconnected from a business account,
   * or a user edited an existing connection with the bot.
   *
   * @see https://core.telegram.org/bots/api#businessconnection
   */
  businessConnection?: BusinessConnection
  /**
   * New message from a connected business account.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  businessMessage?: Message
  /**
   * New version of a message from a connected business account.
   *
   * @see https://core.telegram.org/bots/api#message
   */
  editedBusinessMessage?: Message
  /**
   * Messages were deleted from a connected business account.
   *
   * @see https://core.telegram.org/bots/api#businessmessagesdeleted
   */
  deletedBusinessMessages?: BusinessMessagesDeleted

  // --- Reaction updates ---

  /**
   * A reaction to a message was changed by a user.
   *
   * The bot must be an administrator in the chat and must explicitly specify `message_reaction`
   * in the list of `allowed_updates` to receive these updates.
   * The update isn't received for reactions set by bots.
   *
   * @see https://core.telegram.org/bots/api#messagereactionupdated
   */
  messageReaction?: MessageReactionUpdated
  /**
   * Reactions to a message with anonymous reactions were changed.
   *
   * The bot must be an administrator in the chat and must explicitly specify `message_reaction_count`
   * in the list of `allowed_updates` to receive these updates.
   * The updates are grouped and can be sent with delay up to a few minutes.
   *
   * @see https://core.telegram.org/bots/api#messagereactioncountupdated
   */
  messageReactionCount?: MessageReactionCountUpdated

  // --- Inline mode updates ---

  /**
   * New incoming inline query.
   *
   * @see https://core.telegram.org/bots/api#inlinequery
   */
  inlineQuery?: InlineQuery
  /**
   * The result of an inline query that was chosen by a user and sent to their chat partner.
   *
   * Please see our documentation on the feedback collecting for details on how to enable these updates for your bot.
   *
   * @see https://core.telegram.org/bots/api#choseninlineresult
   * @see https://core.telegram.org/bots/inline#collecting-feedback
   */
  chosenInlineResult?: ChosenInlineResult

  // --- Callback query ---

  /**
   * New incoming callback query.
   *
   * @see https://core.telegram.org/bots/api#callbackquery
   */
  callbackQuery?: CallbackQuery

  // --- Payment updates ---

  /**
   * New incoming shipping query. Only for invoices with flexible price.
   *
   * @see https://core.telegram.org/bots/api#shippingquery
   */
  shippingQuery?: ShippingQuery
  /**
   * New incoming pre-checkout query. Contains full information about checkout.
   *
   * @see https://core.telegram.org/bots/api#precheckoutquery
   */
  preCheckoutQuery?: PreCheckoutQuery
  /**
   * A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat.
   *
   * @see https://core.telegram.org/bots/api#paidmediapurchased
   */
  purchasedPaidMedia?: PaidMediaPurchased

  // --- Poll updates ---

  /**
   * New poll state.
   *
   * Bots receive only updates about manually stopped polls and polls, which are sent by the bot.
   *
   * @see https://core.telegram.org/bots/api#poll
   */
  poll?: Poll
  /**
   * A user changed their answer in a non-anonymous poll.
   *
   * Bots receive new votes only in polls that were sent by the bot itself.
   *
   * @see https://core.telegram.org/bots/api#pollanswer
   */
  pollAnswer?: PollAnswer

  // --- Chat member updates ---

  /**
   * The bot's chat member status was updated in a chat.
   *
   * For private chats, this update is received only when the bot is blocked or unblocked by the user.
   *
   * @see https://core.telegram.org/bots/api#chatmemberupdated
   */
  myChatMember?: ChatMemberUpdated
  /**
   * A chat member's status was updated in a chat.
   *
   * The bot must be an administrator in the chat and must explicitly specify `chat_member`
   * in the list of `allowed_updates` to receive these updates.
   *
   * @see https://core.telegram.org/bots/api#chatmemberupdated
   */
  chatMember?: ChatMemberUpdated
  /**
   * A request to join the chat has been sent.
   *
   * The bot must have the `can_invite_users` administrator right in the chat to receive these updates.
   *
   * @see https://core.telegram.org/bots/api#chatjoinrequest
   */
  chatJoinRequest?: ChatJoinRequest

  // --- Chat boost updates ---

  /**
   * A chat boost was added or changed.
   *
   * The bot must be an administrator in the chat to receive these updates.
   *
   * @see https://core.telegram.org/bots/api#chatboostupdated
   */
  chatBoost?: ChatBoostUpdated
  /**
   * A boost was removed from a chat.
   *
   * The bot must be an administrator in the chat to receive these updates.
   *
   * @see https://core.telegram.org/bots/api#chatboostremoved
   */
  removedChatBoost?: ChatBoostRemoved
}

/**
 * Type of updates the bot can receive.
 *
 * Used to specify which types of updates you want your bot to receive in `allowedUpdates`.
 *
 * @see https://core.telegram.org/bots/api#update
 * @see https://core.telegram.org/bots/api#setwebhook
 */
export type UpdateType =
  | 'message'
  | 'edited_message'
  | 'channel_post'
  | 'edited_channel_post'
  | 'business_connection'
  | 'business_message'
  | 'edited_business_message'
  | 'deleted_business_messages'
  | 'message_reaction'
  | 'message_reaction_count'
  | 'inline_query'
  | 'chosen_inline_result'
  | 'callback_query'
  | 'shipping_query'
  | 'pre_checkout_query'
  | 'purchased_paid_media'
  | 'poll'
  | 'poll_answer'
  | 'my_chat_member'
  | 'chat_member'
  | 'chat_join_request'
  | 'chat_boost'
  | 'removed_chat_boost'

/**
 * This object describes a message that was deleted or is otherwise inaccessible to the bot.
 *
 * @see https://core.telegram.org/bots/api#inaccessiblemessage
 */
export type InaccessibleMessage = {
  /**
   * Chat the message belonged to.
   */
  chat: Chat
  /**
   * Unique message identifier inside the chat.
   */
  messageId: number
  /**
   * Always 0. The field can be used to differentiate regular and inaccessible messages.
   */
  date: 0
}

/**
 * This object describes a message that can be inaccessible to the bot.
 *
 * It can be one of:
 * - Message
 * - InaccessibleMessage
 *
 * @see https://core.telegram.org/bots/api#maybeinaccessiblemessage
 */
export type MaybeInaccessibleMessage = Message | InaccessibleMessage

/**
 * Describes the current status of a webhook.
 *
 * @see https://core.telegram.org/bots/api#webhookinfo
 */
export type WebhookInfo = {
  /**
   * Webhook URL, may be empty if webhook is not set up.
   */
  url: string
  /**
   * `true` if a custom certificate was provided for webhook certificate checks.
   */
  hasCustomCertificate: boolean
  /**
   * Number of updates awaiting delivery.
   */
  pendingUpdateCount: number
  /**
   * Currently used webhook IP address.
   */
  ipAddress?: string
  /**
   * Unix time for the most recent error that happened when trying to deliver an update via webhook.
   */
  lastErrorDate?: number
  /**
   * Error message in human-readable format for the most recent error.
   */
  lastErrorMessage?: string
  /**
   * Unix time of the most recent error that happened when trying to synchronize available updates.
   */
  lastSynchronizationErrorDate?: number
  /**
   * The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery.
   */
  maxConnections?: number
  /**
   * A list of update types the bot is subscribed to.
   *
   * @see UpdateType for type-safe values
   */
  allowedUpdates?: UpdateType[]
}
