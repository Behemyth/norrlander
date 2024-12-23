<template>
	<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
		<LazyReviewMovieCard
			v-for="movie in movies"
			:key="movie.id"
			:movie="movie"
		/>
	</div>
</template>

<script setup lang="ts">
const movies = await queryCollection('movie')
	.order('date_published', 'DESC').all();

useSeoMeta({
	title: 'Movie Reviews',
});
</script>
