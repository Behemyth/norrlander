<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>

		<ProseH2>
			What Makes a Movie 'Good'?
		</ProseH2>

		<ContentRenderer
			:value="goodPage"
			:prose="true"
		/>

		<ProseH2>
			My Review Process
		</ProseH2>

		<ContentRenderer
			:value="processPage"
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

const goodPage = await queryCollection('page').where('title', '=', 'Good').first();
const processPage = await queryCollection('page').where('title', '=', 'Process').first();

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
