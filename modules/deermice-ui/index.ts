import { defineNuxtModule, createResolver, installModule, addImportsDir, addComponentsDir, addImports } from '@nuxt/kit';

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

		// Components
		addComponentsDir({
			path: resolve('./runtime/components'),
			pathPrefix: true,
			prefix: options.prefix,
			global: true,
		});

		// Prose Overrides
		addComponentsDir({
			path: resolve('./runtime/prose'),
			pathPrefix: false,
			global: true,
		});

		// Utilities
		addImports([
			{ name: 'mapContentNavigation', from: resolve('./runtime/utility') },
			{ name: 'mapContentBreadcrumbs', from: resolve('./runtime/utility') },
		]);

		// Composables
		addImportsDir(resolve('./runtime/composables'));
	},
});
