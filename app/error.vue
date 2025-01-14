<template>
	<div>
		<h1>{{ props.error!.statusCode }}</h1>
		<NuxtLink to="/">Home</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
	error: Object as () => NuxtError,
});
</script>
