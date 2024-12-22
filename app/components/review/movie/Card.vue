<template>
	<ReviewCard
		v-if="tmdbData"
		:title="tmdbData.title"
		:path="movie.path"
		:rating="movie.rating"
		:description="movie.description"
		:poster-path="`tmdb/${tmdbData.poster_path}`"
	/>
	<div
		v-else
		class="flex items-center gap-4"
	>
		<USkeleton class="h-12 w-12 rounded-full" />

		<div class="grid gap-2">
			<USkeleton class="h-4 w-[250px]" />
			<USkeleton class="h-4 w-[200px]" />
		</div>
	</div>
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
