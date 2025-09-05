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
			:files="files"
			:navigation="navigation"
			:color-mode="false"
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
const { data: files } = useLazyAsyncData(
	'search-data',
	async () => {
		const results = await Promise.all([
			queryCollectionSearchSections('blog').where('published', '=', true),
			queryCollectionSearchSections('photography').where('published', '=', true),
			queryCollectionSearchSections('career').where('published', '=', true),
			queryCollectionSearchSections('project').where('published', '=', true),
			queryCollectionSearchSections('movie').where('published', '=', true),
			queryCollectionSearchSections('show').where('published', '=', true),
		]);

		return results.flat();
	},
	{ server: false },
);

const { data: navigation } = useContentNavigation();

const searchTerm = ref('');
</script>
