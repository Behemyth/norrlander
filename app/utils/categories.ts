/**
 * Canonical category metadata shared across the site.
 * Use these constants instead of hard-coding icons or paths so that a
 * change to one entry propagates everywhere.
 */
export const CATEGORIES = {
	blog: {
		icon: 'i-mdi-note-edit',
		path: '/blog',
		labelKey: 'index.kinds.blog',
	},
	photography: {
		icon: 'i-mdi-camera',
		path: '/photography',
		labelKey: 'index.kinds.photography',
	},
	project: {
		icon: 'i-mdi-briefcase',
		path: '/portfolio',
		labelKey: 'index.kinds.project',
	},
	review: {
		icon: 'i-mdi-star',
		path: '/review',
		labelKey: 'index.kinds.review',
	},
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
