<template>
	<UPageCard
		:title="photo.title"
		:description="photo.description"
		:to="photo.path"
		variant="outline"
	>
		<NuxtImg
			v-if="photo.images?.[0]"
			:src="photo.images[0].src"
			:alt="photo.images[0].alt"
			:width="photo.images[0].width"
			:height="photo.images[0].height"
			:sizes="photo.images[0].sizes"
			:densities="photo.images[0].densities"
			loading="lazy"
			class="w-full h-auto object-cover"
		/>
	</UPageCard>
</template>

<script setup lang="ts">
import type { PhotographyCollectionItem } from '@nuxt/content';

defineProps<{
	photo: PhotographyCollectionItem;
}>();
</script>
