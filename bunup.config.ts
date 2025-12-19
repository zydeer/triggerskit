import { defineWorkspace } from 'bunup'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
      config: {
        entry: ['src/types/index.ts', 'src/utils/index.ts'],
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
    splitting: false,
    dts: {
      inferTypes: true,
      tsgo: true,
    },
  },
)
