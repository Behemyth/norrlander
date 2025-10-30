<template>
	<UPageCard
		:title="career.title"
		:description="career.position"
		:to="career.path"
		variant="ghost"
	>
		<UPageList>
			<UPageFeature
				v-for="achievement in career.achievements"
				:key="achievement"
				icon="i-mdi-check-circle-outline"
				:description="achievement"
				:ui="{ root: 'flex items-center gap-2.5', leadingIcon: 'text-green-500', description: 'text-sm' }"
			/>

			<UPageFeature
				v-if="career.location"
				icon="i-mdi-map-marker"
				:description="career.location"
				:ui="{ root: 'flex items-center gap-2.5', description: 'text-sm' }"
			/>
			<UPageFeature
				v-if="career.tags && career.tags.length"
				icon="i-mdi-code"
				:ui="{ root: 'flex items-center gap-2.5' }"
			>
				<template #description>
					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="tech in career.tags"
							:key="tech"
							color="neutral"
							variant="soft"
							size="xs"
						>
							{{ tech }}
						</UBadge>
					</div>
				</template>
			</UPageFeature>
		</UPageList>
	</UPageCard>
</template>

<script setup lang="ts">
import type { CareerCollectionItem } from '@nuxt/content';

interface Props {
	job: CareerCollectionItem;
}
const { job: career } = defineProps<Props>();
</script>
