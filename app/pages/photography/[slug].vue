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
			v-slot="{ item, index }"
			arrows
			dots
			:items="page.images"
			:ui="{
				controls: 'flex items-center justify-center gap-2 mt-4',
				arrows: 'contents',
				prev: 'static translate-y-0',
				next: 'static translate-y-0 order-last',
				dots: 'static flex items-center gap-3',
				dot: 'w-6 h-1',
			}"
			class="w-full max-w-3xl mx-auto"
		>
			<button
				type="button"
				class="block w-full cursor-zoom-in"
				:aria-label="$t('photography.viewFullSize')"
				@click="zoomed = item"
			>
				<NuxtImg
					:src="item.src"
					:alt="item.alt"
					:width="item.width"
					:height="item.height"
					:sizes="item.sizes"
					:densities="item.densities"
					loading="lazy"
					:style="index === 0 ? { viewTransitionName: `photo${page.path.replaceAll('/', '-')}` } : undefined"
					class="mx-auto"
				/>
			</button>
		</UCarousel>
		<PhotographyLightbox v-model="zoomed" />
		<!-- SSR-rendered hints so the static prerenderer discovers lightbox IPX variants -->
		<div
			hidden
			aria-hidden="true"
		>
			<NuxtImg
				v-for="image in page.images"
				:key="image.src"
				:src="image.src"
				preset="fullscreen"
			/>
		</div>
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
import type { PhotographyImage } from '~~/shared/types/content';

const { page } = await useContentPage('photography');
useSeoMeta({ title: page.value?.title, description: page.value?.description });

const zoomed = ref<PhotographyImage | null>(null);
</script>
