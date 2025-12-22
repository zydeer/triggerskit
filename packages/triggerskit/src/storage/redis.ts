import type { Storage } from '@triggerskit/core'

export interface RedisClient {
  get(key: string): Promise<string | null>
  set(key: string, value: string, options?: { EX?: number }): Promise<unknown>
  del(key: string): Promise<number>
  exists(key: string): Promise<number>
}

export interface RedisStorageOptions {
  /** Redis client instance */
  client: RedisClient
  /** Optional key prefix for namespacing */
  prefix?: string
}

/**
 * Redis storage adapter.
 *
 * @example
 * ```ts
 * import { createClient } from 'redis'
 *
 * const client = createClient()
 * await client.connect()
 *
 * const storage = redis({ client })
 *
 * const gh = github({
 *   oauth: { clientId: '...', clientSecret: '...', redirectUri: '...' },
 *   storage,
 * })
 * ```
 */
export function redis(options: RedisStorageOptions): Storage {
  const { client, prefix = 'triggerskit' } = options
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
      if (ttl) {
        await client.set(key(k), data, { EX: ttl })
      } else {
        await client.set(key(k), data)
      }
    },

    async delete(k: string): Promise<void> {
      await client.del(key(k))
    },

    async has(k: string): Promise<boolean> {
      return (await client.exists(key(k))) > 0
    },
  }
}
