<template>
	<DHeader
		title="The Norlander"
		:ui="{
			title: 'text-nowrap font-mono',
		}"
		:content-toggle="{ icon: 'i-mdi-hamburger-menu' }"
	>
		<UNavigationMenu
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
const items = computed(() => [
	{
		label: 'Blog',
		to: '/blog',
	},
	{
		label: 'Photography',
		to: '/photography',
	},
	{
		label: 'Portfolio',
		to: '/portfolio',
		children: [
			{
				label: 'Career',
				to: '/portfolio/career',
			},
			{
				label: 'Projects',
				to: '/portfolio/project',
			},
		],
	},
	{
		label: 'Reviews',
		to: '/review',
		children: [
			{
				label: 'Movies',
				to: '/review/movie',
			},
			{
				label: 'Shows',
				to: '/review/show',
			},
		],
	},
]);
</script>
