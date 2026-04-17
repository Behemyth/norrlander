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
interface Props {
	project: {
		title: string;
		description: string;
		path: string;
		link: string;
	};
}

const { project } = defineProps<Props>();
</script>
