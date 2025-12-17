# triggerskit

```ts
// src/triggers.ts

import triggers from 'triggerskit'
import telegram from '@triggerskit/telegram'
import slack from '@triggerskit/slack'

export const kit = triggers({
  supportBot: telegram({
    token: process.env.TELEGRAM_TOKEN,
  }),
  mainSlack: slack({
    token: process.env.SLACK_TOKEN,
  })
})

kit.enableLogger() // optional
```

```ts
// src/index.ts

import { kit } from "./triggers"

const result = await kit.supportBot.actions.sendMessage({
  chat_id: 123456,
  text: 'Hello from Telegram!',
})

const me = await kit.mainSlack.actions.getMe()

const result = await kit.supportBot.events.on("message:sent", (msg) => {
  console.log(msg)
})
```
