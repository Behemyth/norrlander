<template>
	<div class="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
		<div class="my-auto">
			<h1 class="text-2xl">
				{{ title }}
			</h1>
		</div>
		<NuxtPicture
			:src="`tmdb/${poster}`"
			:alt="title"
			:img-attrs="{
				class: 'aspect-[2/3]',
			}"
			loading="lazy"
		/>
		<div class="my-auto">
			TODO Cast
		</div>
		<div class="my-auto">
			TODO Director/Screenplay
		</div>
	</div>
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
