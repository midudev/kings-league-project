import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		setupFiles: ['./global-setup/shared-mocks.js'],
		coverage: {
			all: true
		}
	}
})
