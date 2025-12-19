import type { Result } from '@triggerskit/core/types'
import { fail, ok, safeParse } from '@triggerskit/core/utils'
import type { TelegramContext } from '..'
import {
  type DeleteWebhookParams,
  DeleteWebhookParamsSchema,
  type SetWebhookParams,
  SetWebhookParamsSchema,
  type WebhookInfo,
  WebhookInfoSchema,
} from '../schemas'

type BooleanResponse = { ok: boolean; result: boolean }
type WebhookInfoResponse = { ok: boolean; result: unknown }

export function setWebhook(ctx: TelegramContext) {
  return async (params: SetWebhookParams): Promise<Result<boolean>> => {
    try {
      const paramsResult = safeParse(SetWebhookParamsSchema, params)

      if (paramsResult.error) {
        return paramsResult
      }

      const response = await ctx.request<BooleanResponse>('/setWebhook', {
        method: 'POST',
        body: JSON.stringify(paramsResult.data),
      })

      return ok(response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export function deleteWebhook(ctx: TelegramContext) {
  return async (params?: DeleteWebhookParams): Promise<Result<boolean>> => {
    try {
      if (params) {
        const paramsResult = safeParse(DeleteWebhookParamsSchema, params)
        if (paramsResult.error) {
          return paramsResult
        }
        params = paramsResult.data
      }

      const response = await ctx.request<BooleanResponse>('/deleteWebhook', {
        method: 'POST',
        body: JSON.stringify(params || {}),
      })

      return ok(response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export function getWebhookInfo(ctx: TelegramContext) {
  return async (): Promise<Result<WebhookInfo>> => {
    try {
      const response = await ctx.request<WebhookInfoResponse>('/getWebhookInfo')

      return safeParse(WebhookInfoSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { DeleteWebhookParams, SetWebhookParams, WebhookInfo }
