<template>
	<UPageCard
		:title="project.title"
		:description="project.description"
		:to="project.path"
		variant="ghost"
	>
		<UTheme
			:ui="{
				pageFeature: {
					description: 'text-sm',
				},
			}"
		>
			<UPageList>
				<UPageFeature
					v-if="project.link"
					icon="i-mdi-link-variant"
					:description="project.link"
				/>
			</UPageList>
		</UTheme>
	</UPageCard>
</template>

<script setup lang="ts">
import type { ProjectCollectionItem } from '@nuxt/content';

interface Props {
	project: ProjectCollectionItem;
}

const { project } = defineProps<Props>();
</script>
