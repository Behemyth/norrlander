<template>
	<div class="flex flex-col min-h-dvh">
		<AppHeader />
		<NuxtPage class="grow"/>
		<AppFooter />
	</div>
</template>

<script setup lang="ts">
const links =
	await queryContent('/').where({ layout: 'feed' }).find().then((value) => {
		return value.map((content) => {
			return {
				rel: 'alternate',
				title: content.title,
				type: 'application/feed+json',
				href: content._path + '/feed.json'
			}
		})
	})

// These links will also be picked up by the pre-renderer
useHead({
	link: links
})
</script>

<style>
	/* Prevents content shifting. Note: Currently not supported on Safari */
	html {
		scrollbar-gutter: stable;
	}
</style>
