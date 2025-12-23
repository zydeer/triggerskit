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
        clientId: 'Ov23liiPYTB16I9Yfwxe',
        clientSecret: '36affd5a5e7b12b06626d337d5a8b4516f01d4d8',
        redirectUri: 'http://localhost:3000/auth/callback',
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
      const user = kit.github.forUser(USER_ID)

      const isAuthenticated = await user.oauth.isAuthenticated()

      if (!isAuthenticated) {
        return Response.redirect('/auth')
      }

      const repo = await user.actions.createComment({
        owner: 'arshad-yaseen',
        repo: 'yuku',
        issue_number: 8,
        body: 'Hello, world!',
      })

      return Response.json(repo)
    },
    '/auth': async (req) => {
      const user = kit.github.forUser(USER_ID)

      const result = await user.oauth.getAuthUrl()

      req.cookies.set('auth_state', result.state)

      return Response.redirect(result.url)
    },
    '/auth/callback': async (req) => {
      const url = new URL(req.url)
      const code = url.searchParams.get('code')!

      const user = kit.github.forUser(USER_ID)

      const state = req.cookies.get('auth_state')!

      const result = await user.oauth.handleCallback(code, state)

      if (!result.ok) {
        return new Response(result.error.message, { status: 400 })
      }

      return Response.redirect('/')
    },
  },
})

console.log(`Test server is running on http://localhost:${result.port}`)
