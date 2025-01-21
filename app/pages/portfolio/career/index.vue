<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<LazyPortfolioCard
				v-for="job in jobs"
				:key="job.id"
				:title="job.title"
				:link="job.path"
				:website="job.link"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const jobs = await queryCollection('career').all();

useSeoMeta({
	title: 'Career',
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
	{
		label: 'Career',
		to: '/portfolio/career',
	},
]);
</script>
