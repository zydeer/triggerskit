import type { HttpClient } from '@triggerskit/core/http'
import { parse, type Result, unwrap } from '@triggerskit/core/result'
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
      return unwrap(await http<ApiResponse>('/getMe'), {
        extract: (data) => data.result,
        schema: GetMeDataSchema,
      })
    },

    async sendMessage(params: SendMessageParams): Promise<Result<Message>> {
      const validated = parse(SendMessageParamsSchema, params)
      if (!validated.ok) return validated

      return unwrap(
        await http<ApiResponse>('/sendMessage', {
          method: 'POST',
          body: JSON.stringify(validated.data),
        }),
        {
          extract: (data) => data.result,
          schema: MessageSchema,
        },
      )
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
      return unwrap(
        await http<ApiResponse<boolean>>('/setWebhook', {
          method: 'POST',
          body: JSON.stringify(params),
        }),
        {
          extract: (data) => data.result,
        },
      )
    },

    async delete(params?: DeleteWebhookParams): Promise<Result<boolean>> {
      return unwrap(
        await http<ApiResponse<boolean>>('/deleteWebhook', {
          method: 'POST',
          body: JSON.stringify(params ?? {}),
        }),
        {
          extract: (data) => data.result,
        },
      )
    },

    async info(): Promise<Result<WebhookInfo>> {
      return unwrap(await http<ApiResponse>('/getWebhookInfo'), {
        extract: (data) => data.result,
        schema: WebhookInfoSchema,
      })
    },
  }
}
