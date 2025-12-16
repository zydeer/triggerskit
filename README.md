# triggerskit

```ts
// src/triggers.ts
import telegram from '@triggerskit/telegram'
import { Triggers } from 'triggerskit'

export const myTelegram = telegram({
  token: '...',
})

const triggers = new Triggers({
  providers: [myTelegram],
})

triggers.init()
```

```ts
import { myTelegram } from "./triggers"

const result = myTelegram.actions.sendMessage({
  message: 'hello',
})
```
