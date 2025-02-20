<template>
	<DPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<DPageBody>
			<article>
				<ContentRenderer
					:value="page"
				/>
			</article>
		</DPageBody>
	</DPage>
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
