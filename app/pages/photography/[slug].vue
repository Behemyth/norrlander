<template>
	<UPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<UPageHeader
			:title="page.title"
			:description="page.description"
		/>
		<UPageBody>
			<ContentRenderer :value="page" />
		</UPageBody>
		<PhotographyCarousel
			:images="images"
		/>
	</UPage>
	<PageNotFound
		v-else
		icon="i-lucide-camera"
		:title="$t('photography.notFound')"
		:description="$t('photography.notFoundDescription')"
		:back-label="$t('photography.backToPhotography')"
		back-to="/photography"
	/>
</template>

<script lang="ts" setup>
const { page } = await useContentPage('photography');
useSeoMeta({ title: page.value?.title, description: page.value?.description });

const images = computed(() => page.value?.images ?? []);
</script>
