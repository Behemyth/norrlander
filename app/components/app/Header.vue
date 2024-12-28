<template>
	<header class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-row items-center justify-around">
			<UDropdownMenu
				size="xl"
				color="neutral"
				variant="link"
				:items="items"
			>
				<UButton
					color="neutral"
					variant="ghost"
					icon="i-mdi-hamburger-menu"
					square
					class="md:hidden"
				/>
			</UDropdownMenu>
			<ULink
				to="/"
				rel="author"
				class="text-nowrap p-4 text-4xl font-mono font-extrabold"
			> The Norlander
			</ULink>
			<UNavigationMenu
				orientation="horizontal"
				color="neutral"
				variant="link"
				:items="items"
				class="hidden md:flex justify-center"
			/>
			<UPopover>
				<UButton
					icon="i-mdi-search"
					color="neutral"
					variant="ghost"
				/>

				<template #content>
					<CollectionSearch class="m-4 inline-flex" />
				</template>
			</UPopover>
			<AppColorSwitch class="md:px-8 hover:text-gray-700 dark:hover:text-gray-300" />
		</div>
	</header>
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
