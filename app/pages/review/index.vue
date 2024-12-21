<template>
	<div>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<ReviewPreview
				v-for="review in movies"
				:key="review.info.id"
				:title="review.tmdb.title"
				:path="`/review/${review.info.id}`"
				:rating="review.info.rating"
				:description="review.info.description"
				:poster-path="review.tmdb.poster_path"
			/>
		</div>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<ReviewPreview
				v-for="review in shows"
				:key="review.info.id"
				:title="review.tmdb.name"
				:path="`/review/${review.info.id}`"
				:rating="review.info.rating"
				:description="review.info.description"
				:poster-path="review.tmdb.poster_path"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const movieContent = await queryCollection('movie')
	.order('date_published', 'DESC').limit(6).all();

const movieMetadata = await useAsyncData('recent-movies', async () => {
	return await Promise.all(movieContent.map(async (movie) => {
		return $fetch<TMDBMovie>(`/api/tmdb/media/movie/${movie.TMDB_ID}`);
	}));
}).then((value) => {
	return value.data.value!;
});

const movies = movieContent.map((movie, index) => {
	return {
		info: movie,
		tmdb: movieMetadata[index]!,
	};
});

const showContent = await queryCollection('show')
	.order('date_published', 'DESC').limit(6).all();

const showMetadata = await useAsyncData('recent-shows', async () => {
	return await Promise.all(showContent.map(async (show) => {
		return $fetch<TMDBShow>(`/api/tmdb/media/tv/${show.TMDB_ID}`);
	}));
}).then((value) => {
	return value.data.value!;
});

const shows = showContent.map((show, index) => {
	return {
		info: show,
		tmdb: showMetadata[index]!,
	};
});
</script>
