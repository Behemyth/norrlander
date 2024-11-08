<template>
	<USelect
		v-model="locale" :options="availableLocales" option-attribute="name"
		value-attribute="code" required
		@change="processChange(locale)"/>
</template>

<script setup lang="ts">

import type { Locale } from 'vue-i18n'

const { locale, locales, setLocale, loadLocaleMessages } = useI18n()

async function processChange(newLocale: Locale) {
	loadLocaleMessages(newLocale).then(() => {
		setLocale(newLocale)
	})
}

const availableLocales = computed(() => {
	return locales.value
})

</script>
