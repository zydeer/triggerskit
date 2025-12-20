import { fail, type OAuthClient, ok, type Result } from '@triggerskit/core'
import type { GitHubOAuth } from './types'

/** Create GitHub OAuth utilities from core OAuth client */
export function createGitHubOAuth(
  client: OAuthClient,
  tokenKey: string,
): GitHubOAuth {
  return {
    getAuthUrl: client.getAuthUrl,

    async handleCallback(
      code: string,
      state: string,
    ): Promise<Result<{ success: true }>> {
      try {
        const result = await client.exchangeCode(code, state)
        if (!result.ok) return result

        await client.storeTokens(tokenKey, result.data)
        return ok({ success: true })
      } catch (e) {
        return fail(e)
      }
    },

    isAuthenticated: () => client.hasValidTokens(tokenKey),
    revokeTokens: () => client.deleteTokens(tokenKey),
  }
}
