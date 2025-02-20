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
const url = useRequestURL();
const links
	= await queryCollection('feed').all().then((value) => {
		return value.map((content) => {
			return {
				rel: 'alternate',
				title: content.title,
				type: 'application/feed+json',
				href: new URL(content.category + '/feed.json', url.href).toString(),
			};
		});
	});

// These links will also be picked up by the pre-renderer
useHead({
	link: links,
});
</script>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

/* Used to apply tailwind classes to content files */
@source "../content/**/*";

@theme {
	--font-sans: Lato, sans-serif;
}

:root {
	--ui-header-height: calc(var(--spacing) * 16);
}
</style>
