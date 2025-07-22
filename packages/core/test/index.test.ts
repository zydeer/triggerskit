import { expect, test } from 'bun:test'
import { telegram } from '../src'

test('telegram package should greet correctly', () => {
  expect(telegram()).toBe('telegram')
})
