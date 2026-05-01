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
const { data: photos } = await useLatestPhotography();
</script>
