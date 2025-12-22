import type { Storage } from '@triggerskit/core/storage'

interface Entry {
  /** The stored value */
  value: unknown
  /** Expiration timestamp in milliseconds, or null if no expiration */
  expiresAt: number | null
}

export interface MemoryStorageOptions {
  /** Cleanup interval in milliseconds for expired entries */
  cleanupInterval?: number
}

/**
 * In-memory storage adapter for development and testing.
 *
 * @example
 * ```ts
 * const storage = memory()
 *
 * const gh = github({
 *   oauth: { clientId: '...', clientSecret: '...', redirectUri: '...' },
 *   storage,
 * })
 * ```
 */
export function memory(options: MemoryStorageOptions = {}): Storage {
  const store = new Map<string, Entry>()
  const { cleanupInterval = 60000 } = options

  const interval = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (entry.expiresAt !== null && entry.expiresAt <= now) {
        store.delete(key)
      }
    }
  }, cleanupInterval)

  if (typeof interval.unref === 'function') {
    interval.unref()
  }

  const isExpired = (entry: Entry) =>
    entry.expiresAt !== null && entry.expiresAt <= Date.now()

  return {
    async get<T>(key: string): Promise<T | null> {
      const entry = store.get(key)
      if (!entry || isExpired(entry)) {
        if (entry) store.delete(key)
        return null
      }
      return entry.value as T
    },

    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
      store.set(key, {
        value,
        expiresAt: ttl ? Date.now() + ttl * 1000 : null,
      })
    },

    async delete(key: string): Promise<void> {
      store.delete(key)
    },

    async has(key: string): Promise<boolean> {
      const entry = store.get(key)
      if (!entry || isExpired(entry)) {
        if (entry) store.delete(key)
        return false
      }
      return true
    },
  }
}
