import { github } from '@triggerskit/github'
import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'
import { memory } from 'triggerskit/storage'

const storage = memory()

export const kit = triggers({
  providers: {
    prettyBot: telegram({
      token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
    }),
    gh: github({
      oauth: {
        clientId: 'Ov23liiPYTB16I9Yfwxe',
        clientSecret: '36affd5a5e7b12b06626d337d5a8b4516f01d4d8',
        redirectUri: 'http://localhost:3000/auth/callback',
      },
      storage,
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
        const result = await kit.gh.oauth?.getAuthUrl({
          scopes: ['repo'],
          state: 'random_state',
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

        const result = await kit.gh.oauth?.handleCallback(code, 'random_state')

        if (!result) {
          return new Response('Failed to handle callback')
        }

        if (!result.ok) {
          return new Response(result.error.message)
        }

        return Response.redirect('/')
      },
    },
    '/me': {
      GET: async () => {
        const result = await kit.prettyBot.actions.getMe()

        return Response.json(result)
      },
    },
    '/raw': {
      GET: async () => {
        const result = await kit.prettyBot.http('/getUpdates', {
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
          if (result.data.provider === 'prettyBot') {
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
        await kit.prettyBot.webhooks.handle(request)
        return new Response('OK')
      },
    },
    '/webhook/setup': {
      GET: async () => {
        const result = await kit.prettyBot.webhooks.set({
          url: 'https://example.com/webhook',
          secret_token: 'my-secret-token',
        })

        return Response.json(result)
      },
    },
    '/webhook/info': {
      GET: async () => {
        const result = await kit.prettyBot.webhooks.info()

        return Response.json(result)
      },
    },
    '/webhook/delete': {
      GET: async () => {
        const result = await kit.prettyBot.webhooks.delete()

        return Response.json(result)
      },
    },
  },
})

console.log(`Test server is running on http://localhost:${result.port}`)
