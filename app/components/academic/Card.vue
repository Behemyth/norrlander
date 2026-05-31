<template>
	<BaseContentCard
		:title="academic.title"
		:description="academic.degree"
		:to="academic.path"
	>
		<UPageFeature
			icon="i-mdi-map-marker"
			:description="academic.location"
		/>
	</BaseContentCard>
</template>

<script setup lang="ts">
interface Props {
	academic: {
		title: string;
		degree: string;
		path: string;
		location?: string;
	};
}

const { academic } = defineProps<Props>();
</script>
