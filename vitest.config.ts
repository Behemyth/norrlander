import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/**/*.test.ts'],
		exclude: ['tests/**/*.e2e.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['server/**/*.ts'],
			exclude: ['tests/**', '**/node_modules/**'],
		},
	},
});
