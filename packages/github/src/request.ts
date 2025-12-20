import type { OAuthHandler } from '@triggerskit/core/oauth'
import { type RequestFn, TriggersError } from '@triggerskit/core/types'
import { fetchWithTimeout } from '@triggerskit/core/utils'
import type { GitHubConfig } from '.'

export type GitHubRequestConfig = {
  config: GitHubConfig
  oauth?: OAuthHandler
}

/**
 * Create a request function for GitHub API
 * Handles both static token and OAuth token authentication
 */
export function createRequest(ctx: GitHubRequestConfig): RequestFn {
  const baseUrl = ctx.config.baseUrl ?? 'https://api.github.com'

  return async <T = unknown>(path: string, init?: RequestInit): Promise<T> => {
    const url = path.startsWith('http') ? path : `${baseUrl}${path}`

    // Get token - either static or from OAuth
    let token: string | null = null

    if (ctx.config.token) {
      token = ctx.config.token
    } else if (ctx.oauth && ctx.config.tokenKey) {
      const tokens = await ctx.oauth.getTokens(ctx.config.tokenKey)
      if (tokens) {
        token = tokens.accessToken
      }
    }

    if (!token) {
      throw new TriggersError(
        'No authentication token available. Either provide a token or complete OAuth flow.',
      )
    }

    try {
      const response = await fetchWithTimeout(url, {
        ...init,
        timeout: ctx.config.timeout,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      })

      // Handle no-content responses
      if (response.status === 204) {
        return undefined as T
      }

      const data = await response.json()

      if (!response.ok) {
        throw new TriggersError(data.message ?? 'GitHub API error', {
          status: response.status,
          errors: data.errors,
        })
      }

      return data as T
    } catch (e) {
      if (e instanceof TriggersError) throw e

      if (e instanceof Error && e.name === 'AbortError') {
        throw new TriggersError('Request timed out')
      }

      throw new TriggersError('Network request failed')
    }
  }
}
