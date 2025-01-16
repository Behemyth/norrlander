<template>
	<div>
		<UBreadcrumb :items="items" />
		<ReviewHeader
			:title="page.tmdbData.name"
			:backdrop="page.tmdbData.backdrop_path"
			:rating="page.rating"
			:release-date="new Date(page.tmdbData.first_air_date!)"
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

definePageMeta({
	layout: 'show-review',
});

useSeoMeta({
	title: page.tmdbData.name,
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
		label: page.tmdbData.name,
		to: route.path,
	},
]);
</script>
