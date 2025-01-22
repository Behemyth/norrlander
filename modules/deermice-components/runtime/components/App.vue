<template>
	<UApp
		:locale="locales[locale]"
		:scroll-body="false"
	>
		<div :class="baseTheme()">
			<slot />
		</div>
	</UApp>
</template>

<script lang="ts">
import * as locales from '@nuxt/ui/locale';
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	base: 'flex flex-col min-h-dvh',
});

// TODO: Forward UApp props to UApp
// export interface AppProps {

// }

export interface AppSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
const { locale } = useI18n();
// defineProps<AppProps>();
defineSlots<AppSlots>();
</script>

<style>
/* Prevents content shifting if a scrollbar is present. Note: Currently not supported on Safari */
html {
	scrollbar-gutter: stable; /* For use with UApp scroll-body: false */
}
</style>
