import { describe, expect, it } from 'bun:test'
import { createEmitter } from '../src/events'

describe('EventEmitter', () => {
  it('emits and receives events', () => {
    const emitter = createEmitter<{ test: { value: number } }>()
    let received: number = null!

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
