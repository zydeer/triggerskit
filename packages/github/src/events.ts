import type { EventMap } from '@triggerskit/core/events'
import type {
  CheckRunEvent,
  CheckSuiteEvent,
  CreateEvent,
  DeleteEvent,
  DeploymentEvent,
  DeploymentStatusEvent,
  ForkEvent,
  IssueCommentEvent,
  IssuesEvent,
  PingEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  PushEvent,
  ReleaseEvent,
  StarEvent,
  WatchEvent,
  WebhookEvent,
  WorkflowRunEvent,
} from './schemas'

export interface GitHubEvents extends EventMap {
  /** Push event - commits pushed to a repository */
  push: PushEvent
  /** Issues event - issue opened, closed, edited, etc. */
  issues: IssuesEvent
  /** Pull request event - PR opened, closed, merged, etc. */
  pull_request: PullRequestEvent
  /** Issue comment event - comment created, edited, or deleted */
  issue_comment: IssueCommentEvent
  /** Pull request review event - review submitted, edited, or dismissed */
  pull_request_review: PullRequestReviewEvent
  /** Star event - repository starred or unstarred */
  star: StarEvent
  /** Fork event - repository forked */
  fork: ForkEvent
  /** Release event - release published, unpublished, created, etc. */
  release: ReleaseEvent
  /** Watch event - repository starred (legacy event) */
  watch: WatchEvent
  /** Create event - branch or tag created */
  create: CreateEvent
  /** Delete event - branch or tag deleted */
  delete: DeleteEvent
  /** Workflow run event - GitHub Actions workflow run completed or started */
  workflow_run: WorkflowRunEvent
  /** Check run event - check run created, completed, etc. */
  check_run: CheckRunEvent
  /** Check suite event - check suite completed, requested, etc. */
  check_suite: CheckSuiteEvent
  /** Deployment event - deployment created */
  deployment: DeploymentEvent
  /** Deployment status event - deployment status updated */
  deployment_status: DeploymentStatusEvent
  /** Ping event - webhook created or tested */
  ping: PingEvent
  /** Generic webhook event for unhandled types */
  webhook: WebhookEvent
}
