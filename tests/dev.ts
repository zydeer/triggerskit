import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'

export const kit = triggers({
  providers: {
    prettyBot: telegram({
      token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
    }),
  },
})

kit.prettyBot.on('message', async (message) => {
  console.log('New message:', message.text)

  await kit.prettyBot.actions.sendMessage({
    chat_id: message.chat.id,
    text: `You said: ${message.text}`,
  })
})

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.prettyBot.actions.sendMessage({
          chat_id: 8432550641,
          text: 'Replying to specific text',
        })

        if (result.data) {
          return Response.json(result.data.chat)
        }

        return new Response(result.error.message)
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
        const result = await kit.prettyBot.request('/getUpdates', {
          method: 'POST',
          body: JSON.stringify({ offset: 0, limit: 10 }),
        })

        return Response.json(result)
      },
    },
    '/webhook': {
      POST: async (request) => {
        const result = await kit.handle(request)

        if (result.data) {
          console.log(`Webhook handled by: ${result.data.provider}`)
        }

        if (result.error) {
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
