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
					href: 'https://ashernorland.com/feed' + page.path + '.json',
				};
			});
		});

// These links are for external services, and will not be picked up by the prerender (not relative)
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
