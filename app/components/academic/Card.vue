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
