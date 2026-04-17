<template>
	<UPageSection
		:title="sectionTitle"
		:description="sectionDescription"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection: 'blog' | 'photography';
	title?: string;
}>();

const { data: metadata } = await useAsyncData(`content-section-${props.collection}`, async () => {
	const rows = await queryCollection(props.collection).select('draft').all();
	const drafts = rows.filter(r => r.draft === true).length;
	const published = rows.length - drafts;

	return {
		published_count: published,
		drafted_count: drafts,
		total_count: rows.length,
	};
});

const sectionTitle = computed(() => {
	if (props.title) {
		return props.title;
	}

	const collectionTitle = props.collection.charAt(0).toUpperCase() + props.collection.slice(1);
	return `All ${collectionTitle} Posts`;
});

const sectionDescription = computed(() => {
	const publishedCount = metadata.value?.published_count || 0;
	const draftCount = metadata.value?.drafted_count || 0;

	const publishedText = publishedCount === 1 ? '1 Published Post' : `${publishedCount} Published Posts`;
	const draftText = draftCount === 1 ? '1 Draft' : `${draftCount} Drafts`;

	return `${publishedText}, ${draftText}`;
});
</script>
