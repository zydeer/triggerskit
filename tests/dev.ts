import { telegram } from '@triggerskit/telegram'
import { greet, sum } from 'triggerskit'

Bun.serve({
  port: 4000,
  routes: {
    '/': {
      GET: () => {
        return new Response(greet('Arshad'))
      },
    },
    '/sum': {
      GET: () => {
        return new Response(sum(5, 5).toString())
      },
    },
    '/telegram': {
      GET: () => {
        return new Response(telegram())
      },
    },
  },
})

console.log('Test server is running on http://localhost:4000')
