import { z } from 'zod'

/**
 * Represents a GitHub user or organization account.
 *
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 */
export const UserSchema = z
  .object({
    login: z
      .string()
      .meta({ description: 'The handle for the GitHub user account.' }),
    id: z.number().meta({ description: 'Unique identifier for the user.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    avatar_url: z
      .string()
      .meta({ description: 'URL of the user avatar image.' }),
    gravatar_id: z
      .string()
      .nullable()
      .meta({ description: 'Gravatar ID (may be empty string or null).' }),
    url: z.string().meta({ description: 'API URL for the user resource.' }),
    html_url: z
      .string()
      .meta({ description: 'Web URL for the user profile page.' }),
    followers_url: z
      .string()
      .meta({ description: 'API URL for the user followers list.' }),
    following_url: z.string().meta({
      description:
        'API URL template for the user following list (contains {/other_user} placeholder).',
    }),
    gists_url: z.string().meta({
      description:
        'API URL template for the user gists list (contains {/gist_id} placeholder).',
    }),
    starred_url: z.string().meta({
      description:
        'API URL template for the user starred repositories (contains {/owner}{/repo} placeholders).',
    }),
    subscriptions_url: z
      .string()
      .meta({ description: 'API URL for the user subscriptions list.' }),
    organizations_url: z
      .string()
      .meta({ description: 'API URL for the user organizations list.' }),
    repos_url: z
      .string()
      .meta({ description: 'API URL for the user repositories list.' }),
    events_url: z.string().meta({
      description:
        'API URL template for the user events list (contains {/privacy} placeholder).',
    }),
    received_events_url: z
      .string()
      .meta({ description: 'API URL for the user received events list.' }),
    type: z.string().meta({
      description: 'Account type. Can be "User", "Organization", or "Bot".',
    }),
    site_admin: z.boolean().meta({
      description: 'Whether the user is a GitHub site administrator.',
    }),
    name: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Display name of the user.' }),
    company: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Company affiliation of the user.' }),
    blog: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Blog or website URL of the user.' }),
    location: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Geographic location of the user.' }),
    email: z.string().nullable().optional().meta({
      description:
        'Publicly visible email address from the GitHub profile page. Only visible when authenticated. Can be null if no public email is set.',
    }),
    hireable: z
      .boolean()
      .nullable()
      .optional()
      .meta({ description: 'Whether the user is available for hire.' }),
    bio: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Biography or description of the user.' }),
    twitter_username: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Twitter/X username of the user.' }),
    public_repos: z.number().optional().meta({
      description: 'Number of public repositories owned by the user.',
    }),
    public_gists: z
      .number()
      .optional()
      .meta({ description: 'Number of public gists owned by the user.' }),
    followers: z
      .number()
      .optional()
      .meta({ description: 'Number of users following this account.' }),
    following: z
      .number()
      .optional()
      .meta({ description: 'Number of users this account is following.' }),
    created_at: z.string().optional().meta({
      description: 'ISO 8601 timestamp of when the account was created.',
    }),
    updated_at: z.string().optional().meta({
      description: 'ISO 8601 timestamp of when the account was last updated.',
    }),
  })
  .meta({
    description:
      'Represents a GitHub user or organization account. Provides publicly available information about someone with a GitHub account.',
  })

export type User = z.infer<typeof UserSchema>

/**
 * Represents a license for a repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const LicenseSchema = z
  .object({
    key: z.string().meta({
      description: 'License key identifier (e.g., "mit", "apache-2.0").',
    }),
    name: z.string().meta({ description: 'Full name of the license.' }),
    spdx_id: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'SPDX identifier for the license.' }),
    url: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'API URL for the license resource.' }),
    node_id: z
      .string()
      .optional()
      .meta({ description: 'GraphQL global node identifier.' }),
    html_url: z
      .string()
      .optional()
      .meta({ description: 'Web URL for the license page.' }),
  })
  .meta({
    description: 'Represents a license associated with a repository.',
  })

export type License = z.infer<typeof LicenseSchema>

/**
 * Represents repository permissions for the authenticated user.
 *
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const PermissionsSchema = z
  .object({
    admin: z
      .boolean()
      .meta({ description: 'Whether the user has admin permissions.' }),
    push: z
      .boolean()
      .meta({ description: 'Whether the user has push permissions.' }),
    pull: z
      .boolean()
      .meta({ description: 'Whether the user has pull (read) permissions.' }),
  })
  .meta({
    description:
      'Repository permissions for the authenticated user. Only included when authenticated.',
  })

export type Permissions = z.infer<typeof PermissionsSchema>

/**
 * Represents security and analysis settings for a repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const SecurityAndAnalysisSchema = z
  .object({
    advanced_security: z
      .object({
        status: z.enum(['enabled', 'disabled']).meta({
          description:
            'Status of GitHub Advanced Security. Can be "enabled" or "disabled".',
        }),
      })
      .optional()
      .meta({ description: 'GitHub Advanced Security settings.' }),
    secret_scanning: z
      .object({
        status: z.enum(['enabled', 'disabled']).meta({
          description:
            'Status of secret scanning. Can be "enabled" or "disabled".',
        }),
      })
      .optional()
      .meta({ description: 'Secret scanning settings.' }),
    secret_scanning_push_protection: z
      .object({
        status: z.enum(['enabled', 'disabled']).meta({
          description:
            'Status of secret scanning push protection. Can be "enabled" or "disabled".',
        }),
      })
      .optional()
      .meta({ description: 'Secret scanning push protection settings.' }),
    secret_scanning_non_provider_patterns: z
      .object({
        status: z.enum(['enabled', 'disabled']).meta({
          description:
            'Status of secret scanning for non-provider patterns. Can be "enabled" or "disabled".',
        }),
      })
      .optional()
      .meta({
        description: 'Secret scanning for non-provider patterns settings.',
      }),
  })
  .optional()
  .meta({
    description:
      'Security and analysis settings for the repository. Only visible to users with admin permissions, owners, or security managers of the organization.',
  })

export type SecurityAndAnalysis = z.infer<typeof SecurityAndAnalysisSchema>

/**
 * Represents a GitHub repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-organization-repositories
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const RepositorySchema: z.ZodType<any> = z
  .object({
    id: z
      .number()
      .meta({ description: 'Unique identifier for the repository.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    name: z
      .string()
      .meta({ description: 'Repository name without the .git extension.' }),
    full_name: z.string().meta({
      description:
        'Full name including owner (e.g., "owner/repo"). The name is not case sensitive.',
    }),
    owner: UserSchema.meta({
      description: 'Repository owner (user or organization).',
    }),
    private: z
      .boolean()
      .meta({ description: 'Whether the repository is private.' }),
    html_url: z
      .string()
      .meta({ description: 'Web URL for the repository page.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Repository description.' }),
    fork: z.boolean().meta({
      description: 'Whether this repository is a fork of another repository.',
    }),
    url: z
      .string()
      .meta({ description: 'API URL for the repository resource.' }),
    archive_url: z.string().meta({
      description:
        'API URL template for repository archives (contains {archive_format}{/ref} placeholders).',
    }),
    assignees_url: z.string().meta({
      description:
        'API URL template for repository assignees (contains {/user} placeholder).',
    }),
    blobs_url: z.string().meta({
      description:
        'API URL template for repository blobs (contains {/sha} placeholder).',
    }),
    branches_url: z.string().meta({
      description:
        'API URL template for repository branches (contains {/branch} placeholder).',
    }),
    collaborators_url: z.string().meta({
      description:
        'API URL template for repository collaborators (contains {/collaborator} placeholder).',
    }),
    comments_url: z.string().meta({
      description:
        'API URL template for repository comments (contains {/number} placeholder).',
    }),
    commits_url: z.string().meta({
      description:
        'API URL template for repository commits (contains {/sha} placeholder).',
    }),
    compare_url: z.string().meta({
      description:
        'API URL template for repository comparisons (contains {base}...{head} placeholders).',
    }),
    contents_url: z.string().meta({
      description:
        'API URL template for repository contents (contains {+path} placeholder).',
    }),
    contributors_url: z
      .string()
      .meta({ description: 'API URL for repository contributors list.' }),
    deployments_url: z
      .string()
      .meta({ description: 'API URL for repository deployments list.' }),
    downloads_url: z
      .string()
      .meta({ description: 'API URL for repository downloads list.' }),
    events_url: z
      .string()
      .meta({ description: 'API URL for repository events list.' }),
    forks_url: z
      .string()
      .meta({ description: 'API URL for repository forks list.' }),
    git_commits_url: z.string().meta({
      description:
        'API URL template for repository git commits (contains {/sha} placeholder).',
    }),
    git_refs_url: z.string().meta({
      description:
        'API URL template for repository git refs (contains {/sha} placeholder).',
    }),
    git_tags_url: z.string().meta({
      description:
        'API URL template for repository git tags (contains {/sha} placeholder).',
    }),
    git_url: z.string().meta({
      description: 'Git URL for cloning the repository (git: protocol).',
    }),
    issue_comment_url: z.string().meta({
      description:
        'API URL template for issue comments (contains {/number} placeholder).',
    }),
    issue_events_url: z.string().meta({
      description:
        'API URL template for issue events (contains {/number} placeholder).',
    }),
    issues_url: z.string().meta({
      description:
        'API URL template for repository issues (contains {/number} placeholder).',
    }),
    keys_url: z.string().meta({
      description:
        'API URL template for repository deploy keys (contains {/key_id} placeholder).',
    }),
    labels_url: z.string().meta({
      description:
        'API URL template for repository labels (contains {/name} placeholder).',
    }),
    languages_url: z
      .string()
      .meta({ description: 'API URL for repository languages list.' }),
    merges_url: z
      .string()
      .meta({ description: 'API URL for repository merges list.' }),
    milestones_url: z.string().meta({
      description:
        'API URL template for repository milestones (contains {/number} placeholder).',
    }),
    notifications_url: z.string().meta({
      description:
        'API URL template for repository notifications (contains {?since,all,participating} query parameters).',
    }),
    pulls_url: z.string().meta({
      description:
        'API URL template for repository pull requests (contains {/number} placeholder).',
    }),
    releases_url: z.string().meta({
      description:
        'API URL template for repository releases (contains {/id} placeholder).',
    }),
    ssh_url: z.string().meta({
      description: 'SSH URL for cloning the repository (git@ protocol).',
    }),
    stargazers_url: z
      .string()
      .meta({ description: 'API URL for repository stargazers list.' }),
    statuses_url: z.string().meta({
      description:
        'API URL template for repository statuses (contains {sha} placeholder).',
    }),
    subscribers_url: z
      .string()
      .meta({ description: 'API URL for repository subscribers list.' }),
    subscription_url: z
      .string()
      .meta({ description: 'API URL for repository subscription.' }),
    tags_url: z
      .string()
      .meta({ description: 'API URL for repository tags list.' }),
    teams_url: z
      .string()
      .meta({ description: 'API URL for repository teams list.' }),
    trees_url: z.string().meta({
      description:
        'API URL template for repository git trees (contains {/sha} placeholder).',
    }),
    clone_url: z
      .string()
      .meta({ description: 'HTTPS URL for cloning the repository.' }),
    mirror_url: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'URL of the mirror repository (if applicable).' }),
    hooks_url: z
      .string()
      .meta({ description: 'API URL for repository webhooks list.' }),
    svn_url: z
      .string()
      .meta({ description: 'SVN URL for accessing the repository.' }),
    homepage: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Homepage URL for the repository.' }),
    language: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'Primary programming language of the repository.' }),
    forks_count: z
      .number()
      .optional()
      .meta({ description: 'Number of forks of the repository.' }),
    forks: z.number().optional().meta({
      description:
        'Number of forks of the repository (deprecated, use forks_count).',
    }),
    stargazers_count: z.number().optional().meta({
      description: 'Number of users who have starred the repository.',
    }),
    watchers_count: z
      .number()
      .optional()
      .meta({ description: 'Number of users watching the repository.' }),
    watchers: z.number().optional().meta({
      description:
        'Number of users watching the repository (deprecated, use watchers_count).',
    }),
    size: z
      .number()
      .optional()
      .meta({ description: 'Size of the repository in kilobytes.' }),
    default_branch: z.string().optional().meta({
      description: 'Name of the default branch (e.g., "main", "master").',
    }),
    open_issues_count: z
      .number()
      .optional()
      .meta({ description: 'Number of open issues in the repository.' }),
    open_issues: z.number().optional().meta({
      description:
        'Number of open issues in the repository (deprecated, use open_issues_count).',
    }),
    is_template: z.boolean().optional().meta({
      description: 'Whether the repository is a template repository.',
    }),
    topics: z.array(z.string()).optional().meta({
      description: 'Array of topic names associated with the repository.',
    }),
    has_issues: z
      .boolean()
      .optional()
      .meta({ description: 'Whether issues are enabled for the repository.' }),
    has_projects: z.boolean().optional().meta({
      description: 'Whether projects are enabled for the repository.',
    }),
    has_wiki: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the wiki is enabled for the repository.' }),
    has_pages: z.boolean().optional().meta({
      description: 'Whether GitHub Pages is enabled for the repository.',
    }),
    has_downloads: z.boolean().optional().meta({
      description: 'Whether downloads are enabled for the repository.',
    }),
    has_discussions: z.boolean().optional().meta({
      description: 'Whether discussions are enabled for the repository.',
    }),
    archived: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the repository is archived.' }),
    disabled: z
      .boolean()
      .optional()
      .meta({ description: 'Whether the repository is disabled.' }),
    visibility: z.enum(['public', 'private', 'internal']).optional().meta({
      description:
        'Visibility level of the repository. Can be "public", "private", or "internal".',
    }),
    pushed_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of the last push to the repository.',
    }),
    created_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of when the repository was created.',
    }),
    updated_at: z.string().nullable().optional().meta({
      description:
        'ISO 8601 timestamp of when the repository was last updated.',
    }),
    permissions: PermissionsSchema.optional().meta({
      description:
        'Repository permissions for the authenticated user. Only included when authenticated.',
    }),
    security_and_analysis: SecurityAndAnalysisSchema,
    allow_rebase_merge: z.boolean().optional().meta({
      description:
        'Whether rebase merges are allowed. Only visible to users with contents:read and contents:write permissions.',
    }),
    template_repository: z
      .lazy(() => RepositorySchema)
      .nullable()
      .optional()
      .meta({
        description:
          'Template repository if this repository was generated from a template. Only visible to users with contents:read and contents:write permissions.',
      }),
    temp_clone_token: z.string().nullable().optional().meta({
      description:
        'Temporary clone token for the repository. Only visible to users with contents:read and contents:write permissions.',
    }),
    allow_squash_merge: z.boolean().optional().meta({
      description:
        'Whether squash merges are allowed. Only visible to users with contents:read and contents:write permissions.',
    }),
    allow_auto_merge: z.boolean().optional().meta({
      description:
        'Whether auto-merge is enabled. Only visible to users with contents:read and contents:write permissions.',
    }),
    delete_branch_on_merge: z.boolean().optional().meta({
      description:
        'Whether branches are automatically deleted when merged. Only visible to users with contents:read and contents:write permissions.',
    }),
    allow_merge_commit: z.boolean().optional().meta({
      description:
        'Whether merge commits are allowed. Only visible to users with contents:read and contents:write permissions.',
    }),
    allow_forking: z.boolean().optional().meta({
      description: 'Whether forking is allowed for the repository.',
    }),
    subscribers_count: z
      .number()
      .optional()
      .meta({ description: 'Number of subscribers to the repository.' }),
    network_count: z.number().optional().meta({
      description: 'Number of repositories in the network (forks and sources).',
    }),
    license: LicenseSchema.nullable()
      .optional()
      .meta({ description: 'License associated with the repository.' }),
    organization: UserSchema.optional().meta({
      description:
        'Organization that owns the repository. Only present for organization-owned repositories.',
    }),
    parent: z
      .lazy(() => RepositorySchema)
      .nullable()
      .optional()
      .meta({
        description:
          'Parent repository if this repository is a fork. The parent is the repository this repository was forked from.',
      }),
    source: z
      .lazy(() => RepositorySchema)
      .nullable()
      .optional()
      .meta({
        description:
          'Source repository if this repository is a fork. The source is the ultimate source for the network.',
      }),
  })
  .meta({
    description:
      'Represents a GitHub repository. Contains comprehensive information about a repository including URLs, metadata, settings, and relationships.',
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
    url: z.string().meta({ description: 'API URL for the label resource.' }),
    name: z.string().meta({ description: 'Label name.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Label description.' }),
    color: z.string().meta({
      description:
        'Label color as a hex code without the # symbol (e.g., "f29513").',
    }),
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
    url: z
      .string()
      .meta({ description: 'API URL for the milestone resource.' }),
    html_url: z
      .string()
      .meta({ description: 'Web URL for the milestone page.' }),
    labels_url: z.string().meta({
      description:
        'API URL template for milestone labels (contains {/name} placeholder).',
    }),
    number: z
      .number()
      .meta({ description: 'Milestone number within the repository.' }),
    title: z.string().meta({ description: 'Milestone title.' }),
    description: z
      .string()
      .nullable()
      .meta({ description: 'Milestone description.' }),
    state: z
      .enum(['open', 'closed'])
      .meta({ description: 'Current state of the milestone.' }),
    creator: UserSchema.nullable()
      .optional()
      .meta({ description: 'User who created the milestone.' }),
    open_issues: z
      .number()
      .optional()
      .meta({ description: 'Number of open issues in the milestone.' }),
    closed_issues: z
      .number()
      .optional()
      .meta({ description: 'Number of closed issues in the milestone.' }),
    created_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the milestone was created.',
    }),
    updated_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the milestone was last updated.',
    }),
    due_on: z
      .string()
      .nullable()
      .optional()
      .meta({ description: 'ISO 8601 timestamp of the milestone due date.' }),
    closed_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of when the milestone was closed.',
    }),
  })
  .meta({
    description: 'Represents a milestone for issues and pull requests.',
  })

export type Milestone = z.infer<typeof MilestoneSchema>

/**
 * Represents a pull request reference within an issue.
 *
 * @see https://docs.github.com/en/rest/issues/issues#create-an-issue
 */
export const PullRequestReferenceSchema = z
  .object({
    url: z
      .string()
      .meta({ description: 'API URL for the pull request resource.' }),
    html_url: z
      .string()
      .meta({ description: 'Web URL for the pull request page.' }),
    diff_url: z
      .string()
      .meta({ description: 'URL for the pull request diff view.' }),
    patch_url: z
      .string()
      .meta({ description: 'URL for the pull request patch view.' }),
  })
  .optional()
  .meta({
    description:
      'Pull request reference if the issue is also a pull request. Only present when the issue is a pull request.',
  })

export type PullRequestReference = z.infer<typeof PullRequestReferenceSchema>

/**
 * Represents a GitHub issue.
 *
 * @see https://docs.github.com/en/rest/issues/issues#create-an-issue
 */
export const IssueSchema = z
  .object({
    id: z.number().meta({ description: 'Unique identifier for the issue.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the issue resource.' }),
    repository_url: z.string().meta({
      description: 'API URL for the repository containing the issue.',
    }),
    labels_url: z.string().meta({
      description:
        'API URL template for issue labels (contains {/name} placeholder).',
    }),
    comments_url: z
      .string()
      .meta({ description: 'API URL for issue comments list.' }),
    events_url: z
      .string()
      .meta({ description: 'API URL for issue events list.' }),
    html_url: z.string().meta({ description: 'Web URL for the issue page.' }),
    number: z
      .number()
      .meta({ description: 'Issue number within the repository.' }),
    state: z
      .enum(['open', 'closed'])
      .meta({ description: 'Current state of the issue.' }),
    title: z.string().meta({ description: 'Title of the issue.' }),
    body: z
      .string()
      .nullable()
      .meta({ description: 'Body content of the issue in markdown.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the issue.',
    }),
    labels: z
      .array(LabelSchema)
      .meta({ description: 'Array of labels applied to the issue.' }),
    assignee: UserSchema.nullable().optional().meta({
      description:
        'Primary assignee of the issue. NOTE: This field is closing down. Use assignees instead.',
    }),
    assignees: z
      .array(UserSchema)
      .optional()
      .meta({ description: 'Array of users assigned to the issue.' }),
    milestone: MilestoneSchema.nullable()
      .optional()
      .meta({ description: 'Milestone associated with the issue.' }),
    locked: z
      .boolean()
      .meta({ description: 'Whether the issue is locked for comments.' }),
    active_lock_reason: z
      .enum(['resolved', 'off-topic', 'too heated', 'spam'])
      .nullable()
      .optional()
      .meta({
        description:
          'Reason why the issue is locked. Can be "resolved", "off-topic", "too heated", or "spam".',
      }),
    comments: z
      .number()
      .meta({ description: 'Number of comments on the issue.' }),
    pull_request: PullRequestReferenceSchema,
    closed_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of when the issue was closed.',
    }),
    created_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the issue was created.',
    }),
    updated_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the issue was last updated.',
    }),
    closed_by: UserSchema.nullable()
      .optional()
      .meta({ description: 'User who closed the issue.' }),
    author_association: z
      .enum([
        'COLLABORATOR',
        'CONTRIBUTOR',
        'FIRST_TIMER',
        'FIRST_TIME_CONTRIBUTOR',
        'MANNEQUIN',
        'MEMBER',
        'NONE',
        'OWNER',
      ])
      .optional()
      .meta({
        description:
          'How the author is associated with the repository. Can be "COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", or "OWNER".',
      }),
    state_reason: z
      .enum(['completed', 'not_planned', 'reopened'])
      .nullable()
      .optional()
      .meta({
        description:
          'Reason for the current state. Can be "completed", "not_planned", or "reopened".',
      }),
  })
  .meta({
    description:
      'Represents a GitHub issue. Any user with pull access to a repository can create an issue.',
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
    url: z
      .string()
      .meta({ description: 'API URL for the pull request resource.' }),
    html_url: z
      .string()
      .meta({ description: 'Web URL for the pull request page.' }),
    number: z
      .number()
      .meta({ description: 'Pull request number within the repository.' }),
    state: z
      .enum(['open', 'closed'])
      .meta({ description: 'Current state of the pull request.' }),
    title: z.string().meta({ description: 'Title of the pull request.' }),
    body: z
      .string()
      .nullable()
      .meta({ description: 'Body content of the pull request in markdown.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the pull request.',
    }),
    labels: z
      .array(LabelSchema)
      .meta({ description: 'Array of labels applied to the pull request.' }),
    created_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the pull request was created.',
    }),
    updated_at: z.string().meta({
      description:
        'ISO 8601 timestamp of when the pull request was last updated.',
    }),
    closed_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of when the pull request was closed.',
    }),
    merged_at: z.string().nullable().optional().meta({
      description: 'ISO 8601 timestamp of when the pull request was merged.',
    }),
    draft: z
      .boolean()
      .optional()
      .meta({ description: 'Whether this is a draft pull request.' }),
    head: z
      .object({
        label: z.string().meta({
          description: 'Label of the head branch (e.g., "user:branch").',
        }),
        ref: z.string().meta({ description: 'Head branch name.' }),
        sha: z.string().meta({ description: 'Head commit SHA.' }),
      })
      .meta({ description: 'Head branch information.' }),
    base: z
      .object({
        label: z.string().meta({
          description: 'Label of the base branch (e.g., "user:branch").',
        }),
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
    owner: z.string().min(1).meta({
      description:
        'The account owner of the repository. The name is not case sensitive.',
    }),
    repo: z.string().min(1).meta({
      description:
        'The name of the repository without the .git extension. The name is not case sensitive.',
    }),
    title: z.union([z.string(), z.number()]).meta({
      description:
        'The title of the issue. Can be a string or integer. Required.',
    }),
    body: z
      .string()
      .optional()
      .meta({ description: 'The contents of the issue in markdown.' }),
    assignee: z.union([z.string(), z.null()]).optional().meta({
      description:
        'Login for the user that this issue should be assigned to. NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise. This field is closing down.',
    }),
    milestone: z.union([z.null(), z.string(), z.number()]).optional().meta({
      description:
        'The number of the milestone to associate this issue with. NOTE: Only users with push access can set the milestone for new issues. The milestone is silently dropped otherwise.',
    }),
    labels: z.array(z.string()).optional().meta({
      description:
        'Labels to associate with this issue. NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise.',
    }),
    assignees: z.array(z.string()).optional().meta({
      description:
        'Logins for Users to assign to this issue. NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise.',
    }),
    type: z.union([z.string(), z.null()]).optional().meta({
      description:
        'The name of the issue type to associate with this issue. NOTE: Only users with push access can set the type for new issues. The type is silently dropped otherwise.',
    }),
  })
  .meta({
    description:
      'Parameters for creating a new issue. Any user with pull access to a repository can create an issue.',
  })

export type CreateIssueParams = z.infer<typeof CreateIssueParamsSchema>

/**
 * Parameters for listing repositories for the authenticated user.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user
 */
export const ListReposParamsSchema = z
  .object({
    per_page: z.number().min(1).max(100).optional().meta({
      description:
        'The number of results per page (max 100). For more information, see "Using pagination in the REST API." Default: 30.',
    }),
    page: z.number().min(1).optional().meta({
      description:
        'The page number of the results to fetch. For more information, see "Using pagination in the REST API." Default: 1.',
    }),
    sort: z
      .enum(['created', 'updated', 'pushed', 'full_name'])
      .optional()
      .meta({
        description:
          'The property to sort the results by. Default: full_name. Can be one of: created, updated, pushed, full_name.',
      }),
    direction: z.enum(['asc', 'desc']).optional().meta({
      description:
        'The order to sort by. Default: asc when using full_name, otherwise desc. Can be one of: asc, desc.',
    }),
    type: z
      .enum(['all', 'owner', 'public', 'private', 'member'])
      .optional()
      .meta({
        description:
          'Filter by repository type. Default: all. Can be one of: all, owner, public, private, member.',
      }),
  })
  .meta({
    description:
      'Parameters for listing repositories for the authenticated user.',
  })

export type ListReposParams = z.infer<typeof ListReposParamsSchema>

/**
 * Parameters for listing organization repositories.
 *
 * @see https://docs.github.com/en/rest/repos/repos#list-organization-repositories
 */
export const ListOrgReposParamsSchema = z
  .object({
    org: z.string().min(1).meta({
      description:
        'The organization name. The name is not case sensitive. Required.',
    }),
    type: z
      .enum(['all', 'public', 'private', 'forks', 'sources', 'member'])
      .optional()
      .meta({
        description:
          'Specifies the types of repositories you want returned. Default: all. Can be one of: all, public, private, forks, sources, member.',
      }),
    sort: z
      .enum(['created', 'updated', 'pushed', 'full_name'])
      .optional()
      .meta({
        description:
          'The property to sort the results by. Default: created. Can be one of: created, updated, pushed, full_name.',
      }),
    direction: z.enum(['asc', 'desc']).optional().meta({
      description:
        'The order to sort by. Default: asc when using full_name, otherwise desc. Can be one of: asc, desc.',
    }),
    per_page: z.number().min(1).max(100).optional().meta({
      description:
        'The number of results per page (max 100). For more information, see "Using pagination in the REST API." Default: 30.',
    }),
    page: z.number().min(1).optional().meta({
      description:
        'The page number of the results to fetch. For more information, see "Using pagination in the REST API." Default: 1.',
    }),
  })
  .meta({
    description:
      'Parameters for listing repositories for the specified organization.',
  })

export type ListOrgReposParams = z.infer<typeof ListOrgReposParamsSchema>

/**
 * Parameters for getting a specific repository.
 *
 * @see https://docs.github.com/en/rest/repos/repos#get-a-repository
 */
export const GetRepoParamsSchema = z
  .object({
    owner: z.string().min(1).meta({
      description:
        'The account owner of the repository. The name is not case sensitive. Required.',
    }),
    repo: z.string().min(1).meta({
      description:
        'The name of the repository without the .git extension. The name is not case sensitive. Required.',
    }),
  })
  .meta({
    description:
      'Parameters for getting a specific repository. The parent and source objects are present when the repository is a fork.',
  })

export type GetRepoParams = z.infer<typeof GetRepoParamsSchema>

/**
 * Parameters for getting a user.
 *
 * @see https://docs.github.com/en/rest/users/users#get-a-user
 */
export const GetUserParamsSchema = z
  .object({
    username: z.string().min(1).meta({
      description:
        'The handle for the GitHub user account. Required. Provides publicly available information about someone with a GitHub account.',
    }),
  })
  .meta({
    description:
      'Parameters for getting a user. Provides publicly available information about someone with a GitHub account.',
  })

export type GetUserParams = z.infer<typeof GetUserParamsSchema>

/**
 * Parameters for creating a comment on an issue or pull request.
 *
 * @see https://docs.github.com/en/rest/issues/comments#create-an-issue-comment
 */
export const CreateCommentParamsSchema = z
  .object({
    owner: z.string().min(1).meta({
      description:
        'The account owner of the repository. The name is not case sensitive. Required.',
    }),
    repo: z.string().min(1).meta({
      description:
        'The name of the repository without the .git extension. The name is not case sensitive. Required.',
    }),
    issue_number: z.number().int().positive().meta({
      description: 'The number that identifies the issue. Required.',
    }),
    body: z.string().min(1).meta({
      description:
        'The contents of the comment. Required. You can use the REST API to create comments on issues and pull requests. Every pull request is an issue, but not every issue is a pull request.',
    }),
  })
  .meta({
    description:
      'Parameters for creating a comment on an issue or pull request. This endpoint triggers notifications.',
  })

export type CreateCommentParams = z.infer<typeof CreateCommentParamsSchema>

/**
 * Represents a comment on an issue or pull request.
 *
 * @see https://docs.github.com/en/rest/issues/comments#create-an-issue-comment
 */
export const CommentSchema = z
  .object({
    id: z.number().meta({ description: 'Unique identifier for the comment.' }),
    node_id: z
      .string()
      .meta({ description: 'GraphQL global node identifier.' }),
    url: z.string().meta({ description: 'API URL for the comment resource.' }),
    html_url: z.string().meta({ description: 'Web URL for the comment page.' }),
    body: z
      .string()
      .meta({ description: 'The contents of the comment in markdown.' }),
    user: UserSchema.nullable().meta({
      description: 'User who created the comment.',
    }),
    created_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the comment was created.',
    }),
    updated_at: z.string().meta({
      description: 'ISO 8601 timestamp of when the comment was last updated.',
    }),
    issue_url: z.string().meta({
      description:
        'API URL for the issue or pull request this comment belongs to.',
    }),
    author_association: z
      .enum([
        'COLLABORATOR',
        'CONTRIBUTOR',
        'FIRST_TIMER',
        'FIRST_TIME_CONTRIBUTOR',
        'MANNEQUIN',
        'MEMBER',
        'NONE',
        'OWNER',
      ])
      .meta({
        description:
          'How the author is associated with the repository. Can be "COLLABORATOR", "CONTRIBUTOR", "FIRST_TIMER", "FIRST_TIME_CONTRIBUTOR", "MANNEQUIN", "MEMBER", "NONE", or "OWNER".',
      }),
  })
  .meta({
    description:
      'Represents a comment on an issue or pull request. You can use the REST API to create comments on issues and pull requests.',
  })

export type Comment = z.infer<typeof CommentSchema>
