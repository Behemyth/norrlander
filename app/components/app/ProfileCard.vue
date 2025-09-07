<template>
	<UPageCard
		title="Asher Norland"
		description="Graphics Engineer"
		:variant="variant"
		:orientation="orientation"
	>
		<template #leading>
			<NuxtImg
				src="/gravatar/293a56bef971ab4999d6230491957d33"
				alt="Asher Norland"
				width="64"
				height="64"
				class="rounded-full shadow-lg"
			/>
		</template>

		<template #footer>
			<UPageFeature
				v-if="location"
				icon="i-mdi-map-marker"
				title="Location"
				:description="location.location"
			/>
			<UPageFeature
				icon="i-mdi-translate"
				title="Languages"
				description="English"
			/>
		</template>
	</UPageCard>
</template>

<script setup lang="ts">
interface Props {
	orientation: 'horizontal' | 'vertical';
	variant?: 'ghost' | 'solid' | 'outline' | 'soft' | 'subtle' | 'naked';
}

const { orientation } = defineProps<Props>();

const { data: location } = await useCurrentLocationData();
</script>
