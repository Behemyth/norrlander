<template>
	<div>
		<slot name="left" />
		<slot />
		<slot name="right" />
	</div>
</template>

<script setup lang="ts">
defineProps({

});
</script>
