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
  /** Key prefix (default: 'triggerskit') */
  prefix?: string
}

/** Redis storage adapter - works with any compatible Redis client */
export function redis(config: RedisStorageConfig): StorageAdapter {
  const { client, prefix = 'triggerskit' } = config
  const key = (k: string) => `${prefix}:${k}`

  return {
    async get<T>(k: string): Promise<T | null> {
      const data = await client.get(key(k))
      if (data === null) return null
      try {
        return JSON.parse(data) as T
      } catch {
        return null
      }
    },

    async set<T>(k: string, value: T, ttl?: number): Promise<void> {
      const data = JSON.stringify(value)
      await (ttl
        ? client.set(key(k), data, { EX: ttl })
        : client.set(key(k), data))
    },

    async delete(k: string): Promise<void> {
      await client.del(key(k))
    },

    async has(k: string): Promise<boolean> {
      return (await client.exists(key(k))) > 0
    },
  }
}
