<template>
	<ContentRenderer
		:value="page"
	/>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('content').path(route.path).first();

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.title,
});
</script>
