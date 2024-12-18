<template>
	<header class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-row items-center justify-evenly md:justify-between">
			<USlideover
				side="left"
			>
				<UButton
					color="neutral"
					variant="ghost"
					icon="i-mdi-hamburger-menu"
					square
					class="md:hidden"
				/>
				<template #content>
					<UNavigationMenu
						orientation="vertical"
						color="neutral"
						variant="link"
						:items="items"
					/>
				</template>
			</USlideover>
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
			<div class="md:px-8">
				<ColorModeSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const items = computed(() => [
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
	{
		label: 'Reviews',
		to: '/review',
		defaultOpen: true,
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
	}, {
		label: 'Blog',
		to: '/blog',
	},
]);
</script>
