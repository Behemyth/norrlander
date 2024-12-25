<template>
	<main class="flex flex-col w-full">
		<UBreadcrumb :items="items" />
		<div class="grow mx-auto w-full">
			<slot />
		</div>
		<USeparator class="my-2" />
		<ReviewDiscussion
			category="Shows"
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
		label: 'Shows',
		to: '/review/show',
	},
]);
</script>
