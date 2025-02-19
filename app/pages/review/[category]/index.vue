<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewCard
			v-for="review in items"
			:key="review.id"
			:title="review.title"
			:path="review.path"
			:rating="review.rating"
			:poster-path="`tmdb${review.tmdbData.poster_path}`"
		/>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError('Invalid review category');
}
const category = computed(() => route.params.category as 'movie' | 'show');

const { data: items } = await useAsyncData(route.path, () => {
	return queryCollection(category.value)
		.where('publish', '=', true)
		.order('date_published', 'DESC')
		.all();
});

const capitalizedCategory = computed(() => {
	return category.value.charAt(0).toUpperCase() + category.value.slice(1);
});

const title = computed(() => `${capitalizedCategory.value} Reviews`);

useSeoMeta({
	title: title,
});
</script>
