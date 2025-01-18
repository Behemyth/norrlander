<template>
	<ContentRenderer
		v-if="page"
		:value="page"
	/>
</template>

<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
	return queryCollection('page').where('title', '=', 'About',
	).first();
});

useSeoMeta({
	title: 'About',
});
</script>
