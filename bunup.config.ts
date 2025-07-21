import { defineWorkspace } from 'bunup'

export default defineWorkspace([
	{
		name: 'triggerskit',
		root: 'packages/triggerskit',
		config: {
			entry: ['src/index.ts'],
			format: ['esm', 'cjs'],
		},
	},
])
