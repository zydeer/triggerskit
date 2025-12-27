import github from '@triggerskit/github'
import slack from '@triggerskit/slack'
import telegram from '@triggerskit/telegram'
import { Hono } from 'hono'
import triggers from 'triggerskit'
// import { oauth } from 'triggerskit/frameworks/hono'
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
        redirectUri: 'http://localhost:3000/auth/github/callback',
      },

      storage,
    }),
    slack: slack({
      token: '...',
    }),
  },
})

const USER_ID = '1234567890'

const app = new Hono()

app.get('/', async () => {
  const user = kit.github.forUser(USER_ID)

  const isAuthenticated = await user.oauth.isAuthenticated()

  if (!isAuthenticated) {
    return Response.redirect('/auth/github')
  }

  const repo = await user.actions.createComment({
    owner: 'arshad-yaseen',
    repo: 'yuku',
    issue_number: 8,
    body: 'Hello, world!',
  })

  return Response.json(repo)
})

app.get('/auth/:provider', (c) =>
  kit.handleOAuth(c.req.param('provider'), USER_ID),
)

app.get('/auth/:provider/callback', (c) =>
  kit.handleOAuthCallback(c.req.param('provider'), USER_ID, c.req.raw, () =>
    Response.redirect('/'),
  ),
)

export default {
  port: 3000,
  fetch: app.fetch,
}
