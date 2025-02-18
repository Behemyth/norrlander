<template>
	<DContentSearch :groups="groups">
		<UButton
			icon="i-mdi-search"
			color="neutral"
			variant="ghost"
			size="lg"
		/>
	</DContentSearch>
</template>

<script setup lang="ts">
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
			queryCollectionSearchSections('blog')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'blog',
						label: 'Blog',
						items: contentToItems(value),
					};
				}),
			queryCollectionSearchSections('photography')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'photography',
						label: 'Photography',
						items: contentToItems(value),
					};
				}),
			queryCollectionSearchSections('career')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'career',
						label: 'Career',
						items: contentToItems(value),
					};
				}),
			queryCollectionSearchSections('project')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'project',
						label: 'Projects',
						items: contentToItems(value),
					};
				}),
			queryCollectionSearchSections('movie')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'movie',
						label: 'Movies',
						items: contentToItems(value),
					};
				}),
			queryCollectionSearchSections('show')
				.where('publish', '=', true)
				.then((value) => {
					return {
						id: 'show',
						label: 'Shows',
						items: contentToItems(value),
					};
				}),

		]);
	},
);
</script>
