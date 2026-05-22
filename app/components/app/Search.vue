<template>
	<UContentSearchButton
		icon="i-mdi-search"
		color="neutral"
		variant="ghost"
		size="lg"
	/>
	<ClientOnly>
		<LazyUContentSearch
			icon="i-mdi-search"
			:search="search"
			:search-status="status"
			:color-mode="false"
			:search-delay="100"
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
// Deferred loading of the search collection to improve initial load performance
const { status, search, init } = useSearchCollection(
	['blog', 'photography', 'career', 'academic', 'project', 'movie', 'show'],
	{ immediate: false, ignoredTags: ['style', 'code'] },
);

if (import.meta.client) {
	onMounted(() => {
		const load = () => {
			init();
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
