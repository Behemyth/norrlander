<template>
	<ULocaleSelect
		v-model="locale"
		:locales="Object.values(locales) as any"
		@update:model-value="setLocale($event as 'en' | 'pl')"
	/>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>
