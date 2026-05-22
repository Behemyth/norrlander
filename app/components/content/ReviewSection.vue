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

// Total review count for this collection
const { data: total } = await useAsyncData(`review-header-${props.collection}`, () =>
	queryCollection(props.collection).count(),
);

// Compute the collection title based on the collection type
const collectionTitle = computed(() => {
	return props.collection.charAt(0).toUpperCase() + props.collection.slice(1);
});

// Compute the section description with proper grammar
const sectionDescription = computed(() => {
	return t('review.publishedReview', total.value ?? 0);
});
</script>
