<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
		<ReviewMovieCardGrid :movies="movies" />
	</div>
</template>

<script setup lang="ts">
const movies = await queryCollection('movie')
	.order('date_published', 'DESC').all();

useSeoMeta({
	title: 'Movie Reviews',
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
]);
</script>
