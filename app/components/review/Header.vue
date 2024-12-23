<template>
	<h1 class="prose text-3xl font-bold">
		{{ title }}
	</h1>
	<ReviewStarRating
		:value="rating"
		:size="24"
	/>
	<NuxtPicture
		:src="`tmdb/${backdrop}`"
		:alt="title"
		class="w-full h-64 object-cover"
	/>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	backdrop: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
});
</script>
