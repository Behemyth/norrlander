// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

	modules: [
		'@nuxtjs/sitemap', // nuxtjs/sitemap should be loaded before 'nuxt/content'
		'@nuxt/content', // nuxtjs/content should be loaded after 'nuxt/ui' or 'deermice-ui'
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/eslint',
	],

	ssr: true,

	site: {
		url: 'https://ashernorland.com',
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
		},
	},
	// https://ui.nuxt.com/getting-started/theming
	ui: {
		theme: {
			colors: ['primary', 'secondary', 'neutral'],
		},
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

	compatibilityDate: '2025-01-21',

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
		strategy: 'no_prefix',
		defaultLocale: 'en',
		vueI18n: './i18n/i18n.config.ts',
	},

	icon: {
		clientBundle: {
			// scan all components in the project and include icons
			scan: true,
		},
		provider: 'iconify',
		serverBundle: 'local',
	},

	// https://image.nuxt.com/
	image: {
		provider: 'ipx',
		format: ['webp'],
		domains: ['www.gravatar.com', 'image.tmdb.org'],
		alias: {
			tmdb: 'https://image.tmdb.org/t/p/original',
			gravatar: 'https://www.gravatar.com/avatar',
		},
		dir: 'public/images',
	},
});
