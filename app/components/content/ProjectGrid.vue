<template>
	<UPageGrid>
		<ProjectCard
			v-for="project in projects"
			:key="project.path"
			:project="project"
		/>
	</UPageGrid>
</template>

<script setup lang="ts">
async function getProjectsFromCollection() {
	return queryCollection('project')
		.where('published', '=', true)
		.all();
}

const projects = await getProjectsFromCollection();
</script>
