<template>
	<DApp>
		<AppHeader class="flex-none" />
		<DMain>
			<NuxtLayout class="grow">
				<NuxtPage />
			</NuxtLayout>
		</DMain>
		<AppFooter class="flex-none" />
	</DApp>
</template>

<script setup lang="ts">
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

:root {
	--ui-header-height: calc(var(--spacing) * 16);
}
</style>
