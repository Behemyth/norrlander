<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>

		<ContentRenderer
			:value="page"
			:prose="true"
		/>

		<ProseH2>
			Recent Movie Reviews
		</ProseH2>

		<ReviewMovieCardGrid :movies="movies" />

		<ProseH2>
			Recent Show Reviews
		</ProseH2>

		<ReviewShowCardGrid :shows="shows" />
	</div>
</template>

<script setup lang="ts">
const movies = await queryCollection('movie')
	.order('date_published', 'DESC').limit(6).all();

const shows = await queryCollection('show')
	.order('date_published', 'DESC').limit(6).all();

const page = await queryCollection('page').where('title', '=', 'Review').first();

useSeoMeta({
	title: 'Reviews',
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
]);
</script>
