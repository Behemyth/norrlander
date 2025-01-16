<template>
	<div class="prose">
		<UBreadcrumb :items="items" />
		<ReviewHeader
			:title="page.tmdbData.title"
			:backdrop="page.tmdbData.backdrop_path"
			:rating="page.rating"
			:release-date="new Date(page.tmdbData.release_date!)"
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

definePageMeta({
	layout: 'movie-review',
});

useSeoMeta({
	title: page.tmdbData.title,
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
		label: page.tmdbData.title,
		to: route.path,
	},
]);
</script>
