import type { GetMeResult, TelegramContext } from '../types'

type GetMeResponse = {
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
    const data = await ctx.request<GetMeResponse>('/getMe')

    return {
      ok: data.ok ?? false,
      id: data.result?.id ?? 0,
      is_bot: data.result?.is_bot ?? false,
      first_name: data.result?.first_name ?? '',
      username: data.result?.username,
    }
  }
}
