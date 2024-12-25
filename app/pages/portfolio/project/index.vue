<template>
	<div>
		<UBreadcrumb :items="items" />
	</div>
</template>

<script setup lang="ts">
const projects = await queryCollection('project').all();

useSeoMeta({
	title: 'Projects',
});

const items = ref([
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
	{
		label: 'Projects',
		to: '/portfolio/project',
	},
]);
</script>
