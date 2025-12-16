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
    },
    {
      name: 'telegram',
      root: 'packages/telegram',
    },
  ],
  {
    exports: true,
    unused: true,
    dts: {
      inferTypes: true,
      splitting: false,
      tsgo: true,
    },
  },
)
