<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
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
				:prose="true"
			/>
		</article>
		<ReviewFooter />
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Shows"
		/>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('show').path(route.path).first();

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.tmdbData.name,
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
		label: 'Shows',
		to: '/review/show',
	},
	{
		label: page.tmdbData.name,
		to: route.path,
	},
]);
</script>
