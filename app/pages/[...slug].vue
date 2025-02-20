<template>
	<DPage v-if="page">
		<DPageBody>
			<ContentRenderer
				:value="page.body"
			/>
		</DPageBody>

		<template
			v-if="page.body.toc && page.body.toc.links.length"
			#left
		>
			<DPageAside>
				<DContentSectionList
					:toc="page.body.toc"
				/>
			</DPageAside>
		</template>
	</DPage>
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
	layout: 'content',
});

const links = computed(() => {
	if (!page.value?.feed) {
		return [];
	}
	return [
		{
			rel: 'alternate',
			title: page.value?.title,
			type: 'application/feed+json',
			href: '/feed' + route.path,
		},
	];
});

// These links will be picked up by the pre-renderer as they are relative
useHead({
	link: links,
});

useSeoMeta(page.value?.seo || {});
</script>
