<template>
	<div>
		<slot name="top" />
		<slot />
		<slot name="bottom" />
	</div>
</template>

<script setup lang="ts">
defineProps({

});
</script>
