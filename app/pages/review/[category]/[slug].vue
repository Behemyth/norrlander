<template>
	<DPage
		v-if="page"
	>
		<DPageHeader class="max-w-4xl mx-auto w-full">
			<ReviewHeader
				:content="page"
			/>
		</DPageHeader>
		<DPageBody>
			<article class="max-w-4xl mx-auto w-full">
				<ContentRenderer
					:value="page"
				/>
			</article>
			<ReviewFooter
				:content="page"
			/>
			<USeparator class="my-8" />
			<div class="max-w-4xl mx-auto w-full">
				<ReviewDiscussion
					:category="capitalizedCategory"
				/>
			</div>
		</DPageBody>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError('Invalid review category');
}
const category = computed(() => route.params.category as 'movie' | 'show');

const capitalizedCategory = computed(() => {
	return category.value.charAt(0).toUpperCase() + category.value.slice(1);
});

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection(category.value).path(route.path).first();
});

if (!page.value) {
	throw createError({
		statusCode: 404,
		message: 'Review not found',
	});
}

definePageMeta({
	layout: 'content',
});

useSeoMeta(page.value?.seo || {});
</script>
