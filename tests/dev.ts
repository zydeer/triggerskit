import github from '@triggerskit/github'
import slack from '@triggerskit/slack'
import telegram from '@triggerskit/telegram'
import triggers from 'triggerskit'
import { memory } from 'triggerskit/storage'

const storage = memory()

export const kit = triggers({
  providers: {
    tl: telegram({
      token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
    }),
    gh: github({
      oauth: {
        clientId: '...',
        clientSecret: '...',
        redirectUri: '...',
      },
      storage,
    }),
    sl: slack({
      token: '...',
    }),
  },
})

const result = Bun.serve({
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.gh.actions.getRepo({
          owner: 'arshad-yaseen',
          repo: 'yuku',
        })

        if (!result.ok) {
          return new Response(result.error.message)
        }

        return Response.json(result.data.language)
      },
    },
    '/auth': {
      GET: async () => {
        const result = await kit.gh.oauth.getAuthUrl({
          scopes: ['repo'],
        })

        if (!result) {
          return new Response('Failed to generate auth URL')
        }

        return Response.redirect(result.url)
      },
    },
    '/auth/callback': {
      GET: async (request) => {
        const { code } = Object.fromEntries(new URL(request.url).searchParams)

        const state = request.cookies.get('auth_state')!

        const result = await kit.gh.oauth.handleCallback(code, state)

        if (!result.ok) {
          return new Response(result.error.message)
        }

        return Response.redirect('/')
      },
    },
    '/me': {
      GET: async () => {
        const result = await kit.tl.actions.getMe()

        return Response.json(result)
      },
    },
    '/raw': {
      GET: async () => {
        const result = await kit.tl.http('/getUpdates', {
          method: 'POST',
          body: JSON.stringify({ offset: 0, limit: 10 }),
        })

        return Response.json(result)
      },
    },
    '/webhook': {
      POST: async (request) => {
        const result = await kit.handle(request)

        if (result.ok) {
          if (result.data.provider === 'tl') {
            console.log(`Webhook handled by: ${result.data.payload}`)
          }
        } else {
          console.error('Webhook error:', result.error.message)
        }

        return new Response('OK')
      },
    },
    '/webhook/telegram': {
      POST: async (request) => {
        await kit.tl.webhooks.handle(request)
        return new Response('OK')
      },
    },
    '/webhook/setup': {
      GET: async () => {
        const result = await kit.tl.webhooks.set({
          url: 'https://example.com/webhook',
          secret_token: 'my-secret-token',
        })

        return Response.json(result)
      },
    },
    '/webhook/info': {
      GET: async () => {
        const result = await kit.tl.webhooks.info()

        return Response.json(result)
      },
    },
    '/webhook/delete': {
      GET: async () => {
        const result = await kit.tl.webhooks.delete()

        return Response.json(result)
      },
    },
  },
})

console.log(`Test server is running on http://localhost:${result.port}`)
