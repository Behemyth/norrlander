<template>
	<UPageCard
		:title="photo.title"
		:description="photo.description"
		:to="photo.path"
		variant="ghost"
	/>
</template>

<script setup lang="ts">
import type { PhotographyCollectionItem } from '@nuxt/content';

defineProps<{
	photo: PhotographyCollectionItem;
}>();
</script>
