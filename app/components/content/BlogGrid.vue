<template>
	<UPageGrid>
		<BlogCard
			v-for="post in posts"
			:key="post.path"
			:post="post"
		/>
	</UPageGrid>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-grid', () =>
	queryCollection('blog')
		.select('title', 'description', 'path', 'date_published')
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.all(),
);
</script>
