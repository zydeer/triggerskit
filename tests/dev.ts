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
  routes: {},
})

console.log(`Test server is running on http://localhost:${result.port}`)
