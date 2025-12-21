import { describe, expect, it } from 'bun:test'
import { z } from 'zod'
import { createEmitter, err, fail, isTKError, ok, parse, toError } from '../src'

describe('Result utilities', () => {
  it('ok creates a successful result', () => {
    const result = ok({ value: 42 })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.value).toBe(42)
    }
  })

  it('err creates a failed result', () => {
    const e = { message: 'Something went wrong' }
    const result = err(e)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toBe('Something went wrong')
    }
  })

  it('fail wraps any error', () => {
    const result = fail(new Error('Native error'))
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toBe('Native error')
    }
  })

  it('fail handles non-error values', () => {
    const result = fail('string error')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toBe('Unknown error')
    }
  })
})

describe('error utilities', () => {
  it('creates error with message', () => {
    const e = { message: 'Test error' }
    expect(e.message).toBe('Test error')
    expect(e.details).toBeUndefined()
  })

  it('creates error with details', () => {
    const e = { message: 'Test error', details: { code: 123 } }
    expect(e.message).toBe('Test error')
    expect(e.details).toEqual({ code: 123 })
  })

  it('isTKError identifies TKError objects', () => {
    expect(isTKError({ message: 'test' })).toBe(true)
    expect(isTKError({ message: 'test', details: {} })).toBe(true)
    expect(isTKError({})).toBe(false)
    expect(isTKError(null)).toBe(false)
    expect(isTKError('string')).toBe(false)
  })

  it('toError converts Error to TKError', () => {
    const e = toError(new Error('Native error'))
    expect(e.message).toBe('Native error')
  })

  it('toError passes through TKError', () => {
    const original = { message: 'Test', details: { x: 1 } }
    const e = toError(original)
    expect(e).toBe(original)
  })

  it('toError handles unknown values', () => {
    const e = toError('string')
    expect(e.message).toBe('Unknown error')
  })
})

describe('parse', () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  })

  it('parses valid data', () => {
    const result = parse(schema, { name: 'John', age: 30 })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.name).toBe('John')
      expect(result.data.age).toBe(30)
    }
  })

  it('returns error for invalid data', () => {
    const result = parse(schema, { name: 'John' })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error.message).toContain('Validation failed')
    }
  })
})

describe('EventEmitter', () => {
  it('emits and receives events', () => {
    const emitter = createEmitter<{ test: { value: number } }>()
    let received: number | null = null

    emitter.on('test', (payload) => {
      received = payload.value
    })

    emitter.emit('test', { value: 42 })
    expect(received).toBe(42)
  })

  it('unsubscribes from events', () => {
    const emitter = createEmitter<{ test: { value: number } }>()
    let count = 0

    const unsubscribe = emitter.on('test', () => {
      count++
    })

    emitter.emit('test', { value: 1 })
    expect(count).toBe(1)

    unsubscribe()
    emitter.emit('test', { value: 2 })
    expect(count).toBe(1)
  })
})
