<template>
	<UPageBody>
		<UEmpty
			:icon="icon"
			:title="title"
			:description="description"
			:actions="[{
				label: backLabel,
				to: backTo,
				icon: 'i-lucide-arrow-left',
			}]"
		/>
	</UPageBody>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	icon?: string;
	title?: string;
	description?: string;
	backLabel?: string;
	backTo?: string;
}>(), {
	icon: 'i-lucide-file-search',
	title: 'Page not found',
	description: 'The page you\'re looking for doesn\'t exist or has been moved.',
	backLabel: 'Back to home',
	backTo: '/',
});
</script>
