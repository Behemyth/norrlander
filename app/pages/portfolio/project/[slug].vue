<template>
	<UPage
		v-if="page"
	>
		<UPageHeader
			:title="page.title"
			:description="page.description"
		/>
		<UPageBody>
			<ContentRenderer
				:value="page"
			/>
		</UPageBody>
		<template
			v-if="page.body.toc && page.body.toc.links.length"
			#left
		>
			<UPageAside>
				<UContentToc
					title="Contents"
					highlight
					highlight-color="neutral"
					color="neutral"
					:links="page.body.toc.links"
				/>
			</UPageAside>
		</template>
	</UPage>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('project').path(route.path).first();
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

useSeoMeta(page.value?.seo || {});
</script>
