import github from '@triggerskit/github'
import slack from '@triggerskit/slack'
import telegram from '@triggerskit/telegram'
import triggers from 'triggerskit'
import { memory } from 'triggerskit/storage'

const storage = memory()

export const kit = triggers({
  providers: {
    telegram: telegram({
      token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
    }),
    github: github({
      oauth: {
        clientId: '...',
        clientSecret: '...',
        redirectUri: '...',
      },
      storage,
    }),
    slack: slack({
      token: '...',
    }),
  },
})

const USER_ID = '1234567890'

const result = Bun.serve({
  routes: {
    '/': async () => {
      const userGithub = kit.github.forUser(USER_ID)

      const isAuthenticated = await userGithub.oauth.isAuthenticated()

      if (!isAuthenticated) {
        return Response.redirect('/auth')
      }

      const repo = await userGithub.actions.getRepo({
        owner: 'bunup',
        repo: 'bunup',
      })

      return Response.json(repo)
    },
    '/auth': async (req) => {
      const userGithub = kit.github.forUser(USER_ID)

      const result = await userGithub.oauth.getAuthUrl()

      req.cookies.set('auth_state', result.state)

      return Response.redirect(result.url)
    },
    '/auth/callback': async (req) => {
      const url = new URL(req.url)
      const code = url.searchParams.get('code')!

      const userGithub = kit.github.forUser(USER_ID)

      const state = req.cookies.get('auth_state')!

      const result = await userGithub.oauth.handleCallback(code, state)

      if (!result.ok) {
        return new Response('Auth failed!', { status: 400 })
      }

      return Response.redirect('/')
    },
  },
})

console.log(`Test server is running on http://localhost:${result.port}`)
