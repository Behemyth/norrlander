<template>
	<footer>
		<slot name="left" />
		<slot />
		<slot name="right" />
	</footer>
</template>

<script setup lang="ts">
defineProps({

});
</script>
