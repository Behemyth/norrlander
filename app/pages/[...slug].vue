<template>
	<div>
		<NuxtLayout
			name="content"
			:toc-links="page?.body.toc?.links"
		>
			<UPage v-if="page">
				<UPageBody>
					<ContentRenderer
						:value="page.body"
					/>
				</UPageBody>
			</UPage>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('content')
		.path(route.path)
		.first();
});

if (!page.value) {
	throw createError({
		statusCode: 404,
		message: 'Page not found',
	});
}

definePageMeta({
	layout: false,
});

const links = computed(() => {
	if (!page.value?.feed) {
		return [];
	}
	return [
		{
			rel: 'alternate',
			title: page.value?.title,
			type: 'application/json',
			href: '/feed' + route.path + '.json',
		},
	];
});

// These links will be picked up by the pre-renderer as they are relative
useHead({
	link: links,
});

useSeoMeta(page.value?.seo || {});
</script>
