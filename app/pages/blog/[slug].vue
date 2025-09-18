<template>
	<div>
		<NuxtLayout
			name="content"
			:toc-links="page?.body.toc?.links"
		>
			<UPage
				v-if="page"
			>
				<UPageBody>
					<ContentRenderer
						:value="page"
					/>
				</UPageBody>
			</UPage>
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('blog').path(route.path).first();
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

useSeoMeta(page.value?.seo || {});
</script>
