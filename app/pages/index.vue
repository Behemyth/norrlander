<template>
	<div>
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
				preload
				class="rounded-lg shadow-lg"
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
			description="Minnesotan by heart."
			class="bg-gray-50 dark:bg-gray-800/50"
		/>
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

useSeoMeta({
	title: 'Asher Norland | Home',
	description: 'Personal website of Asher Norland featuring blog posts, photography, portfolio projects, and reviews. Welcome to The Norrlander.',
	ogTitle: 'The Norrlander',
	ogDescription: 'Personal website of Asher Norland featuring blog posts, photography, portfolio projects, and reviews.',
});
</script>
