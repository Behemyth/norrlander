<template>
	<DPage
		v-if="page"
		class=""
	>
		<DPageHeader class="max-w-4xl mx-auto w-full">
			<ReviewHeader
				:title="page.tmdbData.title"
				:backdrop="page.tmdbData.backdrop_path"
				:rating="page.rating"
				:release-date="new Date(page.tmdbData.release_date!)"
				:published="new Date(page.date_published)"
			/>
		</DPageHeader>
		<DPageBody>
			<article class="max-w-4xl mx-auto w-full">
				<ContentRenderer
					:value="page"
				/>
			</article>
			<ReviewFooter
				:title="page.tmdbData.title"
				:poster="page.tmdbData.poster_path"
				:rating="page.rating"
				:release-date="new Date(page.tmdbData.release_date!)"
			/>
			<USeparator class="my-8" />
			<div class="max-w-4xl mx-auto w-full">
				<ReviewDiscussion
					category="Movies"
				/>
			</div>
		</DPageBody>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError('Invalid review category');
}
const category = computed(() => route.params.category as 'movie' | 'show');

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection(category.value).path(route.path).first();
});

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>
