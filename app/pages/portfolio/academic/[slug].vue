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
		icon="i-lucide-graduation-cap"
		title="Academic entry not found"
		description="The academic entry you're looking for doesn't exist or has been removed."
		back-label="Back to portfolio"
		back-to="/portfolio"
	/>
</template>

<script lang="ts" setup>
const { page } = await useContentPage('academic');
useSeoMeta({ title: page.value?.title, description: page.value?.description });
</script>
