<template>
	<UApp
		:locale="locales[locale]"
	>
		<div class="flex flex-col min-h-dvh max-w-5xl mx-auto">
			<AppHeader class="flex-none" />
			<NuxtLayout class="grow p-4 w-full">
				<!-- Fill the page so that the footer is always at the bottom -->
				<NuxtPage />
			</NuxtLayout>
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
	/* Prevents content shifting. Note: Currently not supported on Safari */
	html {
		scrollbar-gutter: stable;
	}
</style>
