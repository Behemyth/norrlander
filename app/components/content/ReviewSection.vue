<template>
	<UPageSection
		:title="t('review.allReviews', { type: collectionTitle })"
		:description="sectionDescription"
	/>
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
	collection: 'movie' | 'show';
}>();

// Get collection metadata (published and draft counts)
const { data: metadata } = await useAsyncData(`review-header-${props.collection}`, async () => {
	const [published, drafts] = await Promise.all([
		queryCollection(props.collection)
			.where('draft', '=', false)
			.count(),
		queryCollection(props.collection)
			.where('draft', '=', true)
			.count(),
	]);

	return {
		published_count: published,
		drafted_count: drafts,
		total_count: published + drafts,
	};
});

// Compute the collection title based on the collection type
const collectionTitle = computed(() => {
	return props.collection.charAt(0).toUpperCase() + props.collection.slice(1);
});

// Compute the section description with proper grammar
const sectionDescription = computed(() => {
	const publishedCount = metadata.value?.published_count || 0;
	const draftCount = metadata.value?.drafted_count || 0;

	const publishedText = t('review.publishedReview', publishedCount);
	const draftText = t('review.draftedReview', draftCount);

	return `${publishedText}, ${draftText}`;
});
</script>
