import {
  type EventEmitter,
  fail,
  ok,
  parse,
  type Result,
  type WebhookContext,
} from '@triggerskit/core'
import type { SlackEvents } from './events'
import {
  type SlackEvent,
  UrlVerificationSchema,
  WebhookPayloadSchema,
} from './schemas'

async function verifySlackSignature(
  signingSecret: string,
  timestamp: string,
  body: string,
  signature: string,
): Promise<boolean> {
  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5
  if (Number.parseInt(timestamp, 10) < fiveMinutesAgo) return false

  const baseString = `v0:${timestamp}:${body}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signingSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(baseString),
  )

  const computedSignature = `v0=${Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')}`

  return computedSignature === signature
}

export function createWebhookHandler(
  emitter: EventEmitter<SlackEvents>,
  signingSecret?: string,
) {
  return async (request: Request): Promise<Result<SlackEvent>> => {
    try {
      const body = await request.text()
      const timestamp = request.headers.get('x-slack-request-timestamp')
      const signature = request.headers.get('x-slack-signature')

      if (signingSecret && timestamp && signature) {
        const isValid = await verifySlackSignature(
          signingSecret,
          timestamp,
          body,
          signature,
        )

        if (!isValid) {
          return fail({ message: 'Invalid Slack signature' })
        }
      }

      const payload = JSON.parse(body)

      const parsed = parse(WebhookPayloadSchema, payload)

      if (!parsed.ok) return parsed

      if (parsed.data.type === 'url_verification') {
        const verification = parse(UrlVerificationSchema, parsed.data)

        if (!verification.ok) return verification

        return ok({
          team_id: '',
          api_app_id: '',
          event: { type: 'url_verification' },
          type: 'event_callback',
          event_id: '',
          event_time: 0,
          challenge: verification.data.challenge,
        })
      }

      const event = parsed.data
      const eventType = event.event.type

      emitter.emit(eventType, event.event)

      return ok(event)
    } catch (e) {
      return fail(e)
    }
  }
}

export function detectSlack(ctx: WebhookContext): boolean {
  return (
    ctx.headers.has('x-slack-signature') ||
    ctx.headers.get('user-agent')?.includes('Slackbot') ||
    false
  )
}
