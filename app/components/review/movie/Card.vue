<template>
	<ReviewCard
		:title="props.movie.tmdbData.title"
		:path="movie.path"
		:rating="movie.rating"
		:description="movie.description"
		:poster-path="`tmdb/${props.movie.tmdbData.poster_path}`"
	/>
</template>

<script setup lang="ts">
import type { MovieCollectionItem } from '@nuxt/content';

const props = defineProps({
	movie: {
		type: Object as PropType<MovieCollectionItem>,
		required: true,
	},
});
</script>
