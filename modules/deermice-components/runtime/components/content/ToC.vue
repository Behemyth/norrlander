<template>
	<div>
		<slot name="top" />
		<p>{{ title }}</p>
		<slot name="bottom" />
	</div>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: false,
	},
	links: {
		type: Array,
		required: true,
	},
});
</script>
