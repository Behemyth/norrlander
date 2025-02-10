<template>
	<DHeader
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
			<DColorButton
				:light-icon="'i-heroicons-sun'"
				:dark-icon="'i-heroicons-moon'"
			/>
		</template>
		<template #content>
			<UNavigationMenu
				orientation="vertical"
				color="neutral"
				variant="link"
				:items="items"
			/>
		</template>
	</DHeader>
</template>

<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'));

const items = computed(() => mapContentNavigation(navigation?.value));
</script>
