import { defineNuxtModule, createResolver, installModule, addImportsDir, addComponentsDir } from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {
	prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'deermice-ui',
		configKey: 'deermice-ui',
	},
	// Default configuration options of the Nuxt module
	defaults: {
		prefix: 'D',
	},
	async setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url);

		nuxt.options.alias['#deermice'] = resolve('./runtime');

		// Modules
		await installModule('@nuxt/ui');
		await installModule('@nuxt/icon'); // nuxt/icon should be loaded after 'nuxt/ui'
		await installModule('@nuxt/fonts', { experimental: { processCSSVariables: true } });
		await installModule('@nuxtjs/color-mode', { classSuffix: '' });

		// Components
		addComponentsDir({
			path: resolve('./runtime/components'),
			pathPrefix: true,
			prefix: options.prefix,
			global: true,
		});

		// Composables
		addImportsDir(resolve('./runtime/composables'));
	},
});
