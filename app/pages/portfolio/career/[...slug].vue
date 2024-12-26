<template>
	<div class="prose">
		<UBreadcrumb :items="items" />
		<article>
			<ContentRenderer
				:value="page"
			/>
		</article>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const page = await queryCollection('career').path(route.path).first();

useSeoMeta({
	title: page.title,
});

const items = ref([
	{
		label: 'Portfolio',
		to: '/portfolio',
	},
	{
		label: 'Career',
		to: '/portfolio/career',
	},
	{
		label: page.title,
		to: route.path,
	},
]);
</script>
