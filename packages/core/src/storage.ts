/**
 * Storage interface for persisting OAuth state and tokens.
 */
export interface Storage {
  /**
   * Retrieve a value from storage by key.
   */
  get<T = unknown>(key: string): Promise<T | null>
  /**
   * Store a value in storage with an optional TTL.
   */
  set<T = unknown>(key: string, value: T, ttl?: number): Promise<void>
  /**
   * Delete a value from storage by key.
   */
  delete(key: string): Promise<void>
  /**
   * Check if a key exists in storage.
   */
  has(key: string): Promise<boolean>
}
