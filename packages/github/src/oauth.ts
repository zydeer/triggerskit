import { createProviderOAuth, type OAuthClient } from '@triggerskit/core'
import type { GitHubOAuth } from './types'

export function createGitHubOAuth(
  client: OAuthClient,
  tokenKey: string,
): GitHubOAuth {
  return createProviderOAuth(client, tokenKey)
}
