import type { StorageAdapter } from './types'

type Entry = { value: unknown; expiresAt: number | null }

export type MemoryStorageConfig = {
  /** Cleanup interval in ms (default: 60000) */
  cleanupInterval?: number
}

/** In-memory storage adapter for development and testing */
export function memory(config: MemoryStorageConfig = {}): StorageAdapter {
  const store = new Map<string, Entry>()
  const { cleanupInterval = 60000 } = config

  // Periodic cleanup
  const interval = setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (entry.expiresAt !== null && entry.expiresAt <= now) store.delete(key)
    }
  }, cleanupInterval)

  if (typeof interval.unref === 'function') interval.unref()

  const isExpired = (e: Entry) =>
    e.expiresAt !== null && e.expiresAt <= Date.now()

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
      store.set(key, { value, expiresAt: ttl ? Date.now() + ttl * 1000 : null })
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
