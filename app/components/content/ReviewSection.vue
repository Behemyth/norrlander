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

// Get collection metadata (published and draft counts) in a single query
const { data: metadata } = await useAsyncData(`review-header-${props.collection}`, async () => {
	const rows = await queryCollection(props.collection).select('draft').all();
	const drafts = rows.filter(r => r.draft === true).length;
	const published = rows.length - drafts;

	return {
		published_count: published,
		drafted_count: drafts,
		total_count: rows.length,
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
