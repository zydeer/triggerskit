import { expect, test } from 'bun:test'
import { telegram } from '../src'

test('true should be true', () => {
  expect(telegram()).toBe('telegram')
})
