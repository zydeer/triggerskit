import github from '@triggerskit/github'
import slack from '@triggerskit/slack'
import telegram from '@triggerskit/telegram'
import { Hono } from 'hono'
import { type OAuthProviderName, triggers } from 'triggerskit'
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
        redirectUri: 'http://localhost:3000/auth/github/callback',
      },
      storage,
    }),
    slack: slack({
      token: '...',
    }),
  },
})

const userId = '1234567890'

const app = new Hono()

app.get('/', async () => {
  if (!(await kit.isAuthenticated('github', userId))) {
    return Response.redirect('/auth/github')
  }

  const user = kit.github.forUser(userId)

  const repo = await user.actions.getRepo({
    owner: 'arshad-yaseen',
    repo: 'yuku',
  })

  return Response.json(repo)
})

app.get('/auth/:provider', (c) =>
  kit.authorize({
    provider: c.req.param('provider') as OAuthProviderName<typeof kit>,
    userId,
  }),
)

app.get('/auth/:provider/callback', (c) =>
  kit
    .oauthCallback({
      provider: c.req.param('provider') as OAuthProviderName<typeof kit>,
      userId,
      callbackUrl: c.req.url,
    })
    .onSuccess(() => Response.redirect('/')),
)

export default {
  port: 3000,
  fetch: app.fetch,
}
