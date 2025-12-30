import { defineWorkspace } from 'bunup'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
      config: {
        entry: 'src/*.ts',
      },
    },
    {
      name: 'triggerskit',
      root: 'packages/triggerskit',
      config: {
        entry: ['src/index.ts', 'src/storage/index.ts'],
      },
    },
    {
      name: 'github',
      root: 'packages/github',
    },
    {
      name: 'slack',
      root: 'packages/slack',
    },
    {
      name: 'telegram',
      root: 'packages/telegram',
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
