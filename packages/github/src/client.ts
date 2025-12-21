import { createHttpClient, type HttpClient } from '@triggerskit/core'
import type { GitHubConfig } from './types'

export interface GitHubClientOptions {
  config: GitHubConfig
  getToken?: () => Promise<string | null>
}

export function createGitHubClient(options: GitHubClientOptions): HttpClient {
  const { config, getToken } = options

  return createHttpClient({
    baseUrl: config.baseUrl ?? 'https://api.github.com',
    timeout: config.timeout,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    getToken: async () => {
      if ('token' in config && config.token) return config.token
      if (getToken) return getToken()
      return null
    },
  })
}
