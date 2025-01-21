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

const page = await queryCollection('project').path(route.path).first();

useSeoMeta({
	title: page.title,
});

const items = ref([
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
	{
		label: 'Projects',
		to: '/portfolio/project',
	},
	{
		label: page.title,
		to: route.path,
	},
]);
</script>
