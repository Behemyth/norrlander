<template>
	<UCarousel
		v-slot="{ item: project }"
		:items="projects ?? []"
		dots
		:ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3' }"
	>
		<ProjectCard :project="project" />
	</UCarousel>
</template>

<script setup lang="ts">
const { data: projects } = await useLatestProjects();
</script>
