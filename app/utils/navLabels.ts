/**
 * Maps the raw (English) navigation labels produced by @nuxt/content navigation
 * to their i18n translation keys. Shared by the header nav and breadcrumb builder
 * so the two can't drift apart.
 */
export const navLabelKeys: Record<string, string> = {
	'Blog': 'nav.blog',
	'Photography': 'nav.photography',
	'Portfolio': 'nav.portfolio',
	'Reviews': 'nav.reviews',
	'Movie Reviews': 'nav.movieReviews',
	'Show Reviews': 'nav.showReviews',
};

/**
 * Translate a raw navigation label via {@link navLabelKeys}, falling back to the
 * original label when no mapping exists.
 */
export const translateNavLabel = (label: string, t: (key: string) => string): string =>
	navLabelKeys[label] ? t(navLabelKeys[label]!) : label;
