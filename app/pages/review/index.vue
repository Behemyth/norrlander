<template>
	<div>
		<RecentList
			:size="35"
			:data="movies"
		/>
		<RecentList
			:size="35"
			:data="shows"
		/>
	</div>
</template>

<script setup lang="ts">
const movies = await queryCollection('movie')
	.order('date_published', 'DESC').limit(4).all();

const shows = await queryCollection('show')
	.order('date_published', 'DESC').limit(4).all();
</script>
