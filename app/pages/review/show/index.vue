<template>
	<div>
		<UBreadcrumb :items="items" />
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
]);
</script>
