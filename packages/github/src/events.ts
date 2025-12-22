import type { EventMap } from '@triggerskit/core/events'
import type {
  IssuesEvent,
  PullRequestEvent,
  PushEvent,
  WebhookEvent,
} from './schemas'

export interface GitHubEvents extends EventMap {
  /** Push event - commits pushed to a repository */
  push: PushEvent
  /** Issues event - issue opened, closed, edited, etc. */
  issues: IssuesEvent
  /** Pull request event - PR opened, closed, merged, etc. */
  pull_request: PullRequestEvent
  /** Generic webhook event for unhandled types */
  webhook: WebhookEvent
}
