import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'

export const kit = triggers({
  bot: telegram({
    token: '8012216171:AAEoYSKa0aCyAILgErMC1TiSLtkZLxfVisI',
  }),
})

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.bot.actions.sendMessage({
          chatId: 8432550641,
          text: 'Replying to specific text',
          replyParameters: {
            messageId: 42,
            quote: 'the specific text to quote',
          },
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
        const result = await kit.bot.actions.getMe()

        return Response.json(result)
      },
    },
    '/raw': {
      GET: async () => {
        const result = await kit.bot.request('/getUpdates', {
          method: 'POST',
          body: JSON.stringify({ offset: 0, limit: 10 }),
        })

        return Response.json(result)
      },
    },
  },
})

console.log('Test server is running on http://localhost:4000')
