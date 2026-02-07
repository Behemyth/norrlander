<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewCard
			v-for="review in items"
			:key="review.id"
			:title="review.title"
			:path="review.path"
			:rating="Number(review.rating)"
			:poster-path="getReviewPosterPath(review)"
			:season-number="'season_number' in review ? review.season_number : undefined"
		/>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';

const props = defineProps<{
	collection?: 'movie' | 'show';
	count: number;
}>();

/**
 * Get the poster path for a review, using season poster if available
 */
function getReviewPosterPath(review: MovieCollectionItem | ShowCollectionItem): string {
	// For show reviews with season data, use the season poster
	if ('seasonTmdbData' in review && review.seasonTmdbData?.poster_path) {
		return `tmdb${review.seasonTmdbData.poster_path}`;
	}
	return `tmdb${review.tmdbData.poster_path}`;
}

const cacheKey = props.collection ? `review-grid-${props.collection}` : 'review-grid-all';

const { data: items } = await useAsyncData(cacheKey, async () => {
	if (props.collection) {
		return queryCollection(props.collection)
			.where('draft', '=', false)
			.order('date_published', 'DESC')
			.limit(props.count)
			.all();
	}

	const [movies, shows] = await Promise.all([
		queryCollection('movie').where('draft', '=', false).order('date_published', 'DESC').limit(props.count).all(),
		queryCollection('show').where('draft', '=', false).order('date_published', 'DESC').limit(props.count).all(),
	]);

	return [...movies, ...shows]
		.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
		.slice(0, props.count);
});
</script>
