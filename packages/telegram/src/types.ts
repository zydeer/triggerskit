import type { ActionContext } from '@triggerskit/core/types'

export type TelegramErrorDetails = { errorCode: number }

/**
 * Configuration options for the Telegram provider.
 *
 * @see https://core.telegram.org/bots/api#authorizing-your-bot
 */
export type TelegramConfig = {
  /**
   * Bot token obtained from @BotFather on Telegram.
   *
   * @see https://core.telegram.org/bots#how-do-i-create-a-bot
   */
  token: string
  /**
   * Base URL for Telegram API. Defaults to 'https://api.telegram.org'.
   */
  baseUrl?: string
  /**
   * Request timeout in milliseconds. Defaults to 30000 (30 seconds).
   */
  timeout?: number
}

export type TelegramContext = ActionContext

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
   * `true` if the message is sent to a forum topic.
   */
  isTopicMessage?: boolean
  /**
   * `true` if the message was sent by an implicit action, for example,
   * as an away or a greeting business message, or as a scheduled message.
   */
  isAutomaticForward?: boolean
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
   * The unique identifier of a media message group this message belongs to.
   */
  mediaGroupId?: string
  /**
   * Signature of the post author for messages in channels,
   * or the custom title of an anonymous group administrator.
   */
  authorSignature?: string
  /**
   * For replies in the same chat and message thread, the original message.
   *
   * Note that the Message object in this field will not contain
   * further `replyToMessage` fields even if it itself is a reply.
   */
  replyToMessage?: Message
}

/**
 * Mode for parsing entities in the message text.
 *
 * @see https://core.telegram.org/bots/api#formatting-options
 */
export type ParseMode = 'Markdown' | 'MarkdownV2' | 'HTML'
