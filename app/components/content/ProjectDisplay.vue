<template>
	<UCarousel
		v-slot="{ item: project }"
		:items="projects"
		arrows
		dots
		:ui="{ item: 'basis-1/2 lg:basis-1/3' }"
	>
		<ProjectCard :project="project" />
	</UCarousel>
</template>

<script setup lang="ts">
async function getProjectsFromCollection() {
	return queryCollection('project')
		.where('draft', '=', false)
		.all();
}

const projects = await getProjectsFromCollection();
</script>
