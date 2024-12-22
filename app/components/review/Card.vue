<template>
	<ULink
		:to="path"
		:title="title"
		class="w-full h-32 flex items-center bg-white border border-gray-200 rounded-lg shadow md:h-48 lg:h-64 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
	>
		<NuxtPicture
			:src="posterPath"
			:placeholder="img(posterPath, { h: 10, blur: 2, q: 50 })"
			loading="lazy"
			:img-attrs="{ class: 'rounded-s-lg' }"
			class="aspect-[2/3] h-full"
		/>

		<div class="flex flex-col justify-between p-4 leading-normal">
			<h5 class="prose dark:prose-invert mb-2 font-bold tracking-tight text-gray-900 md:text-l lg:text-xl dark:text-white">{{ title
			}}</h5>
			<ReviewStarRating
				:value="rating"
				:size="16"
			/>
			<p class="prose dark:prose-invert mb-3 font-normal text-gray-700 dark:text-gray-400">
				{{ description }}
			</p>
		</div>

	</ULink>
</template>

<script setup lang="ts">
const img = useImage();

defineProps({
	title: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	posterPath: {
		type: String,
		required: true,
	},
});
</script>
