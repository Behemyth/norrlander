<template>
	<UContentSearchButton
		icon="i-mdi-search"
		color="neutral"
		variant="ghost"
		size="lg"
	/>
	<ClientOnly>
		<LazyUContentSearch
			v-model:search-term="searchTerm"
			icon="i-mdi-search"
			:files="files"
			:navigation="navigation"
			:color-mode="false"
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
// Defer the ~14 content queries below off the critical path. They're only
// needed once the search modal is opened. We trigger `execute()` on first
// idle after mount (fallback to a short timeout) so the initial page load
// isn't blocked by search-index work.
const { data: files, execute: executeFiles } = useLazyAsyncData(
	'search-data',
	async () => {
		const results = await Promise.all([
			queryCollectionSearchSections('blog').where('draft', '=', false),
			queryCollectionSearchSections('photography').where('draft', '=', false),
			queryCollectionSearchSections('career').where('draft', '=', false),
			queryCollectionSearchSections('academic').where('draft', '=', false),
			queryCollectionSearchSections('project').where('draft', '=', false),
			queryCollectionSearchSections('movie').where('draft', '=', false),
			queryCollectionSearchSections('show').where('draft', '=', false),
		]);

		return results.flat();
	},
	{ server: false, immediate: false },
);

const { data: navigation, execute: executeNavigation } = useLazyAsyncData(
	'search-navigation',
	async () => {
		const results = await Promise.all([
			queryCollectionNavigation('blog'),
			queryCollectionNavigation('photography'),
			queryCollectionNavigation('career'),
			queryCollectionNavigation('academic'),
			queryCollectionNavigation('project'),
			queryCollectionNavigation('movie'),
			queryCollectionNavigation('show'),
		]);

		return results.flat();
	},
	{ server: false, immediate: false },
);

const searchTerm = ref('');

if (import.meta.client) {
	onMounted(() => {
		const load = () => {
			executeFiles();
			executeNavigation();
		};
		if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
			(window as Window & typeof globalThis).requestIdleCallback(load, { timeout: 3000 });
		}
		else {
			setTimeout(load, 1500);
		}
	});
}
</script>
