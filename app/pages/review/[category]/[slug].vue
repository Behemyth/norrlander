<template>
	<div>
		<NuxtLayout
			name="content"
			:toc-links="page?.body.toc?.links"
		>
			<UPage
				v-if="page"
			>
				<UPageHeader class="max-w-4xl mx-auto w-full">
					<ReviewHeader
						:content="page"
					/>
				</UPageHeader>
				<UPageBody class="max-w-4xl mx-auto w-full">
					<ContentRenderer
						:value="page"
					/>
					<ReviewFooter
						:content="page"
					/>
					<USeparator class="my-8" />
					<UContainer class="max-w-4xl mx-auto w-full">
						<ReviewDiscussion
							:category="capitalizedCategory"
						/>
					</UContainer>
				</UPageBody>
			</UPage>
			<UPage v-else>
				<UPageBody class="max-w-4xl mx-auto w-full">
					<UEmpty
						icon="i-lucide-film"
						title="Review not found"
						description="The review you're looking for doesn't exist or has been removed."
						:actions="[{
							label: 'Back to reviews',
							to: '/review',
							icon: 'i-lucide-arrow-left',
						}]"
					/>
				</UPageBody>
			</UPage>
		</NuxtLayout>
	</div>
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
	return queryCollection(category.value)
		.where('draft', '=', false)
		.path(route.path)
		.first();
});

definePageMeta({
	layout: false,
});

useSeoMeta(page.value?.seo || {});
</script>
