<template>
	<UPageCard
		:title="title"
		:description="description"
		:to="to"
		:variant="variant"
	>
		<UTheme
			v-if="!!$slots.default"
			:ui="{ pageFeature: featureUi }"
		>
			<UPageList>
				<slot />
			</UPageList>
		</UTheme>
	</UPageCard>
</template>

<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui';

/**
 * Collection-specific cards wrap this and supply their own feature rows.
 */
withDefaults(
	defineProps<{
		title: string;
		description?: string;
		to: string;
		variant?: PageCardProps['variant'];
		featureUi?: Record<string, string>;
	}>(),
	{
		variant: 'ghost',
		featureUi: () => ({ root: 'flex items-center gap-2.5', description: 'text-sm' }),
	},
);
</script>
