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
        entry: ['src/index.ts', 'src/storage/index.ts', 'src/frameworks/*'],
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
    {
      name: 'slack',
      root: 'packages/slack',
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
