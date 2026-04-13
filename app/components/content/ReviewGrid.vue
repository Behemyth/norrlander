<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewCard
			v-for="review in items"
			:key="review.id"
			:title="review.title"
			:path="review.path"
			:rating="Number(review.rating)"
			:poster-path="review.poster_path ?? ''"
			:season-number="'season_number' in review ? review.season_number : undefined"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection?: 'movie' | 'show';
	count: number;
}>();

const cacheKey = props.collection ? `review-grid-${props.collection}` : 'review-grid-all';

const movieQuery = (limit: number) =>
	queryCollection('movie')
		.select('id', 'title', 'path', 'rating', 'date_published', 'poster_path')
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.limit(limit);

const showQuery = (limit: number) =>
	queryCollection('show')
		.select('id', 'title', 'path', 'rating', 'date_published', 'poster_path', 'season_number')
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.limit(limit);

const { data: items } = await useAsyncData(cacheKey, async () => {
	if (props.collection === 'movie') {
		return movieQuery(props.count).all();
	}
	if (props.collection === 'show') {
		return showQuery(props.count).all();
	}
	const [movies, shows] = await Promise.all([
		movieQuery(props.count).all(),
		showQuery(props.count).all(),
	]);
	return [...movies, ...shows]
		.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
		.slice(0, props.count);
});
</script>
