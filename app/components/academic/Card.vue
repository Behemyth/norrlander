<template>
	<UPageCard
		:title="academic.title"
		:description="`${formatDateRange(academic.start_date, academic.end_date)}`"
		class="shadow-md hover:shadow-lg transition-shadow duration-300"
	>
		<div class="space-y-4">
			<p
				v-if="academic.description"
				class="text-gray-700 dark:text-gray-300"
			>
				{{ academic.description }}
			</p>

			<UPageFeature
				v-if="academic.location"
				title="Location"
				icon="i-heroicons-map-pin"
			>
				<template #description>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{{ academic.location }}
					</span>
				</template>
			</UPageFeature>

			<UPageFeature
				title="Duration"
				icon="i-heroicons-calendar-days"
			>
				<template #description>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{{ formatDateRange(academic.start_date, academic.end_date) }}
					</span>
				</template>
			</UPageFeature>
		</div>

		<template #footer>
			<div class="flex items-center justify-end">
				<UButton
					v-if="academic.link"
					:to="academic.link"
					target="_blank"
					color="primary"
					variant="ghost"
					size="xs"
					trailing-icon="i-heroicons-arrow-top-right-on-square"
				>
					View Institution
				</UButton>
			</div>
		</template>
	</UPageCard>
</template>

<script setup lang="ts">
import type { AcademicCollectionItem } from '@nuxt/content';

interface Props {
	academic: AcademicCollectionItem;
}

const { academic } = defineProps<Props>();

function formatDateRange(startDate: string | Date, endDate?: string | Date): string {
	const start = new Date(startDate).getFullYear();
	const end = endDate ? new Date(endDate).getFullYear() : 'Present';
	return `${start} - ${end}`;
}
</script>
