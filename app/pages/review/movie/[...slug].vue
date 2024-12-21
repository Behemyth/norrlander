<template>
	<ContentRenderer
		v-if="page"
		:value="page"
	/>
</template>

<script lang="ts" setup>
definePageMeta({
	layout: 'review',
});

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('movie').path(route.path).first();
});
</script>
