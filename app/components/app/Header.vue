<template>
	<nav class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex items-center justify-around mx-auto md:justify-evenly">
			<div class="hidden md:flex">
				<UHorizontalNavigation :links="links" />
			</div>
			<div class="h-full aspect-square md:hidden">
				<UButton icon="i-mdi-hamburger-menu" color="primary" square label="Open" @click="isOpen = true">
					<span class="sr-only">Open main menu</span>
				</UButton>
				<USlideover v-model="isOpen" side="left">
					<UVerticalNavigation :links="links" :ui="{ size: 'text-2xl' }" @click="isOpen = false" />
				</USlideover>
			</div>
			<ULink to="/contact" rel="author" class="flex flex-none items-center p-2 md:p-4">
				<NuxtPicture
					src="/gravatar/avatar/293a56bef971ab4999d6230491957d33"
					:img-attrs="{ class: 'h-9 md:h-12 rounded-full' }" class="m-0" />
			</ULink>
			<ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
		</div>
	</nav>
</template>

<script setup lang="ts">

const isOpen = ref(false)

const navigation = await fetchContentNavigation(queryContent().where({ header: true }))

const links = computed(() => {
	return navigation.map((link) => {
		return {
			label: link.navTitle || link.title,
			to: link._path
		}
	})
})

</script>
