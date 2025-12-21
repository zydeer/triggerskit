import { z } from 'zod'

/**
 * Represents a GitHub user or organization account.
 *
 * @see https://docs.github.com/en/rest/users/users
 */
export const UserSchema = z
  .object({
    login: z.string().meta({ description: 'The username of the account.' }),
    id: z.number().meta({ description: 'Unique identifier for the user.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    avatar_url: z.string().meta({ description: 'URL of the user avatar.' }),
    gravatar_id: z
      .string()
      .nullable()
      .meta({ description: 'Gravatar ID (may be null).' }),
    url: z.string().meta({ description: 'API URL for the user.' }),
    html_url: z.string().meta({ description: 'Web URL for the user profile.' }),
    type: z.string().meta({ description: 'Account type (e.g., User, Bot).' }),
    site_admin: z
      .boolean()
      .meta({ description: 'Whether the user is a site administrator.' }),
    name: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Display name of the user.' }),
    company: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Company affiliation.' }),
    blog: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Blog or website URL.' }),
    location: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Geographic location.' }),
    email: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Email address.' }),
    bio: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Biography or description.' }),
    twitter_username: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Twitter/X username.' }),
    public_repos: z
      .number()
      .optional()
      .meta({ description: 'Number of public repositories.' }),
    public_gists: z
      .number()
      .optional()
      .meta({ description: 'Number of public gists.' }),
    followers: z
      .number()
      .optional()
      .meta({ description: 'Number of followers.' }),
    following: z
      .number()
      .optional()
      .meta({ description: 'Number of users being followed.' }),
    created_at: z
      .string()
      .optional()
      .meta({ description: 'ISO 8601 timestamp of account creation.' }),
    updated_at: z
      .string()
      .optional()
      .meta({ description: 'ISO 8601 timestamp of last account update.' }),
  })
  .meta({
    description: 'Represents a GitHub user or organization account.',
  })

export type User = z.infer<typeof UserSchema>

/**
 * Represents a GitHub repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos
 */
export const RepositorySchema = z
  .object({
    id: z
      .number()
      .meta({ description: 'Unique identifier for the repository.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    name: z.string().meta({ description: 'Repository name.' }),
    full_name: z
      .string()
      .meta({ description: 'Full name including owner (e.g., owner/repo).' }),
    private: z
      .boolean()
      .meta({ description: 'Whether the repository is private.' }),
    owner: UserSchema.meta({ description: 'Repository owner.' }),
    html_url: z.string().meta({ description: 'Web URL for the repository.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Repository description.' }),
    fork: z.boolean().meta({ description: 'Whether this is a fork.' }),
    url: z.string().meta({ description: 'API URL for the repository.' }),
    created_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp of repository creation.' }),
    updated_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp of last update.' }),
    pushed_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp of last push.' }),
    homepage: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Homepage URL.' }),
    size: z.number().optional().meta({ description: 'Size in kilobytes.' }),
    stargazers_count: z
      .number()
      .optional()
      .meta({ description: 'Number of stars.' }),
    watchers_count: z
      .number()
      .optional()
      .meta({ description: 'Number of watchers.' }),
    language: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Primary programming language.' }),
    forks_count: z
      .number()
      .optional()
      .meta({ description: 'Number of forks.' }),
    open_issues_count: z
      .number()
      .optional()
      .meta({ description: 'Number of open issues.' }),
    default_branch: z
      .string()
      .optional()
      .meta({ description: 'Default branch name.' }),
    topics: z
      .array(z.string())
      .optional()
      .meta({ description: 'Repository topics/tags.' }),
    visibility: z
      .string()
      .optional()
      .meta({ description: 'Visibility level (public, private, internal).' }),
    archived: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the repository is archived.' }),
    disabled: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the repository is disabled.' }),
  })
  .meta({
    description: 'Represents a GitHub repository.',
  })

export type Repository = z.infer<typeof RepositorySchema>

/**
 * Represents a label for issues and pull requests.
 *
 * @see https://docs.github.com/en/rest/issues/labels
 */
export const LabelSchema = z
  .object({
    id: z.number().meta({ description: 'Unique identifier for the label.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the label.' }),
    name: z.string().meta({ description: 'Label name.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Label description.' }),
    color: z
      .string()
      .meta({ description: 'Label color (hex code without #).' }),
    default: z
      .boolean()
      .meta({ description: 'Whether this is a default GitHub label.' }),
  })
  .meta({
    description: 'Represents a label for issues and pull requests.',
  })

export type Label = z.infer<typeof LabelSchema>

/**
 * Represents a milestone for issues and pull requests.
 *
 * @see https://docs.github.com/en/rest/issues/milestones
 */
export const MilestoneSchema = z
  .object({
    id: z
      .number()
      .meta({ description: 'Unique identifier for the milestone.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    number: z.number().meta({ description: 'Milestone number.' }),
    title: z.string().meta({ description: 'Milestone title.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Milestone description.' }),
    state: z
      .enum(['open', 'closed'])
      .meta({ description: 'Current state of the milestone.' }),
    created_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of milestone creation.' }),
    updated_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of last update.' }),
    due_on: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp of due date.' }),
    closed_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp when closed.' }),
  })
  .meta({
    description: 'Represents a milestone for issues and pull requests.',
  })

export type Milestone = z.infer<typeof MilestoneSchema>

/**
 * Represents a GitHub issue.
 *
 * @see https://docs.github.com/en/rest/issues/issues
 */
export const IssueSchema = z
  .object({
    id: z.number().meta({ description: 'Unique identifier for the issue.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the issue.' }),
    html_url: z.string().meta({ description: 'Web URL for the issue.' }),
    number: z
      .number()
      .meta({ description: 'Issue number within the repository.' }),
    state: z.enum(['open', 'closed']).meta({ description: 'Current state.' }),
    title: z.string().meta({ description: 'Issue title.' }),
    body: z.string().nullable().meta({ description: 'Issue body content.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the issue.',
    }),
    labels: z.array(LabelSchema).meta({ description: 'Applied labels.' }),
    assignee: UserSchema.nullable()
      .optional()
      .meta({ description: 'Primary assignee.' }),
    assignees: z
      .array(UserSchema)
      .optional()
      .meta({ description: 'All assignees.' }),
    milestone: MilestoneSchema.nullable()
      .optional()
      .meta({ description: 'Associated milestone.' }),
    locked: z.boolean().meta({ description: 'Whether the issue is locked.' }),
    comments: z.number().meta({ description: 'Number of comments.' }),
    created_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of creation.' }),
    updated_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of last update.' }),
    closed_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp when closed.' }),
  })
  .meta({
    description: 'Represents a GitHub issue.',
  })

export type Issue = z.infer<typeof IssueSchema>

/**
 * Represents a GitHub pull request.
 *
 * @see https://docs.github.com/en/rest/pulls/pulls
 */
export const PullRequestSchema = z
  .object({
    id: z
      .number()
      .meta({ description: 'Unique identifier for the pull request.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the pull request.' }),
    html_url: z.string().meta({ description: 'Web URL for the pull request.' }),
    number: z
      .number()
      .meta({ description: 'Pull request number within the repository.' }),
    state: z.enum(['open', 'closed']).meta({ description: 'Current state.' }),
    title: z.string().meta({ description: 'Pull request title.' }),
    body: z
      .string()
      .nullable()
      .meta({ description: 'Pull request body content.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the pull request.',
    }),
    labels: z.array(LabelSchema).meta({ description: 'Applied labels.' }),
    created_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of creation.' }),
    updated_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of last update.' }),
    closed_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp when closed.' }),
    merged_at: z
      .string()
      .nullable()
      .meta({ description: 'ISO 8601 timestamp when merged.' }),
    draft: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a draft pull request.' }),
    head: z
      .object({
        label: z
          .string()
          .meta({ description: 'Label of the head (e.g., user:branch).' }),
        ref: z.string().meta({ description: 'Head branch name.' }),
        sha: z.string().meta({ description: 'Head commit SHA.' }),
      })
      .meta({ description: 'Head branch information.' }),
    base: z
      .object({
        label: z
          .string()
          .meta({ description: 'Label of the base (e.g., user:branch).' }),
        ref: z.string().meta({ description: 'Base branch name.' }),
        sha: z.string().meta({ description: 'Base commit SHA.' }),
      })
      .meta({ description: 'Base branch information.' }),
  })
  .meta({
    description: 'Represents a GitHub pull request.',
  })

export type PullRequest = z.infer<typeof PullRequestSchema>

/**
 * Base webhook event payload common to all GitHub webhook events.
 *
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads
 */
export const WebhookEventSchema = z
  .object({
    action: z
      .string()
      .optional()
      .meta({ description: 'Action that triggered the event.' }),
    sender: UserSchema.optional().meta({
      description: 'User who triggered the event.',
    }),
    repository: RepositorySchema.optional().meta({
      description: 'Repository where the event occurred.',
    }),
    organization: z
      .object({
        login: z.string().meta({ description: 'Organization username.' }),
        id: z.number().meta({ description: 'Organization ID.' }),
        node_id: z
          .string()
          .meta({ description: 'GraphQL global node identifier.' }),
        url: z.string().meta({ description: 'API URL for the organization.' }),
        avatar_url: z
          .string()
          .meta({ description: 'URL of the organization avatar.' }),
      })
      .optional()
      .meta({ description: 'Organization context (if applicable).' }),
    installation: z
      .object({
        id: z.number().meta({ description: 'GitHub App installation ID.' }),
        node_id: z
          .string()
          .meta({ description: 'GraphQL global node identifier.' }),
      })
      .optional()
      .meta({ description: 'GitHub App installation (if applicable).' }),
  })
  .meta({
    description:
      'Base webhook event payload common to all GitHub webhook events.',
  })

export type WebhookEvent = z.infer<typeof WebhookEventSchema>

/**
 * Webhook event payload for push events.
 *
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#push
 */
export const PushEventSchema = WebhookEventSchema.extend({
  ref: z
    .string()
    .meta({ description: 'Git ref that was pushed (e.g., refs/heads/main).' }),
  before: z
    .string()
    .meta({ description: 'SHA of the commit before the push.' }),
  after: z.string().meta({ description: 'SHA of the commit after the push.' }),
  commits: z
    .array(
      z.object({
        id: z.string().meta({ description: 'Commit SHA.' }),
        message: z.string().meta({ description: 'Commit message.' }),
        author: z
          .object({
            name: z.string().meta({ description: 'Author name.' }),
            email: z.string().meta({ description: 'Author email.' }),
          })
          .meta({ description: 'Commit author.' }),
        url: z.string().meta({ description: 'URL for the commit.' }),
        timestamp: z
          .string()
          .meta({ description: 'ISO 8601 timestamp of the commit.' }),
      }),
    )
    .meta({ description: 'Array of commits in the push.' }),
  pusher: z
    .object({
      name: z.string().meta({ description: 'Name of the pusher.' }),
      email: z
        .string()
        .optional()
        .meta({ description: 'Email of the pusher.' }),
    })
    .meta({ description: 'User who pushed the commits.' }),
  head_commit: z
    .object({
      id: z.string().meta({ description: 'Commit SHA.' }),
      message: z.string().meta({ description: 'Commit message.' }),
      author: z
        .object({
          name: z.string().meta({ description: 'Author name.' }),
          email: z.string().meta({ description: 'Author email.' }),
        })
        .meta({ description: 'Commit author.' }),
      url: z.string().meta({ description: 'URL for the commit.' }),
    })
    .nullable()
    .meta({ description: 'The most recent commit.' }),
}).meta({
  description: 'Webhook event payload for push events.',
})

export type PushEvent = z.infer<typeof PushEventSchema>

/**
 * Webhook event payload for issue events.
 *
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#issues
 */
export const IssuesEventSchema = WebhookEventSchema.extend({
  action: z
    .enum([
      'opened',
      'edited',
      'deleted',
      'closed',
      'reopened',
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
    ])
    .meta({ description: 'Action performed on the issue.' }),
  issue: IssueSchema.meta({ description: 'The issue that was affected.' }),
}).meta({
  description: 'Webhook event payload for issue events.',
})

export type IssuesEvent = z.infer<typeof IssuesEventSchema>

/**
 * Webhook event payload for pull request events.
 *
 * @see https://docs.github.com/en/webhooks/webhook-events-and-payloads#pull_request
 */
export const PullRequestEventSchema = WebhookEventSchema.extend({
  action: z
    .enum([
      'opened',
      'edited',
      'closed',
      'reopened',
      'synchronize',
      'ready_for_review',
      'converted_to_draft',
    ])
    .meta({ description: 'Action performed on the pull request.' }),
  number: z
    .number()
    .meta({ description: 'Pull request number within the repository.' }),
  pull_request: PullRequestSchema.meta({
    description: 'The pull request that was affected.',
  }),
}).meta({
  description: 'Webhook event payload for pull request events.',
})

export type PullRequestEvent = z.infer<typeof PullRequestEventSchema>

/**
 * Parameters for creating a new issue.
 *
 * @see https://docs.github.com/en/rest/issues/issues#create-an-issue
 */
export const CreateIssueParamsSchema = z
  .object({
    owner: z
      .string()
      .meta({ description: 'Repository owner (username or organization).' }),
    repo: z.string().meta({ description: 'Repository name.' }),
    title: z.string().meta({ description: 'Issue title.' }),
    body: z.string().optional().meta({ description: 'Issue body content.' }),
    assignees: z
      .array(z.string())
      .optional()
      .meta({ description: 'Usernames to assign to the issue.' }),
    labels: z
      .array(z.string())
      .optional()
      .meta({ description: 'Labels to apply to the issue.' }),
    milestone: z
      .number()
      .optional()
      .meta({ description: 'Milestone number to associate with the issue.' }),
  })
  .meta({
    description: 'Parameters for creating a new issue.',
  })

export type CreateIssueParams = z.infer<typeof CreateIssueParamsSchema>

/**
 * Parameters for listing repositories.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user
 */
export const ListReposParamsSchema = z
  .object({
    per_page: z
      .number()
      .min(1)
      .max(100)
      .optional()
      .meta({ description: 'Results per page (1-100, default: 30).' }),
    page: z
      .number()
      .min(1)
      .optional()
      .meta({ description: 'Page number to retrieve (default: 1).' }),
    sort: z
      .enum(['created', 'updated', 'pushed', 'full_name'])
      .optional()
      .meta({ description: 'Property to sort by (default: full_name).' }),
    direction: z.enum(['asc', 'desc']).optional().meta({
      description: 'Sort direction (default: asc when using full_name).',
    }),
    type: z
      .enum(['all', 'owner', 'public', 'private', 'member'])
      .optional()
      .meta({ description: 'Filter by repository type (default: all).' }),
  })
  .meta({
    description: 'Parameters for listing repositories.',
  })

export type ListReposParams = z.infer<typeof ListReposParamsSchema>

/**
 * Parameters for getting a specific repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const GetRepoParamsSchema = z
  .object({
    owner: z
      .string()
      .meta({ description: 'Repository owner (username or organization).' }),
    repo: z.string().meta({ description: 'Repository name.' }),
  })
  .meta({
    description: 'Parameters for getting a specific repository.',
  })

export type GetRepoParams = z.infer<typeof GetRepoParamsSchema>

/**
 * Parameters for creating a comment on an issue or pull request.
 *
 * @see https://docs.github.com/en/rest/issues/comments#create-an-issue-comment
 */
export const CreateCommentParamsSchema = z
  .object({
    owner: z
      .string()
      .meta({ description: 'Repository owner (username or organization).' }),
    repo: z.string().meta({ description: 'Repository name.' }),
    issue_number: z
      .number()
      .meta({ description: 'Issue or pull request number.' }),
    body: z.string().meta({ description: 'Comment body content.' }),
  })
  .meta({
    description:
      'Parameters for creating a comment on an issue or pull request.',
  })

export type CreateCommentParams = z.infer<typeof CreateCommentParamsSchema>

/**
 * Represents a comment on an issue or pull request.
 *
 * @see https://docs.github.com/en/rest/issues/comments
 */
export const CommentSchema = z
  .object({
    id: z.number().meta({ description: 'Unique identifier for the comment.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the comment.' }),
    html_url: z.string().meta({ description: 'Web URL for the comment.' }),
    body: z.string().meta({ description: 'Comment body content.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the comment.',
    }),
    created_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of creation.' }),
    updated_at: z
      .string()
      .meta({ description: 'ISO 8601 timestamp of last update.' }),
  })
  .meta({
    description: 'Represents a comment on an issue or pull request.',
  })

export type Comment = z.infer<typeof CommentSchema>
