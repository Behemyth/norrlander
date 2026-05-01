<template>
	<div class="flex flex-wrap justify-center gap-3">
		<UButton
			v-for="stat in stats"
			:key="stat.label"
			color="neutral"
			variant="ghost"
			:icon="stat.icon"
			:label="`${stat.count} ${stat.label}`"
			:to="stat.to"
			size="lg"
		/>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();

const { data: counts } = await useAsyncData('index-stats', async () => {
	const [blog, photography, project, movie, show] = await Promise.all([
		queryCollection('blog').where('draft', '=', false).count(),
		queryCollection('photography').where('draft', '=', false).count(),
		queryCollection('project').where('draft', '=', false).count(),
		queryCollection('movie').where('draft', '=', false).count(),
		queryCollection('show').where('draft', '=', false).count(),
	]);
	return { blog, photography, project, reviews: movie + show };
});

const stats = computed(() => [
	{
		icon: CATEGORIES.review.icon,
		count: counts.value?.reviews ?? 0,
		label: t('index.stats.reviews'),
		to: CATEGORIES.review.path,
	},
	{
		icon: CATEGORIES.blog.icon,
		count: counts.value?.blog ?? 0,
		label: t('index.stats.blogPosts'),
		to: CATEGORIES.blog.path,
	},
	{
		icon: CATEGORIES.photography.icon,
		count: counts.value?.photography ?? 0,
		label: t('index.stats.photographySeries'),
		to: CATEGORIES.photography.path,
	},
	{
		icon: CATEGORIES.project.icon,
		count: counts.value?.project ?? 0,
		label: t('index.stats.projects'),
		to: CATEGORIES.project.path,
	},
]);
</script>
