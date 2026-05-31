<template>
	<BaseContentCard
		:title="post.title"
		:description="post.description"
		:to="post.path"
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
