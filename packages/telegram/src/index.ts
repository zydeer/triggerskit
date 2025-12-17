import type { ProviderInstance, Result } from '@triggerskit/core/types'
import { type GetMeData, getMe } from './actions/get-me'
import {
  type SendMessageData,
  type SendMessageParams,
  sendMessage,
} from './actions/send-message'
import { createRequest } from './request'
import type { TelegramConfig } from './types'

export type TelegramActions = {
  sendMessage: (params: SendMessageParams) => Promise<Result<SendMessageData>>
  getMe: () => Promise<Result<GetMeData>>
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

export type { GetMeData } from './actions/get-me'
export type { SendMessageData, SendMessageParams } from './actions/send-message'
export type { TelegramConfig, TelegramContext } from './types'
