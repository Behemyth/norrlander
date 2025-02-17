<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<ULink
			v-for="element in elements"
			:key="element.id"
			:to="element.path"
		>
			<LazyUCard>
				<template #header>
					<ProseH3>
						{{ element[titleValue] }}
					</ProseH3>
				</template>
			</LazyUCard>
		</ULink>
	</div>
</template>

<script setup lang="ts" generic="T extends keyof PageCollections">
import type { PageCollections } from '@nuxt/content';

const props = defineProps<{
	collection: T;
	titleValue: keyof PageCollections[T];
	orderValue?: keyof PageCollections[T];
	count?: number;
}>();

let collectionQuery = queryCollection(props.collection).where('draft', '<>', true);

if (props.orderValue) {
	collectionQuery = collectionQuery.order(props.orderValue, 'DESC');
}

if (props.count) {
	collectionQuery = collectionQuery.limit(props.count);
}

const elements = await collectionQuery.all();
</script>
