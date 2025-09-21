import { useAsyncData, queryCollectionNavigation } from '#imports';
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';
import type { ContentNavigationItem } from '@nuxt/content';

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
	if (!navigation) return [{ label: 'Home', to: '/' }];

	const chain = findPageBreadcrumb(navigation, path, { current: true, indexAsChild: true });
	const items = mapContentNavigation(chain).map(({ icon, ...link }: any) => link);

	items.unshift({ label: 'Home', to: '/' });
	return items;
};
