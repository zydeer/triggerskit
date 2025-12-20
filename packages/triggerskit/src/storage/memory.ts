import type { StorageAdapter } from './types'

type MemoryEntry = {
  value: unknown
  expiresAt: number | null
}

export type MemoryStorageConfig = {
  /** Clean up expired entries every N milliseconds (default: 60000) */
  cleanupInterval?: number
}

/**
 * In-memory storage adapter for development and testing
 */
export function memory(config: MemoryStorageConfig = {}): StorageAdapter {
  const store = new Map<string, MemoryEntry>()
  const { cleanupInterval = 60000 } = config

  // Periodic cleanup of expired entries
  const cleanup = () => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (entry.expiresAt !== null && entry.expiresAt <= now) {
        store.delete(key)
      }
    }
  }

  const interval = setInterval(cleanup, cleanupInterval)
  // Allow process to exit even if interval is running
  if (typeof interval.unref === 'function') {
    interval.unref()
  }

  const isExpired = (entry: MemoryEntry): boolean => {
    return entry.expiresAt !== null && entry.expiresAt <= Date.now()
  }

  return {
    async get<T = unknown>(key: string): Promise<T | null> {
      const entry = store.get(key)
      if (!entry || isExpired(entry)) {
        if (entry) store.delete(key)
        return null
      }
      return entry.value as T
    },

    async set<T = unknown>(key: string, value: T, ttl?: number): Promise<void> {
      const expiresAt = ttl ? Date.now() + ttl * 1000 : null
      store.set(key, { value, expiresAt })
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
