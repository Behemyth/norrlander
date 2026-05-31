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
					:title="$t('common.contents')"
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
		icon="i-lucide-folder-open"
		:title="$t('portfolio.projectNotFound')"
		:description="$t('portfolio.projectNotFoundDescription')"
		:back-label="$t('portfolio.backToPortfolio')"
		back-to="/portfolio"
	/>
</template>

<script lang="ts" setup>
const { page } = await useContentPage('project');
useSeoMeta({ title: page.value?.title, description: page.value?.description });
</script>
