<template>
	<div class="prose">
		<UBreadcrumb :items="items" />
		<ReviewHeader
			:title="tmdbData!.title"
			:backdrop="tmdbData!.backdrop_path"
			:rating="page.rating"
			:release-date="new Date(tmdbData!.release_date!)"
			:published="new Date(page.date_published)"
		/>
		<article>
			<ContentRenderer
				:value="page"
			/>
		</article>
		<ReviewFooter />
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('movie').path(route.path).first();

const { data: tmdbData } = await useFetch<TMDBMovie>(`/api/tmdb/media/movie/${page.TMDB_ID}`);

definePageMeta({
	layout: 'movie-review',
});

useSeoMeta({
	title: tmdbData.value!.title,
});

const items = ref([
	{
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Movies',
		to: '/review/movie',
	},
	{
		label: tmdbData.value!.title,
		to: route.path,
	},
]);
</script>
