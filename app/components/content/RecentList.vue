<template>
	<div class="not-prose grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2">
		<ReviewPreview
			v-for="review in props.data"
			:key="review.title"
			:path="review._path"
			:rating="review.rating"
			:description="review.description"
			:tmdb-i-d="review.TMDB_ID"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	size: {
		type: Number,
		required: true,
	},
	data: {
		type: Object as PropType<MovieCollectionItem[]>,
		required: true,
	},
});
</script>
