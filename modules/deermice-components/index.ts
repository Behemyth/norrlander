import { defineNuxtModule, createResolver, installModule, addComponentsDir } from '@nuxt/kit';

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
		await installModule('@nuxt/ui'); // nuxtjs/ui should be loaded before 'nuxt/icon'
		await installModule('@nuxt/icon');
		await installModule('@nuxt/fonts');
		await installModule('@nuxtjs/color-mode', { classSuffix: '' });

		// Components
		await addComponentsDir({
			path: resolve('./runtime/components'),
			pathPrefix: true,
			prefix: options.prefix,
			global: true,
		});
	},
});
