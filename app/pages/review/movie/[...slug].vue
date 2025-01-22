<template>
	<UContainer>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
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
				:prose="true"
			/>
		</article>
		<ReviewFooter />
	</UContainer>
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
		label: 'Home',
		to: '/',
	},
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
