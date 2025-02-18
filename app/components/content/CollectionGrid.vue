<template>
	<CollectionElementGrid :items="items" />
</template>

<script setup lang="ts" generic="T extends keyof PageCollections">
import type { PageCollections } from '@nuxt/content';

const props = defineProps<{
	collection: T;
	orderValue?: keyof PageCollections[T];
	count?: number;
}>();

let collectionQuery = queryCollection(props.collection).where('publish', '=', true);

if (props.orderValue) {
	collectionQuery = collectionQuery.order(props.orderValue, 'DESC');
}

if (props.count) {
	collectionQuery = collectionQuery.limit(props.count);
}

const items = await collectionQuery.all();
</script>
