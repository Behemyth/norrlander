<template>
	<div>
		<slot name="top" />
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
