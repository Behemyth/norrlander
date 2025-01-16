<template>
	<ULink
		:to="link"
		:title="title"
		class="w-full h-32 flex items-center bg-white border border-gray-200 rounded-lg shadow md:h-48 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
	>
		<div class="flex flex-col justify-between p-4 leading-normal">
			<h5 class="mb-2 font-bold tracking-tight text-gray-900 md:text-l dark:text-white"> {{ title }}
			</h5>
		</div>

	</ULink>
</template>

<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: true,
	},
});
</script>
