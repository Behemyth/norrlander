<template>
	<ContentRenderer
		:value="page"
		:prose="true"
	/>
</template>

<script setup lang="ts">
const page = await queryCollection('page').where('title', '=', 'About').first();

useSeoMeta({
	title: 'About',
});
</script>
