<template>
	<div>
		<UPageHero
			orientation="horizontal"
			title="Asher Norland"
			headline="The Norrlander"
			:description="$t('index.heroDescription')"
			:links="heroLinks"
			:ui="{ container: 'flex flex-col lg:grid py-16 sm:py-24 lg:py-28 gap-16 sm:gap-y-24' }"
		>
			<NuxtImg
				src="/images/asher-think.png"
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
			<UPageGrid>
				<UPageCard
					v-for="feature in features"
					:key="feature.to"
					:title="feature.title"
					:description="feature.description"
					:icon="feature.icon"
					:to="feature.to"
				/>
			</UPageGrid>
		</UPageSection>
		<UPageSection
			:links="sectionLinks"
			:title="$t('index.aboutTitle')"
			:description="$t('index.aboutDescription')"
			class="bg-gray-50 dark:bg-gray-800/50"
			:ui="{ container: 'flex flex-col lg:grid py-12 sm:py-16 lg:py-20 gap-8 sm:gap-16' }"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';

const { t } = useI18n();

const heroLinks = computed<ButtonProps[]>(() => [
	{
		label: t('index.viewPortfolio'),
		to: '/portfolio',
		icon: 'i-mdi-briefcase',
		size: 'lg',
	},
	{
		label: t('index.readBlog'),
		to: '/blog',
		icon: 'i-mdi-note-edit',
		variant: 'outline',
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

const features = computed(() => [
	{
		title: t('index.blog'),
		description: t('index.blogDescription'),
		icon: 'i-mdi-note-edit',
		to: '/blog',
	},
	{
		title: t('index.photography'),
		description: t('index.photographyDescription'),
		icon: 'i-mdi-camera',
		to: '/photography',
	},
	{
		title: t('index.portfolio'),
		description: t('index.portfolioDescription'),
		icon: 'i-mdi-briefcase',
		to: '/portfolio',
	},
	{
		title: t('index.reviews'),
		description: t('index.reviewsDescription'),
		icon: 'i-mdi-star',
		to: '/review',
	},
]);

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
