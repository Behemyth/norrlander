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
					trailing-icon="i-heroicons-arrow-top-right-on-square"
				>
					View Company
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
					trailing-icon="i-heroicons-arrow-top-right-on-square"
				>
					View Institution
				</UButton>
			</div>
		</template>
	</UTimeline>
</template>

<script setup lang="ts">
import type { CareerCollectionItem, AcademicCollectionItem } from '@nuxt/content';

async function getCareersFromCollection() {
	return queryCollection('career')
		.order('start_date', 'DESC')
		.all();
}

async function getAcademicsFromCollection() {
	return queryCollection('academic')
		.order('start_date', 'DESC')
		.all();
}

async function getAllPortfolioItems() {
	const [careers, academics] = await Promise.all([
		getCareersFromCollection(),
		getAcademicsFromCollection(),
	]);

	return [...careers, ...academics]
		.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
}

const items = await getAllPortfolioItems();

// Transform items into timeline format
const timelineItems = computed(() => {
	return items.map(item => ({
		data: item,
		date: item.end_date
			? `${new Date(item.start_date).getFullYear()} - ${new Date(item.end_date).getFullYear()}`
			: `${new Date(item.start_date).getFullYear()} - Present`,
		icon: isAcademicItem(item) ? 'i-mdi-school' : 'i-mdi-work',
	}));
});

// Type guard to determine item type
function isCareerItem(item: CareerCollectionItem | AcademicCollectionItem): item is CareerCollectionItem {
	return 'position' in item;
}

function isAcademicItem(item: CareerCollectionItem | AcademicCollectionItem): item is AcademicCollectionItem {
	return !('position' in item);
}
</script>
