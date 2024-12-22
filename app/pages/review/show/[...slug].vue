<template>
	<div>
		<ReviewHeader />
		<ContentRenderer
			v-if="page"
			:value="page"
		/>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'show-review',
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('show').path(route.path).first();
});

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${page.value?.TMDB_ID}`);

useSeoMeta({
	title: tmdbData.value?.name,
});
</script>
