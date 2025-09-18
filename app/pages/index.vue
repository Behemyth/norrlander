<template>
	<div>
		<NuxtLayout name="default">
			<UPageHero
				orientation="horizontal"
				title="Asher Norland"
				headline="The Norrlander"
				description="A personal space with fresh air"
				:links="heroLinks"
			>
				<NuxtImg
					src="/images/asher-think.png"
					alt="Asher Norland"
					width="1024"
					preload
					placeholder
					class="rounded-lg shadow-lg aspect-[3/2]"
				/>
			</UPageHero>
			<USeparator />
			<UPageSection
				icon="i-mdi-map"
				title="Trail Markers"
				description="Explore the different sections of this website. I'll be your trail guide."
			>
				<UPageGrid>
					<UPageCard
						v-for="feature in features"
						:key="feature.title"
						:title="feature.title"
						:description="feature.description"
						:icon="feature.icon"
						:to="feature.to"
					/>
				</UPageGrid>
			</UPageSection>
			<UPageSection
				:links="sectionLinks"
				title="About Asher Norland"
				description="I'm Minnesotan by family and spirit. My grandfather was an orchardist and as a result I'm contractually obligated to love all things apple. To steal my heart, take me out for a strong cider."
				class="bg-gray-50 dark:bg-gray-800/50"
			/>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui';

const heroLinks: ButtonProps[] = [

];

const sectionLinks: ButtonProps[] = [
	{
		label: 'Contact Me',
		to: '/contact',
		icon: 'i-mdi-email',
		variant: 'outline',
		size: 'lg',
	},
];

const features = [
	{
		title: 'Blog',
		description: 'Ideas, insights, and tutorials on various technical topics.',
		icon: 'i-mdi-note-edit',
		to: '/blog',
	},
	{
		title: 'Photography',
		description: 'Visual stories and captured moments from my adventures and daily life.',
		icon: 'i-mdi-camera',
		to: '/photography',
	},
	{
		title: 'Portfolio',
		description: 'A showcase of my professional work and projects.',
		icon: 'i-mdi-briefcase',
		to: '/portfolio',
	},
	{
		title: 'Reviews',
		description: 'My thoughts and opinions on film.',
		icon: 'i-mdi-star',
		to: '/review',
	},
];

definePageMeta({
	layout: false,
});

defineOgImage({ url: '/images/asher-think.png' });

useSeoMeta({
	title: 'Asher Norland',
	description: 'Asher Norland\'s blog, photography, projects, and film reviews.',
	ogTitle: 'The Norrlander',
	ogDescription: 'Asher Norland\'s personal space with fresh air. You\'ll find a blog, some photography, portfolio, and film reviews.',
});
</script>
