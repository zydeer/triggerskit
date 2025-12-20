import {
  fail,
  type HttpClient,
  ok,
  parse,
  type Result,
} from '@triggerskit/core'
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
      try {
        const response = await http<ApiResponse>('/getMe')
        return parse(GetMeDataSchema, response.result)
      } catch (e) {
        return fail(e)
      }
    },

    async sendMessage(params: SendMessageParams): Promise<Result<Message>> {
      try {
        const validated = parse(SendMessageParamsSchema, params)
        if (!validated.ok) return validated

        const response = await http<ApiResponse>('/sendMessage', {
          method: 'POST',
          body: JSON.stringify(validated.data),
        })

        return parse(MessageSchema, response.result)
      } catch (e) {
        return fail(e)
      }
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
      try {
        const response = await http<ApiResponse<boolean>>('/setWebhook', {
          method: 'POST',
          body: JSON.stringify(params),
        })
        return ok(response.result)
      } catch (e) {
        return fail(e)
      }
    },

    async delete(params?: DeleteWebhookParams): Promise<Result<boolean>> {
      try {
        const response = await http<ApiResponse<boolean>>('/deleteWebhook', {
          method: 'POST',
          body: JSON.stringify(params ?? {}),
        })
        return ok(response.result)
      } catch (e) {
        return fail(e)
      }
    },

    async info(): Promise<Result<WebhookInfo>> {
      try {
        const response = await http<ApiResponse>('/getWebhookInfo')
        return parse(WebhookInfoSchema, response.result)
      } catch (e) {
        return fail(e)
      }
    },
  }
}
