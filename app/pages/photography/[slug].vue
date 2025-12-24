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
		<UCarousel
			v-slot="{ item }"
			auto-height
			arrows
			dots
			:items="page.images"
			:ui="{
				container: 'transition-[height]',
				controls: 'absolute -top-8 inset-x-12',
				dots: '-top-7',
				dot: 'w-6 h-1',
			}"
			class="w-full max-w-3xl mx-auto"
		>
			<NuxtImg
				:src="item.src"
				:alt="item.alt"
				:width="item.width"
				:height="item.height"
				:sizes="item.sizes"
				:densities="item.densities"
				class="mx-auto"
			/>
		</UCarousel>
	</UPage>
	<PageNotFound
		v-else
		icon="i-lucide-camera"
		title="Photo not found"
		description="The photo series you're looking for doesn't exist or has been removed."
		back-label="Back to photography"
		back-to="/photography"
	/>
</template>

<script lang="ts" setup>
const { page } = await useContentPage('photography');
useSeoMeta(page.value?.seo || {});

definePageMeta({
	layout: 'content',
});
</script>
