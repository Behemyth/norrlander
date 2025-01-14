<template>
	<div>
		<UBreadcrumb :items="items" />
	</div>
</template>

<script setup lang="ts">
useSeoMeta({
	title: 'Portfolio',
});

const items = ref([
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
]);
</script>
