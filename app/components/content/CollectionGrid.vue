<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyDCard
			v-for="element in items"
			:key="element.id"
			:title="element.title"
			:to="element.path"
		/>
		<div
			v-for="index in skeletonCount"
			:key="index"
			class="w-full h-full bg-(--ui-bg-elevated)"
		/>
	</div>
</template>

<script setup lang="ts" generic="T extends keyof PageCollections">
import type { PageCollections } from '@nuxt/content';

const props = defineProps<{
	collection: T;
	count: number;
}>();

const items = await queryCollection(props.collection)
	.where('publish', '=', true)
	.limit(props.count)
	.all();

const skeletonCount = computed(() => props.count - items.length);
</script>
