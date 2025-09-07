<template>
	<UPageList>
		<template
			v-for="item in items"
			:key="item.path"
		>
			<CareerCard
				v-if="isCareerItem(item)"
				:job="item"
			/>
			<AcademicCard
				v-else-if="isAcademicItem(item)"
				:academic="item"
			/>
		</template>
	</UPageList>
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

// Type guard to determine item type
function isCareerItem(item: CareerCollectionItem | AcademicCollectionItem): item is CareerCollectionItem {
	return 'position' in item;
}

function isAcademicItem(item: CareerCollectionItem | AcademicCollectionItem): item is AcademicCollectionItem {
	return !('position' in item);
}
</script>
