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
const photos = await queryCollection('photography')
	.where('published', '=', true)
	.order('date_published', 'DESC')
	.all();
</script>
