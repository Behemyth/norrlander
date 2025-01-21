<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<LazyPortfolioCard
				v-for="project in projects"
				:key="project.id"
				:title="project.title"
				:website="project.link"
				:link="project.path"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const projects = await queryCollection('project').all();

useSeoMeta({
	title: 'Projects',
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
		label: 'Projects',
		to: '/portfolio/project',
	},
]);
</script>
