<template>
	<div>
		<NuxtLayout
			name="content"
			:toc="toc"
		>
			<UBreadcrumb
				:items="items"
				class="m-2"
			/>

			<ContentRenderer
				:value="page"
				:prose="true"
			/>

			<ProseH2>
				Recent Movie Reviews
			</ProseH2>

			<ReviewMovieCardGrid :movies="movies" />

			<ProseH2>
				Recent Show Reviews
			</ProseH2>

			<ReviewShowCardGrid :shows="shows" />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import type { Toc } from '@nuxt/content';

const movies = await queryCollection('movie')
	.order('date_published', 'DESC').limit(6).all();

const shows = await queryCollection('show')
	.order('date_published', 'DESC').limit(6).all();

const page = await queryCollection('page').where('title', '=', 'Review').first();

definePageMeta({
	layout: false,
});

useSeoMeta({
	title: 'Reviews',
});

const items = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Reviews',
		to: '/review',
	},
];

const toc: Toc = {
	title: 'Table of Contents',
	links: [],
	depth: 0,
	searchDepth: 0,
};
</script>
