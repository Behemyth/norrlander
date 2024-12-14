// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

	modules: [
		'@nuxt/content',
		'@nuxt/devtools',
		// '@nuxtjs/sitemap', Enable when it works with Nuxt content 3
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/ui',
		'@nuxt/eslint',
	],
	ssr: true,

	devtools: {
		enabled: true,
	},

	// site: {
	// 	url: 'https://ashernorland.com',
	// },

	// https://color-mode.nuxtjs.org
	colorMode: {
	},

	// https://content.nuxtjs.org
	content: {
		build: {
			markdown: {
				toc: {
					depth: 3,
					searchDepth: 3,
				},
				highlight: {
					// See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
					theme: {
						dark: 'github-dark',
						default: 'github-light',
					},
				},
			},
			pathMeta: {

			},
		},
	},

	// https://ui.nuxt.com/getting-started/theming
	ui: {
	},

	runtimeConfig: {
		apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
		public: {
			apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
		},
	},

	future: {
		compatibilityVersion: 4,
	},

	experimental: {
		renderJsonPayloads: true,
	},

	compatibilityDate: '2024-11-04',

	nitro: {
		// static: true, // Not set, to support 'dev' server. Default is `static: true` for 'start' and 'generate' commands
		prerender: {
			crawlLinks: true,
			interval: 50, // To avoid rate limiting of the TMDB API
			routes: ['/'],
		},
	},

	typescript: {
		strict: true,
	},

	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},

	i18n: {
		locales: [
			{
				code: 'en',
				language: 'en-US',
				name: 'English',
				file: 'en.json',
			},
			{
				code: 'pl',
				language: 'pl-PL',
				name: 'Polski',
				file: 'pl.json',
			},
		],
		lazy: true,
		strategy: 'no_prefix',
		defaultLocale: 'en',
		vueI18n: './i18n/i18n.config.ts',
	},
	// https://image.nuxt.com/
	image: {
		format: ['webp'],
		domains: ['www.gravatar.com', 'image.tmdb.org'],
		alias: {
			tmdb: 'https://image.tmdb.org/t/p/original',
		},
		dir: 'public',
	},
});
