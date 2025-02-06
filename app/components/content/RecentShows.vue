<template>
	<ReviewShowCardGrid
		:shows="shows"
	/>
</template>

<script lang="ts">
export interface RecentShowsProps {
	count?: number;
}
</script>

<script setup lang="ts">
const props = defineProps<RecentShowsProps>();

let showQuery = queryCollection('show')
	.order('date_published', 'DESC');

if (props.count) {
	showQuery = showQuery.limit(props.count);
}

const shows = await showQuery.all();
</script>
