import type { ShowCollectionItem } from '@nuxt/content';

export interface SeasonLink {
	label: string;
	seasonNumber: number | null;
	path: string;
	isCurrent: boolean;
}

/**
 * Composable for fetching and linking related seasonal reviews of the same show.
 * Returns all reviews that share the same TMDB_ID, sorted by season_number.
 */
export async function useRelatedSeasons(content: ShowCollectionItem) {
	const route = useRoute();

	// Query all show reviews with the same TMDB_ID
	const { data: relatedReviews } = await useAsyncData(
		`related-seasons-${content.TMDB_ID}`,
		() => queryCollection('show')
			.where('TMDB_ID', '=', content.TMDB_ID)
			.where('draft', '=', false)
			.all(),
	);

	// Build season links sorted by season_number
	const seasonLinks = computed<SeasonLink[]>(() => {
		if (!relatedReviews.value || relatedReviews.value.length <= 1) {
			return [];
		}

		return relatedReviews.value
			.sort((a, b) => {
				// Non-seasonal reviews come first (null/undefined season_number)
				const aNum = a.season_number ?? -1;
				const bNum = b.season_number ?? -1;
				return aNum - bNum;
			})
			.map(review => ({
				label: review.season_number ? `S${review.season_number}` : 'Full Series',
				seasonNumber: review.season_number ?? null,
				path: review.path,
				isCurrent: review.path === route.path,
			}));
	});

	// Whether there are multiple seasons to show navigation
	const hasMultipleSeasons = computed(() => seasonLinks.value.length > 1);

	// Current season index for highlighting
	const currentSeasonIndex = computed(() =>
		seasonLinks.value.findIndex(s => s.isCurrent),
	);

	return {
		relatedReviews,
		seasonLinks,
		hasMultipleSeasons,
		currentSeasonIndex,
	};
}
