import type { StorageAdapter } from './types'

export type RedisClient = {
  get: (key: string) => Promise<string | null>
  set: (
    key: string,
    value: string,
    options?: { EX?: number },
  ) => Promise<unknown>
  del: (key: string) => Promise<number>
  exists: (key: string) => Promise<number>
}

export type RedisStorageConfig = {
  /** Redis client instance (from 'redis', 'ioredis', or compatible) */
  client: RedisClient
  /** Optional key prefix for all storage keys */
  prefix?: string
}

/**
 * Redis storage adapter
 * Works with any Redis client that implements the basic interface (redis, ioredis, etc.)
 */
export function redis(config: RedisStorageConfig): StorageAdapter {
  const { client, prefix = 'triggerskit' } = config
  const prefixKey = (key: string) => `${prefix}:${key}`

  return {
    async get<T = unknown>(key: string): Promise<T | null> {
      const data = await client.get(prefixKey(key))
      if (data === null) return null
      try {
        return JSON.parse(data) as T
      } catch {
        return null
      }
    },

    async set<T = unknown>(key: string, value: T, ttl?: number): Promise<void> {
      const data = JSON.stringify(value)
      if (ttl) {
        await client.set(prefixKey(key), data, { EX: ttl })
      } else {
        await client.set(prefixKey(key), data)
      }
    },

    async delete(key: string): Promise<void> {
      await client.del(prefixKey(key))
    },

    async has(key: string): Promise<boolean> {
      const exists = await client.exists(prefixKey(key))
      return exists > 0
    },
  }
}
