<template>
	<UCommandPalette
		placeholder="Search..."
		icon="i-mdi-search"
		:groups="[{ id: 'content', items: content }]"
		:fuse="useFuseOptions"
		:ui="{ input: '[&>input]:h-8' }"
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

const { data: content } = await useAsyncData('search-data', () => queryCollectionSearchSections('all').then((value) => {
	return value.map((content) => {
		return {
			id: content.id,
			label: content.title,
			suffix: content.content?.slice(0, 72) + '...',
			to: content.id,
		};
	});
}));

// From an implicit dependency containing `useFuse`
const useFuseOptions = {
	fuseOptions: {
		includeMatches: true,
	},
	resultLimit: 10,
	matchAllWhenSearchEmpty: false,
};
</script>
