<template>
	<ContentRenderer
		v-if="page"
		:value="page"
	/>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('content').path(route.path).first();
});

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.title,
});
</script>
