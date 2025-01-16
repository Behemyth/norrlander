<template>
	<ReviewCard
		:title="props.show.tmdbData.name"
		:path="show.path"
		:rating="show.rating"
		:description="show.description"
		:poster-path="`tmdb/${props.show.tmdbData.poster_path}`"
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
</script>
