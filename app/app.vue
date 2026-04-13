<template>
	<UApp
		:scroll-body="false"
		:locale="uiLocales[locale]"
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
import { en, de, pl, sv } from '@nuxt/ui/locale';

const uiLocales: Record<string, any> = { en, de, pl, sv };
const { locale } = useI18n();

const { data: feedPages } = await useAsyncData('feed-links', () =>
	queryCollection('content')
		.select('path', 'title', 'feed')
		.where('feed', 'IS NOT NULL')
		.all(),
);

const links = computed(() =>
	(feedPages.value ?? []).map(page => ({
		rel: 'alternate',
		title: page.title,
		type: 'application/json',
		href: 'https://norrlander.com/feed' + page.path + '.json',
	})),
);

// These links are for external services, and will not be picked up by the prerender (not relative)
useHead({
	link: links,
});
</script>
