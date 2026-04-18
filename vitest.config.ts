import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		mockReset: true,
		coverage: {
			enabled: true,
			provider: 'v8',
			include: ['src/**'],
			reporter: ['text', 'lcov'],
		},
	},
})
