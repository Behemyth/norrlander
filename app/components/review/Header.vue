<template>
	<h1 class="prose text-3xl font-bold">
		{{ title }}
	</h1>
	<div class="flex flex-row">
		<ReviewStarRating
			:value="rating"
			:size="24"
		/>
		<p class="text-lg ml-2">
			{{ releaseDate.getFullYear() }}
		</p>
	</div>
	<div class="flex flex-row">
		<p class="text-lg">
			{{ published.toDateString() }}
		</p>
	</div>
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
	releaseDate: {
		type: Date,
		required: true,
	},
	published: {
		type: Date,
		required: true,
	},
});
</script>
