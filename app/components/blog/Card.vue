<template>
	<UPageCard
		:title="post.title"
		:description="post.description"
		:to="post.path"
		variant="ghost"
	/>
</template>

<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content';

defineProps<{
	post: BlogCollectionItem;
}>();
</script>
