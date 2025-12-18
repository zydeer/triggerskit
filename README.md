# triggerskit

Below are the concepts. Fully type-safe end to end.

```ts
import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'

export const kit = triggers({
  providers: {
    prettyBot: telegram({
      token: process.env.TELEGRAM_TOKEN,
    }),
  },
})

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.prettyBot.actions.sendMessage({
          chatId: 123456789,
          text: 'Hey, how is going?',
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
        const result = await kit.prettyBot.webhooks.handle(request)

        if (result.data) {
          const update = result.data

          if (update.message) {
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
        const result = await kit.prettyBot.webhooks.set({
          url: 'https://example.com/webhook',
          secretToken: 'my-secret-token',
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
```
