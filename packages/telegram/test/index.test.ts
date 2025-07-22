import { expect, test } from 'bun:test'
import { greet } from '../src'

test('triggerskit package should greet correctly', () => {
  expect(greet('World')).toBe('Hello, World!')
})
