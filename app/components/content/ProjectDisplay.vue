<template>
	<UCarousel
		v-slot="{ item: project }"
		:items="projects ?? []"
		arrows
		dots
		:ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3' }"
	>
		<ProjectCard :project="project" />
	</UCarousel>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('project-display', () =>
	queryCollection('project')
		.select('title', 'description', 'path', 'link')
		.where('draft', '=', false)
		.all(),
);
</script>
