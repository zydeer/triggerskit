import { expect, test } from 'bun:test'
import { greet } from '../src'

test('true should be true', () => {
  expect(greet('World')).toBe('Hello, World!')
})
