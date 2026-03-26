import { useAsyncData, queryCollectionNavigation, useI18n } from '#imports';
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';
import type { ContentNavigationItem } from '@nuxt/content';

const navLabelKeys: Record<string, string> = {
	'Blog': 'nav.blog',
	'Photography': 'nav.photography',
	'Portfolio': 'nav.portfolio',
	'Reviews': 'nav.reviews',
	'Movie Reviews': 'nav.movieReviews',
	'Show Reviews': 'nav.showReviews',
};

/**
 * Shared composable for site navigation backed by @nuxt/content navigation.
 */
export const useContentNavigation = () =>
	useAsyncData<ContentNavigationItem[]>(
		'content:navigation',
		() => queryCollectionNavigation('content'),
	);

/**
 * Generate breadcrumb items for the current route
 */
export const findBreadcrumb = (navigation: ContentNavigationItem[] | undefined, path: string) => {
	const { t } = useI18n();

	if (!navigation) return [{ label: t('nav.home'), to: '/' }];

	const chain = findPageBreadcrumb(navigation, path, { current: true, indexAsChild: true });
	const items = mapContentNavigation(chain).map(({ icon, ...link }: any) => ({
		...link,
		label: navLabelKeys[link.label] ? t(navLabelKeys[link.label]!) : link.label,
	}));

	items.unshift({ label: t('nav.home'), to: '/' });
	return items;
};
