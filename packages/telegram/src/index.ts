import type { ProviderInstance } from '@triggerskit/core'
import { type GetMeResult, getMe } from './actions/get-me'
import {
  type SendMessageParams,
  type SendMessageResult,
  sendMessage,
} from './actions/send-message'
import { createRequest } from './request'
import type { TelegramConfig } from './types'

export type TelegramActions = {
  sendMessage: (params: SendMessageParams) => Promise<SendMessageResult>
  getMe: () => Promise<GetMeResult>
}

export function telegram(
  config: TelegramConfig,
): ProviderInstance<'telegram', TelegramActions> {
  const request = createRequest(config)
  const ctx = { request }

  return {
    provider: 'telegram' as const,
    actions: {
      sendMessage: sendMessage(ctx),
      getMe: getMe(ctx),
    },
    request,
  }
}

export type { TelegramConfig, TelegramContext } from './types'
