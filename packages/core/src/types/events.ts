export type EventMap = Record<string, unknown>

export type EventHandler<T> = (payload: T) => void | Promise<void>

export type Unsubscribe = () => void

export type EventEmitter<TEvents extends EventMap> = {
  emit: <K extends keyof TEvents>(event: K, payload: TEvents[K]) => void
}

export type EventListener<TEvents extends EventMap> = {
  on: <K extends keyof TEvents>(
    event: K,
    handler: EventHandler<TEvents[K]>,
  ) => Unsubscribe
}

export type Events<TEvents extends EventMap> = EventEmitter<TEvents> &
  EventListener<TEvents>

export function createEvents<TEvents extends EventMap>(): Events<TEvents> {
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
      return () => handlers.get(event)?.delete(handler as EventHandler<unknown>)
    },

    emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
      handlers.get(event)?.forEach((h) => {
        h(payload)
      })
    },
  }
}
