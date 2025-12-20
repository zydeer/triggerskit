import type { Storage } from '@triggerskit/core'

export type { Storage }

/** Storage with a namespace prefix for all keys */
export type NamespacedStorage = Storage & {
  readonly namespace: string
}

/** Create a namespaced storage that prefixes all keys */
export function withNamespace(
  storage: Storage,
  namespace: string,
): NamespacedStorage {
  const prefix = (key: string) => `${namespace}:${key}`

  return {
    namespace,
    get: <T>(key: string) => storage.get<T>(prefix(key)),
    set: <T>(key: string, value: T, ttl?: number) =>
      storage.set(prefix(key), value, ttl),
    delete: (key: string) => storage.delete(prefix(key)),
    has: (key: string) => storage.has(prefix(key)),
  }
}
