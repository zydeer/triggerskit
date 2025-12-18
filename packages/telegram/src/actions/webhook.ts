import type { Result } from '@triggerskit/core/types'
import { fail, ok } from '@triggerskit/core/utils'
import { type ApiWebhookInfo, fromApi } from '../api'
import type { TelegramContext, WebhookInfo } from '../types'

/**
 * Parameters for setting a webhook.
 *
 * @see https://core.telegram.org/bots/api#setwebhook
 */
export type SetWebhookParams = {
  /**
   * HTTPS URL to send updates to. Use an empty string to remove webhook integration.
   */
  url: string
  /**
   * The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS.
   */
  ipAddress?: string
  /**
   * The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40.
   */
  maxConnections?: number
  /**
   * A list of the update types you want your bot to receive.
   *
   * @example ['message', 'callback_query']
   */
  allowedUpdates?: string[]
  /**
   * Pass `true` to drop all pending updates.
   */
  dropPendingUpdates?: boolean
  /**
   * A secret token to be sent in a header "X-Telegram-Bot-Api-Secret-Token" in every webhook request, 1-256 characters.
   */
  secretToken?: string
}

/**
 * Parameters for deleting a webhook.
 *
 * @see https://core.telegram.org/bots/api#deletewebhook
 */
export type DeleteWebhookParams = {
  /**
   * Pass `true` to drop all pending updates.
   */
  dropPendingUpdates?: boolean
}

type BooleanResponse = { ok: boolean; result: boolean }
type WebhookInfoResponse = { ok: boolean; result: ApiWebhookInfo }

export function setWebhook(ctx: TelegramContext) {
  return async (params: SetWebhookParams): Promise<Result<boolean>> => {
    try {
      const body: Record<string, unknown> = { url: params.url }

      if (params.ipAddress !== undefined) body.ip_address = params.ipAddress
      if (params.maxConnections !== undefined)
        body.max_connections = params.maxConnections
      if (params.allowedUpdates !== undefined)
        body.allowed_updates = params.allowedUpdates
      if (params.dropPendingUpdates !== undefined)
        body.drop_pending_updates = params.dropPendingUpdates
      if (params.secretToken !== undefined)
        body.secret_token = params.secretToken

      const response = await ctx.request<BooleanResponse>('/setWebhook', {
        method: 'POST',
        body: JSON.stringify(body),
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
      const body: Record<string, unknown> = {}

      if (params?.dropPendingUpdates !== undefined)
        body.drop_pending_updates = params.dropPendingUpdates

      const response = await ctx.request<BooleanResponse>('/deleteWebhook', {
        method: 'POST',
        body: JSON.stringify(body),
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

      return ok(fromApi.webhookInfo(response.result))
    } catch (e) {
      return fail(e)
    }
  }
}
