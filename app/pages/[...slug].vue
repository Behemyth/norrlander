<template>
	<ContentRenderer
		:value="page"
	/>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('content').path(route.path).first();

useSeoMeta({
	title: page.title,
});
</script>
