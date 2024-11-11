<template>
	<main class="flex flex-col min-h-dvh max-w-5xl mx-auto">
		<AppHeader class="flex-none" />
		<!-- Fill the page so that the footer is always at the bottom -->
		<NuxtPage class="p-4 w-full flex grow" />
		<AppFooter class="flex-none" />
	</main>
</template>

<script setup lang="ts">
const links
	= await queryContent('/').where({ layout: 'feed' }).find().then((value) => {
		return value.map((content) => {
			return {
				rel: 'alternate',
				title: content.title,
				type: 'application/feed+json',
				href: content._path + '/feed.json',
			};
		});
	});

// These links will also be picked up by the pre-renderer
useHead({
	link: links,
});
</script>

<style>
	/* Prevents content shifting. Note: Currently not supported on Safari */
	html {
		scrollbar-gutter: stable;
	}
</style>
