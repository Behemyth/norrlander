<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewCard
			v-for="review in items"
			:key="review.id"
			:title="review.title"
			:path="review.path"
			:rating="review.rating"
			:poster-path="`tmdb${review.tmdbData.poster_path}`"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection?: 'movie' | 'show';
	count: number;
}>();

async function getReviewsFromCollection(collection: 'movie' | 'show') {
	return queryCollection(collection)
		.where('published', '=', true)
		.order('date_published', 'DESC')
		.limit(props.count)
		.all();
}

async function getAllReviews() {
	const [movies, shows] = await Promise.all([
		queryCollection('movie').where('published', '=', true).all(),
		queryCollection('show').where('published', '=', true).all(),
	]);

	return [...movies, ...shows]
		.sort((a, b) => new Date(b.date_published).getTime() - new Date(a.date_published).getTime())
		.slice(0, props.count);
}

const items = props.collection
	? await getReviewsFromCollection(props.collection)
	: await getAllReviews();
</script>
