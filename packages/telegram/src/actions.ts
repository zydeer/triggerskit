import { type HttpClient, ok, parse, type Result } from '@triggerskit/core'
import {
  type GetMeData,
  GetMeDataSchema,
  type Message,
  MessageSchema,
  type SendMessageParams,
  SendMessageParamsSchema,
  type WebhookInfo,
  WebhookInfoSchema,
} from './schemas'
import type {
  DeleteWebhookParams,
  SetWebhookParams,
  TelegramActions,
  TelegramWebhooks,
} from './types'

interface ApiResponse<T = unknown> {
  ok: boolean
  result: T
}

export function createActions(http: HttpClient): TelegramActions {
  return {
    async getMe(): Promise<Result<GetMeData>> {
      const result = await http<ApiResponse>('/getMe')
      if (!result.ok) return result
      return parse(GetMeDataSchema, result.data.result)
    },

    async sendMessage(params: SendMessageParams): Promise<Result<Message>> {
      const validated = parse(SendMessageParamsSchema, params)
      if (!validated.ok) return validated

      const result = await http<ApiResponse>('/sendMessage', {
        method: 'POST',
        body: JSON.stringify(validated.data),
      })
      if (!result.ok) return result
      return parse(MessageSchema, result.data.result)
    },
  }
}

export function createWebhookActions(
  http: HttpClient,
  handle: TelegramWebhooks['handle'],
): TelegramWebhooks {
  return {
    handle,

    async set(params: SetWebhookParams): Promise<Result<boolean>> {
      const result = await http<ApiResponse<boolean>>('/setWebhook', {
        method: 'POST',
        body: JSON.stringify(params),
      })
      if (!result.ok) return result
      return ok(result.data.result)
    },

    async delete(params?: DeleteWebhookParams): Promise<Result<boolean>> {
      const result = await http<ApiResponse<boolean>>('/deleteWebhook', {
        method: 'POST',
        body: JSON.stringify(params ?? {}),
      })
      if (!result.ok) return result
      return ok(result.data.result)
    },

    async info(): Promise<Result<WebhookInfo>> {
      const result = await http<ApiResponse>('/getWebhookInfo')
      if (!result.ok) return result
      return parse(WebhookInfoSchema, result.data.result)
    },
  }
}
