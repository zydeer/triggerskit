import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'

export const kit = triggers({
  providers: {
    prettyBot: telegram({
      token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
    }),
  },
})

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.prettyBot.actions.sendMessage({
          chatId: 8432550641,
          text: 'Replying to specific text',
        })

        if (result.data) {
          return Response.json(result.data.chat)
        }

        if (result.error) {
          return new Response(result.error.message)
        }

        return new Response('Error')
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
        const result = await kit.prettyBot.handleUpdate(request)

        if (result.data) {
          const update = result.data

          if (update.message) {
            console.log('New message:', update.message.text)
            await kit.prettyBot.actions.sendMessage({
              chatId: update.message.chat.id,
              text: `You said: ${update.message.text}`,
            })
          }

          if (update.callbackQuery) {
            console.log('Callback:', update.callbackQuery.data)
          }
        }

        return new Response('OK')
      },
    },
    '/webhook/setup': {
      GET: async () => {
        const result = await kit.prettyBot.actions.setWebhook({
          url: 'https://example.com/webhook',
          secretToken: 'my-secret-token',
          allowedUpdates: ['channel_post'],
        })

        return Response.json(result)
      },
    },
    '/webhook/info': {
      GET: async () => {
        const result = await kit.prettyBot.actions.getWebhookInfo()

        return Response.json(result)
      },
    },
    '/webhook/delete': {
      GET: async () => {
        const result = await kit.prettyBot.actions.deleteWebhook()

        return Response.json(result)
      },
    },
  },
})

console.log('Test server is running on http://localhost:4000')
