import {
  createOAuth,
  type OAuth,
  type Storage,
  standardOAuthFlow,
} from '@triggerskit/core'

export interface GitHubOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
}

export type GitHubOAuth = OAuth

export function createGitHubOAuth(
  config: GitHubOAuthConfig,
  storage: Storage,
  tokenKey = 'default',
): GitHubOAuth {
  return createOAuth({
    flow: standardOAuthFlow({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
      authUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: config.scopes,
    }),
    storage,
    namespace: 'github',
    tokenKey,
  })
}
