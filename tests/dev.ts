import { greet } from 'triggerskit'

Bun.serve({
	port: 4000,
	routes: {
		'/': {
			GET: () => {
				return new Response(greet('John'))
			},
		},
	},
})
