<template>
	<div class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
		<LazyReviewShowCard
			v-for="show in shows"
			:key="show.id"
			:show="show"
		/>
	</div>
</template>

<script lang="ts">
import type { ShowCollectionItem } from '@nuxt/content';

export interface ShowCardGridProps {
	shows: ShowCollectionItem[];
}
</script>

<script setup lang="ts">
defineProps<ShowCardGridProps>();
</script>
