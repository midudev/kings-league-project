import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'c8',
			reporter: ['text', 'json', 'html'],
			all: true,
			include: ['api/*']
		}
	}
})
