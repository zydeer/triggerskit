import type {
  GetMeResult,
  SendMessageParams,
  SendMessageResult,
  TelegramConfig,
  TelegramInstance,
} from './types'

export function telegram(config: TelegramConfig): TelegramInstance {
  const baseUrl = config.baseUrl ?? 'https://api.telegram.org'

  async function sendMessage(
    params: SendMessageParams,
  ): Promise<SendMessageResult> {
    const response = await fetch(`${baseUrl}/bot${config.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    const data = await response.json()
    return {
      ok: data.ok ?? false,
      message_id: data.result?.message_id ?? 0,
    }
  }

  async function getMe(): Promise<GetMeResult> {
    const response = await fetch(`${baseUrl}/bot${config.token}/getMe`)
    const data = await response.json()

    return {
      ok: data.ok ?? false,
      id: data.result?.id ?? 0,
      is_bot: data.result?.is_bot ?? false,
      first_name: data.result?.first_name ?? '',
      username: data.result?.username,
    }
  }

  return {
    provider: 'telegram' as const,
    sendMessage,
    getMe,
  }
}

export type {
  TelegramConfig,
  TelegramInstance,
  SendMessageParams,
  SendMessageResult,
  GetMeResult,
}
