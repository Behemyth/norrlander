<template>
	<div>
		<UPageHero
			orientation="horizontal"
			title="Asher Norland"
			:headline="$t('index.heroHeadline')"
			:description="$t('index.heroDescription')"
			:links="heroLinks"
			:ui="{ container: 'flex flex-col lg:grid py-16 sm:py-24 lg:py-28 gap-16 sm:gap-y-24' }"
		>
			<NuxtImg
				src="/images/asher-breath.png"
				alt="Asher Norland"
				width="512"
				height="341"
				preload
				loading="eager"
				fetchpriority="high"
				placeholder
				sizes="sm:100vw md:512px"
				class="rounded-lg shadow-lg aspect-3/2"
			/>
		</UPageHero>
		<USeparator />
		<UPageSection
			icon="i-mdi-map"
			:title="$t('index.trailMarkers')"
			:description="$t('index.trailMarkersDescription')"
			:ui="{ container: 'flex flex-col lg:grid py-12 sm:py-16 lg:py-20 gap-8 sm:gap-16' }"
		>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<ContentCard
					v-for="card in trailCards"
					:key="card.to"
					:title="card.title"
					:description="card.description"
					:to="card.to"
					:icon="card.icon"
					:kind="card.kind"
					:date="card.date"
					:count="card.count"
					:image="card.image"
				/>
			</div>
		</UPageSection>
		<UPageSection
			:links="sectionLinks"
			:title="$t('index.about', { name: 'Asher Norland' })"
			:description="$t('index.aboutDescription')"
			class="bg-gray-50 dark:bg-gray-800/50"
			:ui="{ container: 'flex flex-col lg:grid py-12 sm:py-16 lg:py-20 gap-8 sm:gap-16' }"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';
import type { ContentCardProps } from '~/composables/useLatestContent';

const { t } = useI18n();

const heroLinks = computed<ButtonProps[]>(() => [
	{
		label: t('index.viewSource'),
		to: 'https://github.com/Behemyth/norrlander',
		target: '_blank',
		variant: 'outline',
		icon: 'i-mdi-github',
		size: 'lg',
	},
]);

const sectionLinks = computed<ButtonProps[]>(() => [
	{
		label: t('index.contactMe'),
		to: '/contact',
		icon: 'i-mdi-email',
		variant: 'outline',
		size: 'lg',
	},
]);

// --- Trail Markers: latest from each section ---

const [
	{ data: latestBlogData },
	{ data: latestPhotoData },
	{ data: latestProjectData },
	{ data: latestReviewData },
	{ data: counts },
] = await Promise.all([
	useLatestBlog(1),
	useLatestPhotography(1),
	useLatestProjects(1),
	useLatestReviews(1),
	useAsyncData('index-stats', async () => {
		const [blog, photography, project, movie, show] = await Promise.all([
			queryCollection('blog').where('draft', '=', false).count(),
			queryCollection('photography').where('draft', '=', false).count(),
			queryCollection('project').where('draft', '=', false).count(),
			queryCollection('movie').where('draft', '=', false).count(),
			queryCollection('show').where('draft', '=', false).count(),
		]);
		return { blog, photography, project, reviews: movie + show };
	}),
]);

const trailCards = computed<ContentCardProps[]>(() => {
	const sections = [
		{
			row: latestBlogData.value?.[0],
			...CATEGORIES.blog,
			count: counts.value?.blog ?? 0,
		},
		{
			row: latestPhotoData.value?.[0],
			...CATEGORIES.photography,
			count: counts.value?.photography ?? 0,
		},
		{
			row: latestProjectData.value?.[0],
			...CATEGORIES.project,
			count: counts.value?.project ?? 0,
		},
		{
			row: latestReviewData.value?.[0],
			...CATEGORIES.review,
			count: counts.value?.reviews ?? 0,
		},
	] as const;

	return sections.map(({ row, icon, labelKey, path: categoryPath, count }) => {
		const kind = t(labelKey);
		if (!row) {
			return {
				title: t('index.noContent', { kind }),
				to: categoryPath,
				icon,
				kind,
				count,
			};
		}
		return {
			title: row.title,
			description: 'description' in row ? row.description : undefined,
			to: row.path,
			icon,
			kind,
			date: 'date_published' in row ? row.date_published : undefined,
			count,
			image: 'poster_path' in row && row.poster_path
				? row.poster_path
				: 'images' in row && Array.isArray(row.images) && row.images[0]?.src
					? row.images[0].src
					: 'image' in row && typeof row.image === 'string'
						? row.image
						: undefined,
		};
	});
});

definePageMeta({
	layout: 'default',
});

const img = useImage();
const imgUrl = img('/images/asher-og-cover.png', { width: 1200, height: 600 });

useSeoMeta({
	title: 'Asher Norland',
	description: 'Asher Norland\'s blog, photography, projects, and film reviews.',
	ogImage: imgUrl,
	ogTitle: 'The Norrlander',
	ogDescription: 'Asher Norland\'s personal space with fresh air. You\'ll find a blog, some photography, portfolio, and film reviews.',
});
</script>
