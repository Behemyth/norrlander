<template>
	<div>
		<NuxtLayout
			name="content"
			:toc-links="page?.body.toc?.links"
		>
			<UPage v-if="page">
				<UPageHeader
					:title="page.title"
					:description="page.description"
					:headline="page.headline"
					:links="page.links"
				/>
				<UPageBody>
					<ContentRenderer
						:value="page.body"
					/>
				</UPageBody>
			</UPage>
			<UPage v-else>
				<UPageBody>
					<UEmpty
						icon="i-lucide-file-search"
						title="Page not found"
						description="The page you're looking for doesn't exist or has been moved."
						:actions="[{
							label: 'Back to home',
							to: '/',
							icon: 'i-lucide-home',
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
	return queryCollection('content')
		.path(route.path)
		.first();
});

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
