<template>
	<UModal>
		<UButton
			icon="i-mdi-search"
			color="neutral"
			variant="ghost"
			size="lg"
		/>
		<template #content>
			<ClientOnly>
				<LazyUContentSearch
					v-model:search-term="searchTerm"
					:files="files"
					:color-mode="false"
				/>
			</ClientOnly>
		</template>
	</UModal>
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

const searchTerm = ref('');
</script>
