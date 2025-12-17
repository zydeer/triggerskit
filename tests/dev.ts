import { telegram } from '@triggerskit/telegram'
import { triggers } from 'triggerskit'

export const kit = triggers({
  supportBot: telegram({
    token: process.env.TELEGRAM_TOKEN || 'test-token',
  }),
  alertBot: telegram({
    token: process.env.TELEGRAM_ALERT_TOKEN || 'alert-token',
  }),
})

kit.enableLogger()

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: async () => {
        const result = await kit.supportBot.sendMessage({
          chat_id: 123456,
          text: 'Hello from Telegram!',
        })

        return Response.json(result)
      },
    },
    '/me': {
      GET: async () => {
        const me = await kit.supportBot.getMe()
        return Response.json(me)
      },
    },
  },
})

console.log('Test server is running on http://localhost:4000')
