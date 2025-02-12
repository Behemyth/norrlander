<template>
	<DPage
		v-if="page"
		class="max-w-4xl mx-auto"
	>
		<DPageHeader>
			<ReviewHeader
				:title="page.tmdbData.title"
				:backdrop="page.tmdbData.backdrop_path"
				:rating="page.rating"
				:release-date="new Date(page.tmdbData.release_date!)"
				:published="new Date(page.date_published)"
			/>
		</DPageHeader>
		<DPageBody>
			<article>
				<ContentRenderer
					:value="page"
				/>
			</article>
			<ReviewFooter />
			<USeparator class="my-2" />
			<ReviewDiscussion
				category="Movies"
			/>
		</DPageBody>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('movie').path(route.path).first();
});

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.tmdbData.title,
	description: page.value?.description,
});
</script>
