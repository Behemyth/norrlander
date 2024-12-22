<template>
	<div>
		<ReviewHeader />
		<ContentRenderer
			:value="page"
		/>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('movie').path(route.path).first();

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${page.TMDB_ID}`);

definePageMeta({
	layout: 'show-review',
});

useSeoMeta({
	title: tmdbData.value!.name,
});
</script>
