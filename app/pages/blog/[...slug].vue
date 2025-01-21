<template>
	<div>
		<UBreadcrumb
			:items="items"
			class="m-2"
		/>
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
		label: 'Home',
		to: '/',
	},
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
