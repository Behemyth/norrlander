<template>
	<div>
		<UBreadcrumb :items="items" />
		<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
			<LazyReviewShowCard
				v-for="show in shows"
				:key="show.id"
				:show="show"
			/>
		</div>
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
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Shows',
		to: '/review/show',
	},
]);
</script>
