<template>
	<div>
		<UBreadcrumb :items="items" />
	</div>
</template>

<script setup lang="ts">
const jobs = await queryCollection('career').all();

useSeoMeta({
	title: 'Career',
});

const items = ref([
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
	{
		label: 'Career',
		to: '/portfolio/career',
	},
]);
</script>
