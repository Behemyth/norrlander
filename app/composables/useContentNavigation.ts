import { useAsyncData, queryCollectionNavigation } from '#imports';
import type { ContentNavigationItem } from '@nuxt/content';

/**
 * Shared composable for site navigation backed by @nuxt/content navigation.
 */
export const useContentNavigation = () =>
	useAsyncData<ContentNavigationItem[]>(
		'content:navigation',
		() => queryCollectionNavigation('content'),
	);
