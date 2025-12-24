<template>
	<UPage
		v-if="page"
		:class="{ 'max-w-4xl mx-auto w-full': !page.body?.toc?.links?.length }"
	>
		<template
			v-if="page.body?.toc?.links?.length"
			#left
		>
			<UPageAside>
				<UContentToc
					title="Contents"
					highlight
					:links="page.body.toc.links"
				/>
			</UPageAside>
		</template>
		<UPageHeader
			:title="page.title"
			:description="page.description"
		/>
		<UPageBody>
			<ContentRenderer :value="page" />
		</UPageBody>
	</UPage>
	<PageNotFound
		v-else
		icon="i-lucide-file-text"
		title="Blog post not found"
		description="The blog post you're looking for doesn't exist or has been removed."
		back-label="Back to blog"
		back-to="/blog"
	/>
</template>

<script lang="ts" setup>
const { page } = await useContentPage('blog');
useSeoMeta(page.value?.seo || {});

definePageMeta({
	layout: 'content',
});
</script>
