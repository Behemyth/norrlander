<template>
	<main class="flex flex-col w-full">
		<UBreadcrumb :items="items" />
		<div class="grow mx-auto w-full">
			<slot />
		</div>
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Movies"
		/>
	</main>
</template>

<script setup lang="ts">
const items = ref([
	{
		label: 'Reviews',
		to: '/review',
	},
	{
		label: 'Movies',
		to: '/review/movie',
	},
]);
</script>
