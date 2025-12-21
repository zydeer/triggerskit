import {
  type BaseOAuth,
  createOAuth,
  createOAuthWithTokens,
  type OAuthWithTokens,
  type Storage,
  standardOAuthFlow,
} from '@triggerskit/core'

export interface GitHubOAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes?: string[]
}

export function githubOAuthFlow(config: GitHubOAuthConfig) {
  return standardOAuthFlow({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scopes: config.scopes,
  })
}

export type GitHubOAuth = BaseOAuth

export interface CreateGitHubOAuthOptions {
  config: GitHubOAuthConfig
  storage: Storage
  tokenKey?: string
}

export function createGitHubOAuth(
  options: CreateGitHubOAuthOptions,
): GitHubOAuth {
  const { config, storage, tokenKey = 'default' } = options

  return createOAuth({
    flow: githubOAuthFlow(config),
    storage,
    namespace: 'github',
    tokenKey,
  })
}

export function createGitHubOAuthWithTokens(
  options: CreateGitHubOAuthOptions,
): OAuthWithTokens {
  const { config, storage, tokenKey = 'default' } = options

  return createOAuthWithTokens({
    flow: githubOAuthFlow(config),
    storage,
    namespace: 'github',
    tokenKey,
  })
}
