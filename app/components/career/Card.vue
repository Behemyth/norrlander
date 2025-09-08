<template>
	<UPageCard
		:title="career.title"
		:description="career.position"
		class="shadow-md hover:shadow-lg transition-shadow duration-300"
	>
		<UPageList>
			<p
				v-if="career.description"
				class="text-gray-700 dark:text-gray-300"
			>
				{{ career.description }}
			</p>

			<UPageFeature
				v-if="career.tags && career.tags.length"
				title="Technologies"
				icon="i-heroicons-code-bracket"
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

			<UPageFeature
				v-if="career.achievements && career.achievements.length"
				title="Key Achievements"
				icon="i-heroicons-trophy"
			>
				<template #description>
					<ul class="space-y-1">
						<li
							v-for="achievement in career.achievements"
							:key="achievement"
							class="flex items-start text-sm text-gray-600 dark:text-gray-400"
						>
							<UIcon
								name="i-heroicons-check-circle"
								class="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
							/>
							{{ achievement }}
						</li>
					</ul>
				</template>
			</UPageFeature>

			<UPageFeature
				v-if="career.location"
				title="Location"
				icon="i-heroicons-map-pin"
			>
				<template #description>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{{ career.location }}
					</span>
				</template>
			</UPageFeature>
		</UPageList>

		<template #footer>
			<div class="flex items-center justify-end">
				<UButton
					v-if="career.link"
					:to="career.link"
					target="_blank"
					color="primary"
					variant="ghost"
					size="xs"
					trailing-icon="i-heroicons-arrow-top-right-on-square"
				>
					View Company
				</UButton>
			</div>
		</template>
	</UPageCard>
</template>

<script setup lang="ts">
import type { CareerCollectionItem } from '@nuxt/content';

interface Props {
	job: CareerCollectionItem;
}
const { job: career } = defineProps<Props>();
</script>
