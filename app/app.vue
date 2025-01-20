<template>
	<UApp :locale="locales[locale]">
		<div class="flex flex-col min-h-dvh">
			<AppHeader class="flex-none" />
			<DMain class="grow">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</DMain>
			<AppFooter class="flex-none" />
		</div>
	</UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

const { locale } = useI18n();

// const links
// 	= await queryCollection().path('/').where({ layout: 'feed' }).find().then((value) => {
// 		return value.map((content) => {
// 			return {
// 				rel: 'alternate',
// 				title: content.title,
// 				type: 'application/feed+json',
// 				href: content._path + '/feed.json',
// 			};
// 		});
// 	});

// // These links will also be picked up by the pre-renderer
// useHead({
// 	link: links,
// });
</script>

<style>
	@import "tailwindcss";
	@import "@nuxt/ui";

	@theme {
		--font-sans: Lato, sans-serif;
	}

	/* Prevents content shifting. Note: Currently not supported on Safari */
	html {
		scrollbar-gutter: stable;
	}
</style>
