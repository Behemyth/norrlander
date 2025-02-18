<template>
	<ReviewElementGrid :items="items" />
</template>

<script setup lang="ts">
const props = defineProps<{
	collection: 'movie' | 'show';
	count?: number;
}>();

let collectionQuery = queryCollection(props.collection)
	.where('publish', '=', true)
	.order('date_published', 'DESC');

if (props.count) {
	collectionQuery = collectionQuery.limit(props.count);
}

const items = await collectionQuery.all();
</script>
