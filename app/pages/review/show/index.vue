<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
		<ReviewShowCardGrid :shows="shows" />
	</div>
</template>

<script setup lang="ts">
const shows = await queryCollection('show')
	.order('date_published', 'DESC').all();

useSeoMeta({
	title: 'Show Reviews',
});

const items = ref([
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Shows',
		to: '/review/show',
	},
]);
</script>
