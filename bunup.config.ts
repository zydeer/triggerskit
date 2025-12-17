import { defineWorkspace } from 'bunup'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
      config: {
        entry: ['src/types.ts', 'src/utils.ts'],
      },
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
    exports: true,
    unused: true,
  },
)
