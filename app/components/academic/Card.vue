<template>
	<UPageCard
		:title="academic.title"
		:description="academic.description"
		:to="academic.path"
		variant="ghost"
	>
		<UPageList>
			<UPageFeature
				icon="i-heroicons-map-pin"
				:description="academic.location"
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
