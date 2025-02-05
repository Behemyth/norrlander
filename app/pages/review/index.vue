<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>

		<ContentRenderer
			:value="page"
		/>

		<ProseH2 :id="recentMoviesID">
			{{ recentMoviesText }}
		</ProseH2>

		<ReviewMovieCardGrid :movies="movies" />

		<ProseH2 :id="recentShowsID">
			{{ recentShowsText }}
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

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: 'Reviews',
});

const items = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Reviews',
		to: '/review',
	},
];
</script>
