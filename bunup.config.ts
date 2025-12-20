import { defineWorkspace } from 'bunup'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
    },
    {
      name: 'triggerskit',
      root: 'packages/triggerskit',
      config: {
        entry: ['src/index.ts', 'src/storage/index.ts'],
      },
    },
    {
      name: 'telegram',
      root: 'packages/telegram',
    },
    {
      name: 'github',
      root: 'packages/github',
    },
  ],
  {
    exports: true,
    unused: true,
    splitting: false,
    dts: {
      inferTypes: true,
      tsgo: true,
    },
  },
)
