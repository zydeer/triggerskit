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
      token: '',
      storage,
    }),
  },
})

Bun.serve({
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.gh.actions.getRepo({
          owner: 'bunup',
          repo: 'bunup',
        })

        if (!result.ok) {
          return new Response(result.error.message)
        }

        return Response.json(result.data)
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

console.log('Test server is running on http://localhost:4000')
