// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	// nuxtjs/content should be loaded after 'nuxt/ui'
	// nuxtjs/sitemap and robots should be loaded before 'nuxt/content'
	modules: [
		'@nuxtjs/sitemap',
		'@nuxtjs/robots',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/eslint',
	],

	ssr: true,

	app: {
		rootAttrs: {
			class: 'min-h-svh flex flex-col',
		},
	},

	css: ['~/assets/css/main.css'],

	site: {
		url: 'https://norrlander.com',
		name: 'Norrlander',
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
		experimental: {
			sqliteConnector: 'native',
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

	compatibilityDate: '2025-04-28',

	nitro: {
		// static: true, // Not set, to support 'dev' server. Default is `static: true` for 'start' and 'generate' commands
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: false,
			interval: 50, // To avoid rate limiting of the TMDB API
			routes: ['/sitemap.xml', '/robots.txt'],
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
	},

	robots: {
		autoI18n: false,
	},
});
