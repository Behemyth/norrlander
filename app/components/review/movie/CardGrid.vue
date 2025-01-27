<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewMovieCard
			v-for="movie in movies"
			:key="movie.id"
			:movie="movie"
		/>
	</div>
</template>

<script lang="ts">
import type { MovieCollectionItem } from '@nuxt/content';

export interface MovieCardGridProps {
	movies: MovieCollectionItem[];
}
</script>

<script setup lang="ts">
defineProps<MovieCardGridProps>();
</script>
