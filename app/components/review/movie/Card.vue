<template>
	<ReviewCard
		v-if="tmdbData"
		:title="tmdbData.title"
		:path="movie.path"
		:rating="movie.rating"
		:description="movie.description"
		:poster-path="`tmdb/${tmdbData.poster_path}`"
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

const { data: tmdbData } = await useFetch<TMDBMovie>(`/api/tmdb/media/movie/${props.movie.TMDB_ID}`);
</script>
