<template>
	<div>
		<UBreadcrumb :items="items" />
		<article>
			<ContentRenderer
				:value="page"
				:prose="true"
			/>
		</article>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('blog').path(route.path).first();

useSeoMeta({
	title: page.title,
});

const items = ref([
	{
		label: 'Blog',
		to: '/blog',
	},
	{
		label: page.title,
		to: route.path,
	},
]);
</script>
