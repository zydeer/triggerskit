import { defineWorkspace } from 'bunup'
import { exports, unused } from 'bunup/plugins'

export default defineWorkspace(
  [
    {
      name: 'triggerskit',
      root: 'packages/triggerskit',
    },
    {
      name: 'telegram',
      root: 'packages/telegram',
    },
  ],
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    plugins: [exports(), unused()],
  },
)
