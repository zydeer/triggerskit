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

console.log('Test server is running on http://localhost:4000')
