<template>
	<ReviewCard
		v-if="tmdbData"
		:title="tmdbData.name"
		:path="show.path"
		:rating="show.rating"
		:description="show.description"
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
import type { ShowCollectionItem } from '@nuxt/content';

const props = defineProps({
	show: {
		type: Object as PropType<ShowCollectionItem>,
		required: true,
	},
});

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${props.show.TMDB_ID}`);
</script>
