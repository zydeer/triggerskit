import { defineWorkspace } from 'bunup'
import { exports, unused } from 'bunup/plugins'

export default defineWorkspace([
	{
		name: 'triggerskit',
		root: 'packages/triggerskit',
		config: {
			entry: ['src/index.ts'],
			format: ['esm', 'cjs'],
			plugins: [exports(), unused()],
		},
	},
])
