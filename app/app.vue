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
