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
			<UPage v-else>
				<UPageBody>
					<UEmpty
						icon="i-lucide-file-text"
						title="Blog post not found"
						description="The blog post you're looking for doesn't exist or has been removed."
						:actions="[{
							label: 'Back to blog',
							to: '/blog',
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

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('blog')
		.where('draft', '=', false)
		.path(route.path)
		.first();
});

definePageMeta({
	layout: false,
});

useSeoMeta(page.value?.seo || {});
</script>
