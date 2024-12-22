<template>
	<header class="max-w-5xl w-full mx-auto p-1 bg-white shadow dark:bg-gray-900">
		<div class="flex flex-row items-center justify-around">
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
						v-model:open="open"
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
				<AppColorSwitch class="hover:text-gray-700 dark:hover:text-gray-300" />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
const open = ref(false);

function closeSlideover(_: Event): void {
	open.value = false;
}

const items = computed(() => [
	{
		label: 'Portfolio',
		to: '/portfolio',
		onSelect: closeSlideover,
	},
	{
		label: 'Reviews',
		to: '/review',
		defaultOpen: true,
		onSelect: closeSlideover,
		children: [
			{
				label: 'Movies',
				to: '/review/movie',
				onSelect: closeSlideover,
			},
			{
				label: 'Shows',
				to: '/review/show',
				onSelect: closeSlideover,
			},
		],
	}, {
		label: 'Blog',
		to: '/blog',
		onSelect: closeSlideover,
	},
]);
</script>
