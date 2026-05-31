<template>
	<UPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<ReviewHeader :content="page" />
		<UPageBody>
			<ContentRenderer :value="page" />
		</UPageBody>
		<ReviewFooter :content="page" />
		<USeparator class="my-8" />
		<ClientOnly>
			<LazyReviewDiscussion
				:category="capitalizedCategory"
				:title="page.title"
				:season-number="'season_number' in page ? page.season_number : undefined"
			/>
		</ClientOnly>
	</UPage>
	<PageNotFound
		v-else
		icon="i-lucide-film"
		:title="$t('review.notFound')"
		:description="$t('review.notFoundDescription')"
		:back-label="$t('review.backToReviews')"
		back-to="/review"
	/>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError({ statusCode: 404, statusMessage: 'Invalid review category', fatal: true });
}
const category = route.params.category as 'movie' | 'show';

const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

const { page } = await useContentPage(category);
useSeoMeta({ title: page.value?.title, description: page.value?.description });
</script>
