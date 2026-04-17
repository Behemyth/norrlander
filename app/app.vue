<template>
	<UApp
		:scroll-body="false"
		:locale="uiLocale"
	>
		<NuxtAnnouncer />
		<AppHeader />
		<UMain class="grow min-h-0">
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</UMain>
		<AppFooter />
	</UApp>
</template>

<script setup lang="ts">
import { en } from '@nuxt/ui/locale';

const { locale } = useI18n();

// Dynamically import the active UI locale to avoid bundling all four locale
// packs in the initial client payload. `en` is statically imported as a safe
// SSR default (matches `i18n.defaultLocale`); others are code-split chunks
// loaded only when the user switches to that locale.
const uiLocale = shallowRef<typeof en>(en);

const uiLocaleLoaders: Record<string, () => Promise<typeof en>> = {
	en: async () => en,
	de: () => import('@nuxt/ui/runtime/locale/de.js').then(m => m.default ?? m.de),
	pl: () => import('@nuxt/ui/runtime/locale/pl.js').then(m => m.default ?? m.pl),
	sv: () => import('@nuxt/ui/runtime/locale/sv.js').then(m => m.default ?? m.sv),
};

watchEffect(async () => {
	if (!import.meta.client) return;
	const loader = uiLocaleLoaders[locale.value] ?? uiLocaleLoaders.en;
	try {
		uiLocale.value = await loader!();
	}
	catch {
		uiLocale.value = en;
	}
});

// Per-page alternate feed `<link>` is emitted in `pages/[...slug].vue` for the
// current route; no global list is needed here.
</script>
