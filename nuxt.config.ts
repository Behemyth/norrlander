// https://nuxt.com/docs/api/nuxt-config
export default defineNuxtConfig({
	// nuxtjs/content should be loaded after 'nuxt/ui'
	// nuxtjs/sitemap and robots should be loaded before 'nuxt/content'
	modules: [
		'@nuxtjs/seo',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxt/eslint',
		'@nuxt/test-utils/module',
		'@nuxt/fonts',
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
			transformers: [
				'~/transformers/seo-draft',
			],
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

	runtimeConfig: {
		apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
		public: {
			apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
		},
	},

	routeRules: {
		'/': { appLayout: 'default' },
		'/contact': { appLayout: 'default' },
		'/**': { appLayout: 'content' },
	},

	future: {
		compatibilityVersion: 4,
	},

	experimental: {
		payloadExtraction: 'client',
		normalizeComponentNames: true,
	},

	compatibilityDate: '2025-04-28',

	nitro: {
		// static: true, // Not set, to support 'dev' server. Default is `static: true` for 'start' and 'generate' commands
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: false, // Prevents a 404 with trailing slashes catch-alls for nuxt/content
			interval: 50, // To avoid rate limiting of the TMDB API
			routes: [
				'/sitemap.xml',
				'/robots.txt',
				// Feed routes
				'/feed/blog.json',
				'/feed/blog.xml',
				'/feed/blog.atom',
				'/feed/photography.json',
				'/feed/photography.xml',
				'/feed/photography.atom',
				'/feed/review/movie.json',
				'/feed/review/movie.xml',
				'/feed/review/movie.atom',
				'/feed/review/show.json',
				'/feed/review/show.xml',
				'/feed/review/show.atom',
			],
		},
	},

	vite: {
		optimizeDeps: {
			include: [
				'@vue/devtools-core',
				'@vue/devtools-kit',
				'@unhead/schema-org/vue',
				'@giscus/vue',
			],
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
				code: 'de',
				language: 'de-DE',
				name: 'Deutsch',
				file: 'de.json',
			},
			{
				code: 'pl',
				language: 'pl-PL',
				name: 'Polski',
				file: 'pl.json',
			},
			{
				code: 'sv',
				language: 'sv-SE',
				name: 'Svenska',
				file: 'sv.json',
			},
		],
		strategy: 'no_prefix',
		defaultLocale: 'en',
		vueI18n: './i18n.config.ts',
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
		domains: ['image.tmdb.org'],
		alias: {
			tmdb: 'https://image.tmdb.org/t/p/original',
		},
	},

	// Disable og-image in test environment to avoid SSR warnings
	ogImage: {
		enabled: process.env.NODE_ENV !== 'test' && process.env.VITEST !== 'true',
		zeroRuntime: true,
	},

	robots: {
		autoI18n: false,
	},

	// Enable zeroRuntime since we don't have dynamic sitemap sources
	// This also silences the informational message during tests
	sitemap: {
		cacheMaxAgeSeconds: 3600,
	},
});
