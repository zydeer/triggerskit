import { z } from 'zod'

export const UserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string().nullable(),
  url: z.string(),
  html_url: z.string(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  twitter_username: z.string().nullable().optional(),
  public_repos: z.number().optional(),
  public_gists: z.number().optional(),
  followers: z.number().optional(),
  following: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})
export type User = z.infer<typeof UserSchema>

export const RepositorySchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  owner: UserSchema,
  html_url: z.string(),
  description: z.string().nullable(),
  fork: z.boolean(),
  url: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  pushed_at: z.string().nullable(),
  homepage: z.string().nullable().optional(),
  size: z.number().optional(),
  stargazers_count: z.number().optional(),
  watchers_count: z.number().optional(),
  language: z.string().nullable().optional(),
  forks_count: z.number().optional(),
  open_issues_count: z.number().optional(),
  default_branch: z.string().optional(),
  topics: z.array(z.string()).optional(),
  visibility: z.string().optional(),
  archived: z.boolean().optional(),
  disabled: z.boolean().optional(),
})
export type Repository = z.infer<typeof RepositorySchema>

export const LabelSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string(),
  default: z.boolean(),
})
export type Label = z.infer<typeof LabelSchema>

export const MilestoneSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  number: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  state: z.enum(['open', 'closed']),
  created_at: z.string(),
  updated_at: z.string(),
  due_on: z.string().nullable(),
  closed_at: z.string().nullable(),
})
export type Milestone = z.infer<typeof MilestoneSchema>

export const IssueSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  number: z.number(),
  state: z.enum(['open', 'closed']),
  title: z.string(),
  body: z.string().nullable(),
  user: UserSchema.nullable(),
  labels: z.array(LabelSchema),
  assignee: UserSchema.nullable().optional(),
  assignees: z.array(UserSchema).optional(),
  milestone: MilestoneSchema.nullable().optional(),
  locked: z.boolean(),
  comments: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().nullable(),
})
export type Issue = z.infer<typeof IssueSchema>

export const PullRequestSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  number: z.number(),
  state: z.enum(['open', 'closed']),
  title: z.string(),
  body: z.string().nullable(),
  user: UserSchema.nullable(),
  labels: z.array(LabelSchema),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().nullable(),
  merged_at: z.string().nullable(),
  draft: z.boolean().optional(),
  head: z.object({
    label: z.string(),
    ref: z.string(),
    sha: z.string(),
  }),
  base: z.object({
    label: z.string(),
    ref: z.string(),
    sha: z.string(),
  }),
})
export type PullRequest = z.infer<typeof PullRequestSchema>

export const WebhookEventSchema = z.object({
  action: z.string().optional(),
  sender: UserSchema.optional(),
  repository: RepositorySchema.optional(),
  organization: z
    .object({
      login: z.string(),
      id: z.number(),
      node_id: z.string(),
      url: z.string(),
      avatar_url: z.string(),
    })
    .optional(),
  installation: z
    .object({
      id: z.number(),
      node_id: z.string(),
    })
    .optional(),
})
export type WebhookEvent = z.infer<typeof WebhookEventSchema>

export const PushEventSchema = WebhookEventSchema.extend({
  ref: z.string(),
  before: z.string(),
  after: z.string(),
  commits: z.array(
    z.object({
      id: z.string(),
      message: z.string(),
      author: z.object({
        name: z.string(),
        email: z.string(),
      }),
      url: z.string(),
      timestamp: z.string(),
    }),
  ),
  pusher: z.object({
    name: z.string(),
    email: z.string().optional(),
  }),
  head_commit: z
    .object({
      id: z.string(),
      message: z.string(),
      author: z.object({
        name: z.string(),
        email: z.string(),
      }),
      url: z.string(),
    })
    .nullable(),
})
export type PushEvent = z.infer<typeof PushEventSchema>

export const IssuesEventSchema = WebhookEventSchema.extend({
  action: z.enum([
    'opened',
    'edited',
    'deleted',
    'closed',
    'reopened',
    'assigned',
    'unassigned',
    'labeled',
    'unlabeled',
  ]),
  issue: IssueSchema,
})
export type IssuesEvent = z.infer<typeof IssuesEventSchema>

export const PullRequestEventSchema = WebhookEventSchema.extend({
  action: z.enum([
    'opened',
    'edited',
    'closed',
    'reopened',
    'synchronize',
    'ready_for_review',
    'converted_to_draft',
  ]),
  number: z.number(),
  pull_request: PullRequestSchema,
})
export type PullRequestEvent = z.infer<typeof PullRequestEventSchema>

export const CreateIssueParamsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  title: z.string(),
  body: z.string().optional(),
  assignees: z.array(z.string()).optional(),
  labels: z.array(z.string()).optional(),
  milestone: z.number().optional(),
})
export type CreateIssueParams = z.infer<typeof CreateIssueParamsSchema>

export const ListReposParamsSchema = z.object({
  per_page: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
  sort: z.enum(['created', 'updated', 'pushed', 'full_name']).optional(),
  direction: z.enum(['asc', 'desc']).optional(),
  type: z.enum(['all', 'owner', 'public', 'private', 'member']).optional(),
})
export type ListReposParams = z.infer<typeof ListReposParamsSchema>

export const GetRepoParamsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type GetRepoParams = z.infer<typeof GetRepoParamsSchema>

export const CreateCommentParamsSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  issue_number: z.number(),
  body: z.string(),
})
export type CreateCommentParams = z.infer<typeof CreateCommentParamsSchema>

export const CommentSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  body: z.string(),
  user: UserSchema.nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})
export type Comment = z.infer<typeof CommentSchema>
