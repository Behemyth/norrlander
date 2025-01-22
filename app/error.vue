<template>
	<DApp>
		<AppHeader />
		<DError :error="error" />
		<AppFooter />
	</DApp>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
	error: NuxtError;
}>();
</script>
