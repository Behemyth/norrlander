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

	ui: {
		theme: {
			colors: ['primary', 'secondary'],
		},
		experimental: {
			componentDetection: true,
		},
	},

	runtimeConfig: {
		apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
		public: {
			apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
		},
	},

	routeRules: {
		'/': { appLayout: 'default', prerender: true },
		'/contact': { appLayout: 'default', prerender: true },
		'/**': { appLayout: 'content', prerender: true },
	},

	future: {
		compatibilityVersion: 4,
	},

	experimental: {
		payloadExtraction: 'client',
		normalizeComponentNames: true,
		viewTransition: true,
	},

	compatibilityDate: '2025-04-28',

	nitro: {
		// static: true, // Not set, to support 'dev' server. Default is `static: true` for 'start' and 'generate' commands
		prerender: {
			crawlLinks: true,
			autoSubfolderIndex: false, // Prevents a 404 with trailing slashes catch-alls for nuxt/content
			concurrency: 4,
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
		// AVIF first (broad support, ~20–40% smaller than WebP on photo content); WebP fallback.
		format: ['avif', 'webp'],
		densities: [1, 2],
		domains: ['image.tmdb.org'],
		alias: {
			tmdb: 'https://image.tmdb.org/t/p/original',
		},
		// Workaround for nuxt/image#1433: bare "100vw" produces 1w/2w srcsets.
		// This preset expands to all screen breakpoints until the upstream fix lands.
		presets: {
			fullscreen: {
				sizes: 'sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw',
			},
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
