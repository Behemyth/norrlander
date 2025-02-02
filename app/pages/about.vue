<template>
	<ContentRenderer
		:value="page"
	/>
</template>

<script setup lang="ts">
const page = await queryCollection('page').where('title', '=', 'About').first();

useHead({
	title: 'About',
});
</script>
