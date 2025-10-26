<template>
	<div>
		<NuxtLayout
			name="content"
			:toc-links="page?.body.toc?.links"
		>
			<UPage
				v-if="page"
			>
				<UPageHeader
					:title="page.title"
					:description="page.degree"
				/>
				<UPageBody>
					<ContentRenderer
						:value="page"
					/>
				</UPageBody>
			</UPage>
			<UPage v-else>
				<UPageBody>
					<UEmpty
						icon="i-lucide-graduation-cap"
						title="Academic entry not found"
						description="The academic entry you're looking for doesn't exist or has been removed."
						:actions="[{
							label: 'Back to portfolio',
							to: '/portfolio',
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
	return queryCollection('academic')
		.where('draft', '=', false)
		.path(route.path)
		.first();
});

definePageMeta({
	layout: false,
});

useSeoMeta(page.value?.seo || {});
</script>
