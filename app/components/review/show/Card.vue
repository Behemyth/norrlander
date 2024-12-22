<template>
	<ReviewCard
		v-if="tmdbData"
		:title="tmdbData.name"
		:path="show.path"
		:rating="show.rating"
		:description="show.description"
		:poster-path="`tmdb/${tmdbData.poster_path}`"
	/>
</template>

<script setup lang="ts">
import type { ShowCollectionItem } from '@nuxt/content';

const props = defineProps({
	show: {
		type: Object as PropType<ShowCollectionItem>,
		required: true,
	},
});

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${props.show.TMDB_ID}`);
</script>
