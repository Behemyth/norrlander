<template>
	<DPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<DPageHeader>
			<ReviewHeader
				:title="page.tmdbData.name"
				:backdrop="page.tmdbData.backdrop_path"
				:rating="page.rating"
				:release-date="new Date(page.tmdbData.first_air_date!)"
				:published="new Date(page.date_published)"
			/>
		</DPageHeader>
		<DPageBody>
			<article>
				<ContentRenderer
					:value="page"
				/>
			</article>
			<ReviewFooter
				:title="page.title"
				:poster="page.tmdbData.poster_path"
				:rating="page.rating"
				:release-date="new Date(page.tmdbData.first_air_date!)"
			/>
			<USeparator class="my-2" />
			<ReviewDiscussion
				category="Shows"
			/>
		</DPageBody>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('show').path(route.path).first();
});

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>
