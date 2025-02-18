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
		<div
			v-for="index in skeletonCount"
			:key="index"
			class="w-full h-full bg-(--ui-bg-elevated)"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection: 'movie' | 'show';
	count: number;
}>();

const items = await queryCollection(props.collection)
	.where('publish', '=', true)
	.order('date_published', 'DESC')
	.limit(props.count)
	.all();

const skeletonCount = computed(() => props.count - items.length);
</script>
