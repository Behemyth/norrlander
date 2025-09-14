<template>
	<UPageCard
		:title="academic.title"
		:description="academic.degree"
		:to="academic.path"
		variant="ghost"
	>
		<UPageList>
			<UPageFeature
				icon="i-mdi-map-marker"
				:description="academic.location"
				:ui="{ description: 'text-sm' }"
			/>
		</UPageList>
	</UPageCard>
</template>

<script setup lang="ts">
import type { AcademicCollectionItem } from '@nuxt/content';

interface Props {
	academic: AcademicCollectionItem;
}

const { academic } = defineProps<Props>();
</script>
