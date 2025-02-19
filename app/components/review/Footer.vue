<template>
	<div class="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
		<div class="my-auto">
			<h1 class="text-2xl">
				{{ content.title }}
			</h1>
		</div>
		<NuxtPicture
			:src="`tmdb/${content.tmdbData.poster_path}`"
			:alt="content.title"
			:img-attrs="{
				class: 'aspect-[2/3]',
			}"
			loading="lazy"
		/>
		<div class="my-auto">
			Cast
		</div>
		<div class="my-auto">
			Director/Screenplay
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';

defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();
</script>
