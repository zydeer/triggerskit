import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import type { TelegramContext, User } from '../types'

/**
 * Response data returned from the getMe method.
 *
 * @see https://core.telegram.org/bots/api#getme
 * @see https://core.telegram.org/bots/api#user
 */
export type GetMeData = User

type TelegramApiResponse = {
  ok: boolean
  result: {
    id: number
    is_bot: boolean
    first_name: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: boolean
    added_to_attachment_menu?: boolean
    can_join_groups?: boolean
    can_read_all_group_messages?: boolean
    supports_inline_queries?: boolean
    can_connect_to_business?: boolean
    has_main_web_app?: boolean
  }
}

export function getMe(ctx: TelegramContext) {
  return async (): Promise<Result<GetMeData>> => {
    try {
      const response = await ctx.request<TelegramApiResponse>('/getMe', {
        method: 'GET',
      })

      return ok(transformResponseToUser(response.result))
    } catch (e) {
      return fail(e)
    }
  }
}

function transformResponseToUser(result: TelegramApiResponse['result']): User {
  const user: User = {
    id: result.id,
    isBot: result.is_bot,
    firstName: result.first_name,
  }

  if (result.last_name !== undefined) {
    user.lastName = result.last_name
  }

  if (result.username !== undefined) {
    user.username = result.username
  }

  if (result.language_code !== undefined) {
    user.languageCode = result.language_code
  }

  if (result.is_premium !== undefined) {
    user.isPremium = result.is_premium
  }

  if (result.added_to_attachment_menu !== undefined) {
    user.addedToAttachmentMenu = result.added_to_attachment_menu
  }

  if (result.can_join_groups !== undefined) {
    user.canJoinGroups = result.can_join_groups
  }

  if (result.can_read_all_group_messages !== undefined) {
    user.canReadAllGroupMessages = result.can_read_all_group_messages
  }

  if (result.supports_inline_queries !== undefined) {
    user.supportsInlineQueries = result.supports_inline_queries
  }

  if (result.can_connect_to_business !== undefined) {
    user.canConnectToBusiness = result.can_connect_to_business
  }

  if (result.has_main_web_app !== undefined) {
    user.hasMainWebApp = result.has_main_web_app
  }

  return user
}
