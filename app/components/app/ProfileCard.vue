<template>
	<UCard :variant="variant">
		<UUser
			name="Asher Norland"
			description="Graphics Engineer"
			size="3xl"
			:avatar="{
				src: '/images/asher-face.jpg',
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
				:title="$t('profile.location')"
				:description="location.location"
			/>
			<UPageFeature
				icon="i-mdi-translate"
				:title="$t('profile.languages')"
				description="English"
			/>
		</template>
	</UCard>
</template>

<script setup lang="ts">
import type { CardProps } from '@nuxt/ui';

interface Props {
	orientation: 'horizontal' | 'vertical';
	footer?: boolean;
	variant?: CardProps['variant'];
}

const props = withDefaults(defineProps<Props>(), {
	footer: false,
});

const { data: location } = await useCurrentLocationData();
</script>
