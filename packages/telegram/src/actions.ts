import type { HttpClient } from '@triggerskit/core/http'
import type { ProviderWebhooks } from '@triggerskit/core/provider'
import { parse, unwrap } from '@triggerskit/core/result'
import {
  GetMeDataSchema,
  MessageSchema,
  type SendMessageParams,
  SendMessageParamsSchema,
  type Update,
  WebhookInfoSchema,
} from './schemas'

interface ApiResponse<T = unknown> {
  ok: boolean
  result: T
}

export interface SetWebhookParams {
  /** HTTPS URL to send updates to */
  url: string
  /** Upload your public key certificate */
  certificate?: string
  /** Fixed IP address for webhook */
  ip_address?: string
  /** Maximum allowed connections (1-100, default: 40) */
  max_connections?: number
  /** List of update types to receive */
  allowed_updates?: string[]
  /** Pass True to drop all pending updates */
  drop_pending_updates?: boolean
  /** Secret token to be sent in header */
  secret_token?: string
}

export interface DeleteWebhookParams {
  /** Pass True to drop all pending updates */
  drop_pending_updates?: boolean
}

export function createActions(http: HttpClient) {
  return {
    /**
     * Get information about the bot.
     * @returns Bot information including username, id, and capabilities
     */
    async getMe() {
      return unwrap(await http<ApiResponse>('/getMe'), {
        extract: (data) => data.result,
        schema: GetMeDataSchema,
      })
    },

    /**
     * Send a text message to a chat.
     * @param params - Message parameters including chat_id and text
     * @returns The sent message object
     */
    async sendMessage(params: SendMessageParams) {
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

/**
 * Creates Telegram webhook management actions.
 */
export function createWebhookActions(
  http: HttpClient,
  handle: ProviderWebhooks<Update>['handle'],
) {
  return {
    handle,

    /**
     * Set webhook URL for receiving updates.
     * @param params - Webhook configuration including URL and optional settings
     * @returns Success status
     */
    async set(params: SetWebhookParams) {
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

    /**
     * Delete the webhook.
     * @param params - Optional parameters to drop pending updates
     * @returns Success status
     */
    async delete(params?: DeleteWebhookParams) {
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

    /**
     * Get current webhook information.
     * @returns Webhook configuration and status
     */
    async info() {
      return unwrap(await http<ApiResponse>('/getWebhookInfo'), {
        extract: (data) => data.result,
        schema: WebhookInfoSchema,
      })
    },
  }
}
