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
	title: 'TODO',
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
		label: 'TODO',
		to: route.path,
	},
]);
</script>
