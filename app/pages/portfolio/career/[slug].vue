<template>
	<UPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<UPageHeader
			:title="page.title"
			:description="page.position"
		/>
		<UPageBody>
			<article>
				<ContentRenderer
					:value="page"
				/>
			</article>
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
	return queryCollection('career').path(route.path).first();
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
