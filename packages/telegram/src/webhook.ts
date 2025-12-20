import {
  type EventEmitter,
  fail,
  ok,
  parse,
  type Result,
  type WebhookContext,
} from '@triggerskit/core'
import type { TelegramEvents } from './events'
import { type Update, UpdateSchema } from './schemas'

/** Check if the request is from Telegram */
export function detectTelegram(ctx: WebhookContext): boolean {
  return (
    ctx.headers.has('x-telegram-bot-api-secret-token') ||
    (typeof ctx.body === 'object' &&
      ctx.body !== null &&
      'update_id' in ctx.body)
  )
}

/** Create the webhook handler function */
export function createWebhookHandler(emitter: EventEmitter<TelegramEvents>) {
  return async function handleWebhook(
    request: Request,
  ): Promise<Result<Update>> {
    try {
      const body = await request.json()
      const result = parse(UpdateSchema, body)

      if (!result.ok) return result

      if (result.data.message) {
        emitter.emit('message', result.data.message)
      }

      return ok(result.data)
    } catch (e) {
      return fail(e)
    }
  }
}
