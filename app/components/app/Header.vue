<template>
	<UHeader
		title="The Norlander"
		:ui="{
			title: 'text-nowrap font-mono text-2xl md:text-3xl',
		}"
		:content-toggle="{ icon: 'i-mdi-hamburger-menu', size: 'lg' }"
		class="mb-2"
	>
		<UNavigationMenu
			content-orientation="vertical"
			color="neutral"
			variant="link"
			:items="items"
		/>
		<template #right>
			<AppSearch />
			<UColorModeButton />
		</template>
		<template #content>
			<UNavigationMenu
				orientation="vertical"
				color="neutral"
				variant="link"
				:items="items"
			/>
		</template>
	</UHeader>
</template>

<script setup lang="ts">
const { data: navigation } = await useContentNavigation();

const items = computed(() => mapContentNavigation(navigation?.value));
</script>
