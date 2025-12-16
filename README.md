# triggerskit

```ts
// src/triggers.ts

import telegram from '@triggerskit/telegram'
import { Triggers } from 'triggerskit'

export const myTelegram = telegram({
  apiKey: process.env.TELEGRAM_API_KEY,
})

const triggers = new Triggers({
  providers: [myTelegram],
})

triggers.init()
triggers.logger() // optional, log events realtime
```

```ts
// src/index.ts

import { myTelegram } from "./triggers"

const result = await myTelegram.actions.sendMessage({
  message: 'hello',
})
```
