<template>
	<UPageCard
		:title="career.title"
		:description="career.position"
		:to="career.path"
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
					v-for="achievement in career.achievements"
					:key="achievement"
					icon="i-mdi-check-circle-outline"
					:description="achievement"
					:ui="{ leadingIcon: 'text-green-500' }"
				/>

				<UPageFeature
					v-if="career.location"
					icon="i-mdi-map-marker"
					:description="career.location"
				/>
				<UPageFeature
					v-if="career.tags && career.tags.length"
					icon="i-mdi-code"
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
		</UTheme>
	</UPageCard>
</template>

<script setup lang="ts">
import type { CareerCollectionItem } from '@nuxt/content';

interface Props {
	job: CareerCollectionItem;
}
const { job: career } = defineProps<Props>();
</script>
