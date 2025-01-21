<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
	</div>
</template>

<script setup lang="ts">
useSeoMeta({
	title: 'Portfolio',
});

const items = ref([
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
]);
</script>
