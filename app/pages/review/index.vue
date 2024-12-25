<template>
	<div>
		<UBreadcrumb :items="items" />
		<h2 class="text-2xl font-bold">
			Recent Movie Reviews
		</h2>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<ReviewMovieCard
				v-for="movie in movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>
		<h2 class="text-2xl font-bold">
			Recent Show Reviews
		</h2>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<ReviewShowCard
				v-for="show in shows"
				:key="show.id"
				:show="show"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const movies = await queryCollection('movie')
	.order('date_published', 'DESC').limit(6).all();

const shows = await queryCollection('show')
	.order('date_published', 'DESC').limit(6).all();

useSeoMeta({
	title: 'Reviews',
});

const items = ref([
	{
		label: 'Reviews',
		to: '/review',
	},
]);
</script>
