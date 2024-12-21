<template>
	<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LazyReviewShowCard
			v-for="show in shows"
			:key="show.id"
			:show="show"
		/>
	</div>
</template>

<script setup lang="ts">
const shows = await queryCollection('show')
	.order('date_published', 'DESC').all();
</script>
