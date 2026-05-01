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
const { data: posts } = await useLatestBlog();
</script>
