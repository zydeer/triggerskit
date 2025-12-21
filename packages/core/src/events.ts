export type EventMap = { [key: string]: unknown }

export type EventHandler<T> = (payload: T) => void | Promise<void>

export type Unsubscribe = () => void

export interface EventEmitter<TEvents extends EventMap> {
  /** Subscribe to an event */
  on<K extends keyof TEvents>(
    event: K,
    handler: EventHandler<TEvents[K]>,
  ): Unsubscribe
  /** Emit an event to all subscribers */
  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void
}

export function createEmitter<
  TEvents extends EventMap,
>(): EventEmitter<TEvents> {
  const handlers = new Map<keyof TEvents, Set<EventHandler<unknown>>>()

  return {
    on<K extends keyof TEvents>(
      event: K,
      handler: EventHandler<TEvents[K]>,
    ): Unsubscribe {
      let set = handlers.get(event)
      if (!set) {
        set = new Set()
        handlers.set(event, set)
      }
      set.add(handler as EventHandler<unknown>)
      return () => set?.delete(handler as EventHandler<unknown>)
    },

    emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
      handlers.get(event)?.forEach((h) => {
        h(payload)
      })
    },
  }
}
