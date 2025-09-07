<template>
	<UTimeline
		:items="timelineItems"
	>
		<template #description="{ item }">
			<CareerCard
				v-if="isCareerItem(item.data)"
				:job="item.data"
			/>
			<AcademicCard
				v-else-if="isAcademicItem(item.data)"
				:academic="item.data"
			/>
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
		// You can add other timeline properties here like:
		// label: item.title,
		// description: item.description,
		// icon: 'some-icon',
		// color: 'primary',
		// etc.
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
