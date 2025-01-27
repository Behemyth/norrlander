<template>
	<div class="flex flex-row">
		<h1 class="text-3xl font-bold">
			{{ title }}
		</h1>
	</div>
	<div class="flex flex-row">
		<ReviewStarRating
			:value="rating"
			:size="24"
			class="mr-2"
		/>
		<p class="text-lg mx-2">
			{{ releaseDate.getFullYear() }}
		</p>
		<p class="text-lg mx-2">
			Genre
		</p>
		<p class="text-lg mx-2">
			Runtime
		</p>
	</div>
	<div class="flex flex-row">
		<p class="text-lg mr-2">
			Asher Norland
		</p>
		<p class="text-lg mx-2">
			{{ published.toDateString() }}
		</p>
		<p class="text-lg mx-2">
			Time to Read
		</p>
	</div>
	<NuxtPicture
		:src="`tmdb/${backdrop}`"
		:alt="title"
		:img-attrs="{
			class: 'w-full',
		}"
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
