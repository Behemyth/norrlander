<template>
	<div>
		<UBreadcrumb :items="items" />
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
const posts = await queryCollection('blog').all();

useSeoMeta({
	title: 'Blog',
});

const items = ref([
	{
		label: 'Blog',
		to: '/blog',
	},
]);
</script>
