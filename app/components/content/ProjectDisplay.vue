<template>
	<UCarousel
		v-slot="{ item: project }"
		:items="projects ?? []"
		arrows
		dots
		:ui="{
			item: 'basis-full sm:basis-1/2 lg:basis-1/3',
			controls: 'flex items-center justify-center gap-2 mt-4',
			arrows: 'contents',
			prev: 'static translate-y-0',
			next: 'static translate-y-0 order-last',
			dots: 'static flex items-center gap-3',
		}"
	>
		<ProjectCard :project="project" />
	</UCarousel>
</template>

<script setup lang="ts">
const { data: projects } = await useLatestProjects();
</script>
