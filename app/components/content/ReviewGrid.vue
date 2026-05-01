<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewCard
			v-for="review in items"
			:key="review.id"
			:title="review.title"
			:path="review.path"
			:rating="Number(review.rating)"
			:poster-path="review.poster_path ?? ''"
			:season-number="getSeasonNumber(review)"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection?: 'movie' | 'show';
	count: number;
}>();

const { data: items } = await useLatestReviews(props.count, props.collection);

function getSeasonNumber(review: { season_number?: number } | Record<string, unknown>): number | undefined {
	const value = (review as { season_number?: unknown }).season_number;
	return typeof value === 'number' ? value : undefined;
}
</script>
