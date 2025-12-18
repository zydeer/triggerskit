import type { Message } from './types'

export type TelegramEventMap = {
  /** New incoming message */
  message: Message
}

export type TelegramEvent = keyof TelegramEventMap
