import telegram from '@triggerskit/telegram'
import { Triggers } from 'triggerskit'

const abcTelegram = telegram({
  token: '...',
})

const triggers = new Triggers({
  providers: [abcTelegram],
})

triggers.init()

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: () => {
        const result = abcTelegram.actions.sendMessage({
          message: 'hello',
        })

        return new Response(result.timestamp)
      },
    },
  },
})

console.log('Test server is running on http://localhost:4000')
