<template>
	<div>
		<slot />
	</div>
</template>

<script setup lang="ts">
// const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

// definePageMeta({
// 	layout: 'default',
// });
// useSeoMeta({
// 	title: home.value?.title,
// 	description: home.value?.description,
// });

// const route = useRoute();
// const { data: page } = await useAsyncData(route.path, () => {
// 	return queryCollection('content').path(route.path).first();
// });
</script>
