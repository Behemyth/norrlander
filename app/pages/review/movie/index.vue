<template>
	<div>
		<UBreadcrumb :items="items" />
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<LazyReviewMovieCard
				v-for="movie in movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>
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
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Movies',
		to: '/review/movie',
	},
]);
</script>
