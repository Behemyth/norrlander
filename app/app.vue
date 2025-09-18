<template>
	<UApp
		:scroll-body="false"
		:locale="locales[locale]"
	>
		<AppHeader />
		<UMain class="grow min-h-0">
			<NuxtPage />
		</UMain>
		<AppFooter />
	</UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();

const links
	= await queryCollection('content')
		.where('feed', 'IS NOT NULL')
		.all()
		.then((value) => {
			return value.map((page) => {
				return {
					rel: 'alternate',
					title: page.title,
					type: 'application/json',
					href: 'https://norrlander.com/feed' + page.path + '.json',
				};
			});
		});

// These links are for external services, and will not be picked up by the prerender (not relative)
useHead({
	link: links,
});
</script>
