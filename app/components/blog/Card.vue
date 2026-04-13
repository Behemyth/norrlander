<template>
	<UPageCard
		:title="post.title"
		:description="post.description"
		:to="post.path"
		variant="ghost"
	/>
</template>

<script setup lang="ts">
defineProps<{
	post: {
		title: string;
		description: string;
		path: string;
	};
}>();
</script>
