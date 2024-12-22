<template>
	<USelect
		v-model="locale"
		:items="availableLocales"
		label-key="name"
		value-key="code"
		required
		@update="onUpdateLocale"
	/>
</template>

<script setup lang="ts">
import type { Locale } from 'vue-i18n';

const { locale, locales, setLocale, loadLocaleMessages } = useI18n();

async function onUpdateLocale(newLocale: Locale) {
	await loadLocaleMessages(newLocale).then(() => {
		setLocale(newLocale);
	});
}

const availableLocales = computed(() => {
	return locales.value;
});
</script>
