<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
		<div class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<LazyPortfolioCard
				v-for="post in posts"
				:key="post.id"
				:title="post.title"
				:link="post.path"
				website="/"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
const posts = await queryCollection('photography').all();

useSeoMeta({
	title: 'Photography',
});

const items = ref([
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Photography',
		to: '/photography',
	},
]);
</script>
