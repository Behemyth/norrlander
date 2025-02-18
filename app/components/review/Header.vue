<template>
	<div class="flex flex-col">
		<div class="flex flex-row">
			<h1 class="text-3xl font-bold">
				{{ content.title }}
			</h1>
		</div>
		<div class="flex flex-row">
			<ReviewStarRating
				:value="content.rating"
				:size="24"
				class="mr-2"
			/>
			<p class="text-lg mx-2">
				Release Year
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
				Published Date
			</p>
			<p class="text-lg mx-2">
				Time to Read
			</p>
		</div>
		<NuxtPicture
			:src="`tmdb/${content.tmdbData.backdrop_path}`"
			:alt="content.title"
			:img-attrs="{
				class: 'object-cover w-full aspect-[12/5]',
			}"
		/>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';

defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();
</script>
