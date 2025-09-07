<template>
	<UCard
		title="Asher Norland"
		description="Graphics Engineer"
		:variant="props.variant as any"
	>
		<UUser
			name="Asher Norland"
			description="Graphics Engineer"
			size="3xl"
			:avatar="{
				src: '/gravatar/293a56bef971ab4999d6230491957d33',
			}"
			to="/contact"
			:orientation="orientation"
		/>
		<template
			v-if="props.footer"
			#footer
		>
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
	</UCard>
</template>

<script setup lang="ts">
interface Props {
	orientation: 'horizontal' | 'vertical';
	variant?: 'ghost' | 'solid' | 'outline' | 'soft' | 'subtle' | 'naked';
	footer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	footer: false,
});

const { data: location } = await useCurrentLocationData();
</script>
