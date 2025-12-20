import type { ActionContext, Result } from '@triggerskit/core/types'
import { fail, ok, safeParse } from '@triggerskit/core/utils'
import {
  type DeleteWebhookParams,
  DeleteWebhookParamsSchema,
  type SetWebhookParams,
  SetWebhookParamsSchema,
  type WebhookInfo,
  WebhookInfoSchema,
} from '../schemas'

type BoolResponse = { ok: boolean; result: boolean }
type InfoResponse = { ok: boolean; result: unknown }

/** Set webhook URL */
export function setWebhook(ctx: ActionContext) {
  return async (params: SetWebhookParams): Promise<Result<boolean>> => {
    try {
      const validated = safeParse(SetWebhookParamsSchema, params)
      if (validated.error) return validated

      const response = await ctx.request<BoolResponse>('/setWebhook', {
        method: 'POST',
        body: JSON.stringify(validated.data),
      })

      return ok(response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

/** Delete webhook */
export function deleteWebhook(ctx: ActionContext) {
  return async (params?: DeleteWebhookParams): Promise<Result<boolean>> => {
    try {
      if (params) {
        const validated = safeParse(DeleteWebhookParamsSchema, params)
        if (validated.error) return validated
      }

      const response = await ctx.request<BoolResponse>('/deleteWebhook', {
        method: 'POST',
        body: JSON.stringify(params ?? {}),
      })

      return ok(response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

/** Get webhook info */
export function getWebhookInfo(ctx: ActionContext) {
  return async (): Promise<Result<WebhookInfo>> => {
    try {
      const response = await ctx.request<InfoResponse>('/getWebhookInfo')
      return safeParse(WebhookInfoSchema, response.result)
    } catch (e) {
      return fail(e)
    }
  }
}

export type { DeleteWebhookParams, SetWebhookParams, WebhookInfo }
