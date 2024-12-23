<template>
	<div class="prose">
		<ReviewHeader
			:title="tmdbData!.name"
			:backdrop="tmdbData!.backdrop_path"
			:rating="page.rating"
		/>
		<ContentRenderer
			:value="page"
		/>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('show').path(route.path).first();

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${page.TMDB_ID}`);

definePageMeta({
	layout: 'show-review',
});

useSeoMeta({
	title: tmdbData.value!.name,
});
</script>
