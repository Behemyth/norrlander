<template>
	<UCommandPalette
		placeholder="Search..."
		icon="i-mdi-search"
		autofocus
		:groups="groups"
		:fuse="useFuseOptions"
		:ui="{ input: '[&>input]:h-8' }"
		class="flex-1"
		@update:model-value="onSelect"
	/>
</template>

<script setup lang="ts">
import type { CommandPaletteItem } from '@nuxt/ui';

// Our type extension for selection data
interface Command extends CommandPaletteItem {
	to?: string;
}

function onSelect(item: Command) {
	navigateTo(item.to);
}

// TODO: Use named Nuxt/Content type when it exists
interface Section {
	id: string;
	title: string;
	titles: string[];
	level: number;
	content: string;
};

function contentToItems(content: Section[]) {
	return content.map((item: Section) => {
		return {
			label: item.title,
			suffix: item.content?.slice(0, 72) + '...',
			to: item.id,
		};
	});
}

const { data: groups } = await useAsyncData('search-data',
	() => {
		return Promise.all([
			queryCollectionSearchSections('blog').then((value) => {
				return {
					id: 'blog',
					label: 'Blog',
					items: contentToItems(value),
				};
			}),
			queryCollectionSearchSections('photography').then((value) => {
				return {
					id: 'photography',
					label: 'Photography',
					items: contentToItems(value),
				};
			}),
			queryCollectionSearchSections('career').then((value) => {
				return {
					id: 'career',
					label: 'Career',
					items: contentToItems(value),
				};
			}),
			queryCollectionSearchSections('project').then((value) => {
				return {
					id: 'project',
					label: 'Projects',
					items: contentToItems(value),
				};
			}),
			queryCollectionSearchSections('movie').then((value) => {
				return {
					id: 'movie',
					label: 'Movies',
					items: contentToItems(value),
				};
			}),
			queryCollectionSearchSections('show').then((value) => {
				return {
					id: 'show',
					label: 'Shows',
					items: contentToItems(value),
				};
			}),

		]);
	},
);

// From an implicit dependency containing `useFuse`
const useFuseOptions = {
	fuseOptions: {
		includeMatches: false,
	},
	resultLimit: 10,
	matchAllWhenSearchEmpty: false,
};
</script>
