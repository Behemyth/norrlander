<template>
	<header class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-row items-center justify-evenly md:justify-between">
			<USlideover
				side="left"
			>
				<UButton
					icon="i-mdi-hamburger-menu"
					square
					label="Open"
				/>
				<template #content>
					<UNavigationMenu
						orientation="vertical"
						:items="items"
					/>
				</template>
			</USlideover>
			<ULink
				to="/"
				rel="author"
				class="p-4 text-4xl font-mono font-extrabold"
			> The Norlander
			</ULink>
			<UNavigationMenu
				orientation="horizontal"
				:items="items"
				class="hidden md:flex"
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
