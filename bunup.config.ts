import { defineWorkspace } from 'bunup'
import { unused } from 'bunup/plugins'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
    },
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
    plugins: [unused()],
  },
)
