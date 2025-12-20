import { describe, expect, it } from 'bun:test'
import { triggers } from '../src'
import { memory } from '../src/storage'

function mockProvider(name: string) {
  return {
    name,
    actions: {},
    webhooks: {
      handle: async () => ({ ok: true as const, data: { name } }),
    },
    on: () => () => {},
    http: async () => ({}),
    detect: () => name === 'mock',
  }
}

describe('triggers', () => {
  it('creates a TriggersKit instance', () => {
    const kit = triggers({
      mock: mockProvider('mock') as never,
    })

    expect(kit.mock).toBeDefined()
    expect(kit.handle).toBeFunction()
  })

  it('handles webhooks from matching provider', async () => {
    const kit = triggers({
      mock: mockProvider('mock') as never,
    })

    const result = await kit.handle(new Request('https://example.com'))
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.provider).toBe('mock')
    }
  })

  it('returns error when no provider matches', async () => {
    const kit = triggers({
      other: mockProvider('other') as never,
    })

    const result = await kit.handle(new Request('https://example.com'))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toContain('No matching provider')
    }
  })
})

describe('memory storage', () => {
  it('stores and retrieves values', async () => {
    const storage = memory()

    await storage.set('key', { value: 42 })
    const result = await storage.get<{ value: number }>('key')

    expect(result).toEqual({ value: 42 })
  })

  it('returns null for missing keys', async () => {
    const storage = memory()
    const result = await storage.get('nonexistent')

    expect(result).toBeNull()
  })

  it('deletes values', async () => {
    const storage = memory()

    await storage.set('key', 'value')
    await storage.delete('key')
    const result = await storage.get('key')

    expect(result).toBeNull()
  })

  it('checks key existence', async () => {
    const storage = memory()

    await storage.set('key', 'value')
    expect(await storage.has('key')).toBe(true)
    expect(await storage.has('nonexistent')).toBe(false)
  })

  it('respects TTL', async () => {
    const storage = memory()

    await storage.set('key', 'value', 0.001) // 1ms TTL
    await new Promise((r) => setTimeout(r, 10))
    const result = await storage.get('key')

    expect(result).toBeNull()
  })
})
