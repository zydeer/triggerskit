import type { TelegramContext } from '../types'

export type GetMeResult = {
  ok: boolean
  id: number
  isBot: boolean
  firstName: string
  username?: string
}

type Response = {
  ok: boolean
  result?: {
    id: number
    is_bot: boolean
    first_name: string
    username?: string
  }
}

export function getMe(ctx: TelegramContext) {
  return async (): Promise<GetMeResult> => {
    const data = await ctx.request<Response>('/getMe')

    return {
      ok: data.ok ?? false,
      id: data.result?.id ?? 0,
      isBot: data.result?.is_bot ?? false,
      firstName: data.result?.first_name ?? '',
      username: data.result?.username,
    }
  }
}
