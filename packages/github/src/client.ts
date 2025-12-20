import {
  createHttpClient,
  type HttpClient,
  type OAuthClient,
} from '@triggerskit/core'
import type { GitHubConfig } from './types'

export interface GitHubClientOptions {
  config: GitHubConfig
  tokenKey: string
  oauthClient?: OAuthClient
}

/** Create a configured HTTP client for GitHub API */
export function createGitHubClient(options: GitHubClientOptions): HttpClient {
  const { config, tokenKey, oauthClient } = options
  const baseUrl = config.baseUrl ?? 'https://api.github.com'

  return createHttpClient({
    baseUrl,
    timeout: config.timeout,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    getToken: async () => {
      if (config.token) return config.token
      if (oauthClient) {
        const tokens = await oauthClient.getTokens(tokenKey)
        return tokens?.accessToken ?? null
      }
      return null
    },
  })
}
