<template>
	<NuxtPicture
		:src="`tmdb/${poster}`"
		:alt="title"
		:img-attrs="{
			class: 'w-full size-medium',
		}"
		class="size-medium"
	/>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	poster: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	releaseDate: {
		type: Date,
		required: true,
	},
});
</script>
