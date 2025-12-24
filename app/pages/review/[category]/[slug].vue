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
		<ReviewDiscussion
			:category="capitalizedCategory"
			:title="page.title"
			:season-number="'season_number' in page ? page.season_number : null"
		/>
	</UPage>
	<PageNotFound
		v-else
		icon="i-lucide-film"
		title="Review not found"
		description="The review you're looking for doesn't exist or has been removed."
		back-label="Back to reviews"
		back-to="/review"
	/>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError('Invalid review category');
}
const category = route.params.category as 'movie' | 'show';

const capitalizedCategory = computed(() => {
	return category.charAt(0).toUpperCase() + category.slice(1);
});

const { page } = await useContentPage(category);
useSeoMeta(page.value?.seo || {});

definePageMeta({
	layout: 'content',
});
</script>
