<template>
	<div>
		<UBreadcrumb :items="items" />
		<ProseH2 class="text-2xl font-bold">
			Recent Movie Reviews
		</ProseH2>
		<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			<ReviewMovieCard
				v-for="movie in movies"
				:key="movie.id"
				:movie="movie"
			/>
		</div>
		<ProseH2 class="text-2xl font-bold">
			Recent Show Reviews
		</ProseH2>
		<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
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
