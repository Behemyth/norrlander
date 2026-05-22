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

const { data: total } = await useAsyncData(`content-section-${props.collection}`, () =>
	queryCollection(props.collection).count(),
);

const sectionTitle = computed(() => {
	if (props.title) {
		return props.title;
	}

	const collectionTitle = props.collection.charAt(0).toUpperCase() + props.collection.slice(1);
	return `All ${collectionTitle} Posts`;
});

const sectionDescription = computed(() => {
	const count = total.value ?? 0;
	return count === 1 ? '1 Published Post' : `${count} Published Posts`;
});
</script>
