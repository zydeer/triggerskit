/**
 * Storage adapter interface
 * Minimal, composable interface for persisting provider state (tokens, etc.)
 */
export type StorageAdapter = {
  /** Get a value by key */
  get: <T = unknown>(key: string) => Promise<T | null>
  /** Set a value with optional TTL in seconds */
  set: <T = unknown>(key: string, value: T, ttl?: number) => Promise<void>
  /** Delete a value by key */
  delete: (key: string) => Promise<void>
  /** Check if a key exists */
  has: (key: string) => Promise<boolean>
}

/**
 * Scoped storage - namespaces keys under a provider prefix
 */
export type ScopedStorage = StorageAdapter & {
  /** The namespace prefix for this storage */
  readonly namespace: string
}

/**
 * Creates a scoped storage adapter that namespaces all keys
 */
export function scopedStorage(
  adapter: StorageAdapter,
  namespace: string,
): ScopedStorage {
  const prefix = (key: string) => `${namespace}:${key}`

  return {
    namespace,
    get: <T = unknown>(key: string) => adapter.get<T>(prefix(key)),
    set: <T = unknown>(key: string, value: T, ttl?: number) =>
      adapter.set(prefix(key), value, ttl),
    delete: (key: string) => adapter.delete(prefix(key)),
    has: (key: string) => adapter.has(prefix(key)),
  }
}
