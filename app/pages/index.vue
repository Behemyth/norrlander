<template>
	<div />
</template>

<script lang="ts" setup>
const links
	= await queryCollection('content')
		.where('feed', 'IS NOT NULL')
		.all()
		.then((value) => {
			return value.map((page) => {
				return {
					rel: 'alternate',
					title: page.title,
					type: 'application/json',
					href: 'https://ashernorland.com/feed' + page.path + '.json',
				};
			});
		});

// These links are for external services, and will not be picked up by the prerender (not relative)
useHead({
	link: links,
});

useSeoMeta({
	title: 'The Norlander',
});
</script>
