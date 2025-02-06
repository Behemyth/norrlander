<template>
	<ReviewMovieCardGrid
		:movies="movies"
	/>
</template>

<script lang="ts">
export interface RecentMovieProps {
	count?: number;
}
</script>

<script setup lang="ts">
const props = defineProps<RecentMovieProps>();

let movieQuery = queryCollection('movie')
	.order('date_published', 'DESC');

if (props.count) {
	movieQuery = movieQuery.limit(props.count);
}

const movies = await movieQuery.all();
</script>
