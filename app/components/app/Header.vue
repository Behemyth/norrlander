<template>
	<DHeader
		title="The Norlander"
		:ui="{
			title: 'text-nowrap font-mono',
		}"
	>
		<UNavigationMenu
			color="neutral"
			variant="link"
			:items="items"
		/>
		<template #right>
			<CollectionSearch />
			<AppColorSwitch class="md:px-8 hover:text-gray-700 dark:hover:text-gray-300" />
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
