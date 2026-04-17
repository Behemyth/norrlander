<template>
	<UTimeline
		:items="timelineItems"
	>
		<template #description="{ item }">
			<div v-if="isCareerItem(item.data)">
				<CareerCard
					:job="item.data"
				/>
				<UButton
					v-if="item.data.link"
					:to="item.data.link"
					target="_blank"
					color="primary"
					variant="ghost"
					size="xs"
					trailing-icon="i-mdi-arrow-top-right-bold-box-outline"
				>
					{{ t('portfolio.viewCompany') }}
				</UButton>
			</div>
			<div v-else-if="isAcademicItem(item.data)">
				<AcademicCard
					:academic="item.data"
				/>
				<UButton
					v-if="item.data.link"
					:to="item.data.link"
					target="_blank"
					color="primary"
					variant="ghost"
					size="xs"
					trailing-icon="i-mdi-arrow-top-right-bold-box-outline"
				>
					{{ t('portfolio.viewInstitution') }}
				</UButton>
			</div>
		</template>
	</UTimeline>
</template>

<script setup lang="ts">
import type { CareerCollectionItem, AcademicCollectionItem } from '@nuxt/content';

const { t } = useI18n();

const { data: portfolioItems } = await useAsyncData('portfolio-timeline', async () => {
	const [careers, academics] = await Promise.all([
		queryCollection('career')
			.select('id', 'title', 'path', 'start_date', 'end_date', 'link', 'position', 'achievements', 'location', 'tags')
			.where('draft', '=', false)
			.order('start_date', 'DESC')
			.all(),
		queryCollection('academic')
			.select('id', 'title', 'path', 'start_date', 'end_date', 'link', 'degree', 'location')
			.where('draft', '=', false)
			.order('start_date', 'DESC')
			.all(),
	]);

	return [...careers, ...academics]
		.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
});

// Transform items into timeline format
const timelineItems = computed(() => (portfolioItems.value ?? []).map(item => ({
	data: item,
	date: item.end_date
		? `${new Date(item.start_date).getFullYear()} - ${new Date(item.end_date).getFullYear()}`
		: `${new Date(item.start_date).getFullYear()} - ${t('portfolio.present')}`,
	icon: isAcademicItem(item) ? 'i-mdi-school' : 'i-mdi-work',
})));

// Type guard to determine item type
function isCareerItem(item: CareerCollectionItem | AcademicCollectionItem): item is CareerCollectionItem {
	return 'position' in item;
}

function isAcademicItem(item: CareerCollectionItem | AcademicCollectionItem): item is AcademicCollectionItem {
	return !('position' in item);
}
</script>
