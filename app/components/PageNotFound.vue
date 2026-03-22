<template>
	<UPageBody>
		<UEmpty
			:icon="icon"
			:title="title ?? $t('common.pageNotFound')"
			:description="description ?? $t('common.pageNotFoundDescription')"
			:actions="[{
				label: backLabel ?? $t('common.backToHome'),
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
	title: undefined,
	description: undefined,
	backLabel: undefined,
	backTo: '/',
});
</script>
