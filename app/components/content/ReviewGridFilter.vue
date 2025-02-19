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
	collection: 'movie' | 'show';
}>();

const items = await queryCollection(props.collection)
	.where('published', '=', true)
	.order('date_published', 'DESC')
	.all();
</script>
