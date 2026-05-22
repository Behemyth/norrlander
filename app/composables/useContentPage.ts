import type { PageCollections } from '@nuxt/content';

interface ContentPageOptions<T extends keyof PageCollections> {
	/** Optional list of fields to `.select()` — reduces payload size for pages that don't need full TMDB/body data. */
	select?: Array<keyof PageCollections[T] & string>;
}

/**
 * Composable for fetching content pages.
 * Handles useAsyncData with collection-scoped route-based caching.
 *
 * @param collection - The content collection to query
 * @param options - Optional configuration
 * @returns The page data ref
 *
 * @example
 * const { page } = await useContentPage('blog');
 * useSeoMeta({ title: page.value?.title, description: page.value?.description });
 */
export const useContentPage = async <T extends keyof PageCollections>(
	collection: T,
	options: ContentPageOptions<T> = {},
): Promise<{ page: Ref<PageCollections[T] | null> }> => {
	const route = useRoute();
	const { select } = options;

	const { data: page } = await useAsyncData(`${collection}:${route.path}`, () => {
		let query = queryCollection(collection).path(route.path);
		if (select && select.length > 0) {
			query = (query as unknown as { select: (...fields: string[]) => typeof query }).select(...select);
		}
		return query.first();
	});

	return { page: page as Ref<PageCollections[T] | null> };
};
