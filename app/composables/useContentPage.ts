import type { CollectionNames } from '@@/content.config';

interface ContentPageOptions {
	/** Filter out drafts (default: true for non-content collections) */
	filterDrafts?: boolean;
}

/**
 * Composable for fetching content pages.
 * Handles useAsyncData with route-based caching.
 *
 * @param collection - The content collection to query
 * @param options - Optional configuration
 * @returns The page data ref
 *
 * @example
 * const { page } = await useContentPage('blog');
 * useSeoMeta(page.value?.seo || {});
 */
export const useContentPage = async <T extends CollectionNames>(
	collection: T,
	options: ContentPageOptions = {},
) => {
	const route = useRoute();
	const { filterDrafts = collection !== 'content' } = options;

	const { data: page } = await useAsyncData(route.path, () => {
		let query = queryCollection(collection).path(route.path);
		if (filterDrafts) {
			query = query.where('draft', '=', false);
		}
		return query.first();
	});

	return { page };
};
