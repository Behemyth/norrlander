<template>
	<header class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-row items-center justify-evenly md:justify-between">
			<nav class="h-full aspect-square md:hidden">
				<UButton
					icon="i-mdi-hamburger-menu"
					color="primary"
					square
					label="Open"
					@click="isOpen = true"
				>
					<span class="sr-only">Open main menu</span>
				</UButton>
				<USlideover
					v-model="isOpen"
					side="left"
				>
					<UVerticalNavigation
						:links="links"
						:ui="{ size: 'text-2xl' }"
						@click="isOpen = false"
					/>
				</USlideover>
			</nav>
			<ULink
				to="/"
				rel="author"
				class="p-4 text-4xl font-mono font-extrabold"
			> The Norlander
			</ULink>
			<nav class="hidden md:flex">
				<UHorizontalNavigation :links="links" />
			</nav>

			<div class="md:px-8">
				<ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const navigation = await fetchContentNavigation(queryContent().where({ header: true }));

const links = computed(() => {
	return navigation.map((link) => {
		return {
			label: link.navTitle || link.title,
			to: link._path,
		};
	});
});
</script>
