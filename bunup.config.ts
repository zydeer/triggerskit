import { defineWorkspace } from 'bunup'

export default defineWorkspace(
  [
    {
      name: 'core',
      root: 'packages/core',
      config: {
        entry: [
          'src/types/index.ts',
          'src/utils/index.ts',
          'src/oauth/index.ts',
          'src/provider/index.ts',
        ],
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
