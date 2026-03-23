<template>
	<UAlert
		v-if="locale !== 'en'"
		icon="i-mdi-translate"
		color="neutral"
		variant="subtle"
		:title="t('common.englishOnly')"
		class="mb-4"
	/>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
</script>
