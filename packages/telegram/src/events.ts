import type { EventMap } from '@triggerskit/core/events'
import type { Message } from './schemas'

export interface TelegramEvents extends EventMap {
  /** New incoming message */
  message: Message
}
