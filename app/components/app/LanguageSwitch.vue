<template>
	<ULocaleSelect
		:model-value="locale"
		:locales="Object.values(locales) as any"
		@update:model-value="setLocale($event as typeof locale)"
	/>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>
