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
			:input="{
				autocapitalize: 'off',
				autocomplete: 'off',
				autocorrect: 'off',
				spellcheck: false,
			}"
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
// The search index loads on the first query via search(), not on page load.
const { status, search } = useSearchCollection(
	['blog', 'photography', 'career', 'academic', 'project', 'movie', 'show'],
	{ immediate: false, ignoredTags: ['style', 'code'] },
);
</script>
