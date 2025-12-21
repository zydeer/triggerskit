import {
  type EventEmitter,
  err,
  parse,
  type Result,
  type WebhookContext,
} from '@triggerskit/core'
import type { GitHubEvents } from './events'
import {
  IssuesEventSchema,
  PullRequestEventSchema,
  PushEventSchema,
  type WebhookEvent,
  WebhookEventSchema,
} from './schemas'

export function detectGitHub(ctx: WebhookContext): boolean {
  return (
    ctx.headers.has('x-github-event') || ctx.headers.has('x-hub-signature-256')
  )
}

export function createWebhookHandler(emitter: EventEmitter<GitHubEvents>) {
  return async function handleWebhook(
    request: Request,
  ): Promise<Result<WebhookEvent>> {
    try {
      const body = await request.json()
      const eventType = request.headers.get('x-github-event')

      switch (eventType) {
        case 'push': {
          const result = parse(PushEventSchema, body)
          if (result.ok) emitter.emit('push', result.data)
          return result
        }

        case 'issues': {
          const result = parse(IssuesEventSchema, body)
          if (result.ok) emitter.emit('issues', result.data)
          return result
        }

        case 'pull_request': {
          const result = parse(PullRequestEventSchema, body)
          if (result.ok) emitter.emit('pull_request', result.data)
          return result
        }

        default: {
          const result = parse(WebhookEventSchema, body)
          if (result.ok) emitter.emit('webhook', result.data)
          return result
        }
      }
    } catch (e) {
      return err(e)
    }
  }
}
