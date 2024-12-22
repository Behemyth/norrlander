import type { Config } from 'tailwindcss';

export default {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100ch', // Boost the max prose width. Not a fan of console sized line width
					},
				},
			},
		},
	},
} satisfies Config;
