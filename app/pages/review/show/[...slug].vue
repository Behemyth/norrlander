<template>
	<div class="prose">
		<UBreadcrumb :items="items" />
		<ReviewHeader
			:title="tmdbData!.name"
			:backdrop="tmdbData!.backdrop_path"
			:rating="page.rating"
			:release-date="new Date(tmdbData!.first_air_date!)"
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

const page = await queryCollection('show').path(route.path).first();

const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${page.TMDB_ID}`);

definePageMeta({
	layout: 'show-review',
});

useSeoMeta({
	title: tmdbData.value!.name,
});

const items = ref([
	{
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Shows',
		to: '/review/show',
	},
	{
		label: tmdbData.value!.name,
		to: route.path,
	},
]);
</script>
