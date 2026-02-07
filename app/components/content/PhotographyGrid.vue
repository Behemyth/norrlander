<template>
	<UPageGrid>
		<PhotographyCard
			v-for="photo in photos"
			:key="photo.path"
			:photo="photo"
		/>
	</UPageGrid>
</template>

<script setup lang="ts">
const { data: photos } = await useAsyncData('photography-grid', () =>
	queryCollection('photography')
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.all(),
);
</script>
