<template>
	<USelect
		:model-value="locale" :options="availableLocales" option-attribute="name"
		value-attribute="code" required
		@change="processChange($event)"/>
</template>

<script setup lang="ts">

import type { Locale } from 'vue-i18n'

const { locale, locales, setLocale, loadLocaleMessages } = useI18n()

async function processChange(newLocale: Locale) {
	await loadLocaleMessages(newLocale).then(() => {
		setLocale(newLocale)
	})
}

const availableLocales = computed(() => {
	return locales.value
})

</script>
