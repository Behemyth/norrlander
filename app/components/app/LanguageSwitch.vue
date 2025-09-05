<template>
	<ULocaleSelect
		v-model="locale"
		:locales="Object.values(locales)"
		@update:model-value="setLocale($event)"
	/>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
</script>
