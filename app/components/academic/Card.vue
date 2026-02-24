<template>
	<UPageCard
		:title="academic.title"
		:description="academic.degree"
		:to="academic.path"
		variant="ghost"
	>
		<UTheme
			:ui="{
				pageFeature: {
					root: 'flex items-center gap-2.5',
					description: 'text-sm',
				},
			}"
		>
			<UPageList>
				<UPageFeature
					icon="i-mdi-map-marker"
					:description="academic.location"
				/>
			</UPageList>
		</UTheme>
	</UPageCard>
</template>

<script setup lang="ts">
import type { AcademicCollectionItem } from '@nuxt/content';

interface Props {
	academic: AcademicCollectionItem;
}

const { academic } = defineProps<Props>();
</script>
