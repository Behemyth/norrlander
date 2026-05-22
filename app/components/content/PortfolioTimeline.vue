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
const { t } = useI18n();

type CareerTimelineItem = {
	id: string;
	title: string;
	path: string;
	start_date: string | Date;
	end_date?: string | Date;
	link?: string;
	position: string;
	achievements?: string[];
	location?: string;
	tags?: string[];
};

type AcademicTimelineItem = {
	id: string;
	title: string;
	path: string;
	start_date: string | Date;
	end_date?: string | Date;
	link?: string;
	degree: string;
	location?: string;
};

type PortfolioTimelineItem = CareerTimelineItem | AcademicTimelineItem;

const { data: portfolioItems } = await useAsyncData('portfolio-timeline', async (): Promise<PortfolioTimelineItem[]> => {
	const [careers, academics] = await Promise.all([
		queryCollection('career')
			.select('id', 'title', 'path', 'start_date', 'end_date', 'link', 'position', 'achievements', 'location', 'tags')
			.order('start_date', 'DESC')
			.all(),
		queryCollection('academic')
			.select('id', 'title', 'path', 'start_date', 'end_date', 'link', 'degree', 'location')
			.order('start_date', 'DESC')
			.all(),
	]);

	const combined = [...careers, ...academics] as unknown as PortfolioTimelineItem[];
	return combined.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
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
function isCareerItem(item: PortfolioTimelineItem): item is CareerTimelineItem {
	return 'position' in item;
}

function isAcademicItem(item: PortfolioTimelineItem): item is AcademicTimelineItem {
	return !('position' in item);
}
</script>
