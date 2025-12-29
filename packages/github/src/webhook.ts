import type { EventEmitter } from '@triggerskit/core/events'
import type { WebhookContext } from '@triggerskit/core/provider'
import { err, parse, type Result } from '@triggerskit/core/result'
import type { GitHubEvents } from './events'
import {
  CheckRunEventSchema,
  CheckSuiteEventSchema,
  CreateEventSchema,
  DeleteEventSchema,
  DeploymentEventSchema,
  DeploymentStatusEventSchema,
  ForkEventSchema,
  IssueCommentEventSchema,
  IssuesEventSchema,
  PingEventSchema,
  PullRequestEventSchema,
  PullRequestReviewEventSchema,
  PushEventSchema,
  ReleaseEventSchema,
  StarEventSchema,
  WatchEventSchema,
  type WebhookEvent,
  WebhookEventSchema,
  WorkflowRunEventSchema,
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

        case 'issue_comment': {
          const result = parse(IssueCommentEventSchema, body)
          if (result.ok) emitter.emit('issue_comment', result.data)
          return result
        }

        case 'pull_request_review': {
          const result = parse(PullRequestReviewEventSchema, body)
          if (result.ok) emitter.emit('pull_request_review', result.data)
          return result
        }

        case 'star': {
          const result = parse(StarEventSchema, body)
          if (result.ok) emitter.emit('star', result.data)
          return result
        }

        case 'fork': {
          const result = parse(ForkEventSchema, body)
          if (result.ok) emitter.emit('fork', result.data)
          return result
        }

        case 'release': {
          const result = parse(ReleaseEventSchema, body)
          if (result.ok) emitter.emit('release', result.data)
          return result
        }

        case 'watch': {
          const result = parse(WatchEventSchema, body)
          if (result.ok) emitter.emit('watch', result.data)
          return result
        }

        case 'create': {
          const result = parse(CreateEventSchema, body)
          if (result.ok) emitter.emit('create', result.data)
          return result
        }

        case 'delete': {
          const result = parse(DeleteEventSchema, body)
          if (result.ok) emitter.emit('delete', result.data)
          return result
        }

        case 'workflow_run': {
          const result = parse(WorkflowRunEventSchema, body)
          if (result.ok) emitter.emit('workflow_run', result.data)
          return result
        }

        case 'check_run': {
          const result = parse(CheckRunEventSchema, body)
          if (result.ok) emitter.emit('check_run', result.data)
          return result
        }

        case 'check_suite': {
          const result = parse(CheckSuiteEventSchema, body)
          if (result.ok) emitter.emit('check_suite', result.data)
          return result
        }

        case 'deployment': {
          const result = parse(DeploymentEventSchema, body)
          if (result.ok) emitter.emit('deployment', result.data)
          return result
        }

        case 'deployment_status': {
          const result = parse(DeploymentStatusEventSchema, body)
          if (result.ok) emitter.emit('deployment_status', result.data)
          return result
        }

        case 'ping': {
          const result = parse(PingEventSchema, body)
          if (result.ok) emitter.emit('ping', result.data)
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
