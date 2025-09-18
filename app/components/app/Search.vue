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
			:fuse="{ resultLimit: 40 }"
		/>
	</ClientOnly>
</template>

<script setup lang="ts">
const { data: files } = useLazyAsyncData(
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
	{ server: false },
);

const { data: navigation } = useContentNavigation();

const searchTerm = ref('');
</script>
