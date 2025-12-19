import type { Message } from './schemas'

export type TelegramEventMap = {
  /** New incoming message */
  message: Message
}

export type TelegramEvent = keyof TelegramEventMap
