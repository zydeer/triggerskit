import type { OAuthProvider } from '@triggerskit/core/provider'
import { createMiddleware } from 'hono/factory'
import { routePath } from 'hono/route'
import type { KitHandler } from '..'

const OAUTH_ROUTE = '/auth/:provider'
const OAUTH_CALLBACK = '/auth/:provider/callback'

export const oauth = (userId: string): KitHandler => {
  return ({ providers }) => {
    return createMiddleware(async (c, next) => {
      const path = routePath(c)

      if (path !== OAUTH_ROUTE && path !== OAUTH_CALLBACK) {
        return next()
      }

      const providerName = c.req.param('provider')
      if (!providerName) {
        return c.text('Provider name is required', 400)
      }

      const provider = providers[providerName]
      if (!provider) {
        return c.text(`Provider "${providerName}" not found`, 404)
      }

      if (!('forUser' in provider)) {
        return c.text(`Provider "${providerName}" does not support OAuth`, 400)
      }

      const oauthProvider = provider as OAuthProvider
      const user = oauthProvider.forUser(userId)

      // Handle OAuth initiation
      if (path === OAUTH_ROUTE) {
        try {
          const { url } = await user.oauth.getAuthUrl()
          return c.redirect(url, 302)
        } catch (error) {
          console.error('[OAuth] Authorization failed:', error)
          return c.text('Failed to initiate OAuth flow', 500)
        }
      }

      // Handle OAuth callback
      if (path === OAUTH_CALLBACK) {
        const code = c.req.query('code')
        const state = c.req.query('state')

        if (!code) {
          return c.text('Authorization code is missing', 400)
        }

        if (!state) {
          return c.text('State parameter is missing', 400)
        }

        try {
          const result = await user.oauth.handleCallback(code, state)

          if (!result.ok) {
            return c.text(result.error.message || 'OAuth callback failed', 400)
          }

          return c.json({ success: true, message: 'Authentication successful' })
        } catch (error) {
          console.error('[OAuth] Callback failed:', error)
          return c.text('Failed to complete OAuth flow', 500)
        }
      }

      return next()
    })
  }
}
