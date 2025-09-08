<template>
	<UPageCard
		:title="project.title"
		:description="project.description"
		:to="project.path"
		variant="ghost"
	>
		<UPageList>
			<UPageFeature
				v-if="project.link"
				icon="i-heroicons-link"
				:description="project.link"
			/>
		</UPageList>
	</UPageCard>
</template>

<script setup lang="ts">
import type { ProjectCollectionItem } from '@nuxt/content';

interface Props {
	project: ProjectCollectionItem;
}

const { project } = defineProps<Props>();
</script>
