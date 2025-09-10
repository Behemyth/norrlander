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
const posts = await queryCollection('blog')
	.where('published', '=', true)
	.order('date_published', 'DESC')
	.all();
</script>
