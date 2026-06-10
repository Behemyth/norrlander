<template>
	<UCarousel
		ref="carousel"
		v-slot="{ item, index }"
		arrows
		dots
		loop
		:items="images"
		:ui="carouselUi"
		class="w-full max-w-3xl mx-auto"
	>
		<UButton
			type="button"
			color="neutral"
			variant="ghost"
			block
			class="w-full cursor-zoom-in bg-transparent p-0 hover:bg-transparent active:bg-transparent focus-visible:bg-transparent"
			:aria-label="$t('photography.viewFullSize')"
			@click="zoomed = index"
		>
			<div
				class="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-sm bg-elevated"
				:style="getSlideFrameStyle(item)"
			>
				<!-- Workaround for nuxt/image#1433: every vw entry needs a breakpoint prefix
					(no bare values, and no xs: — it's not in the default screens).
					Container is max-w-3xl (768px): full-bleed below md, capped at 768px above. -->
				<NuxtImg
					:src="item.src"
					:alt="item.alt"
					:sizes="slideSizes"
					:loading="index === 0 ? 'eager' : 'lazy'"
					:fetchpriority="index === 0 ? 'high' : undefined"
					class="h-full w-full object-contain"
				/>
			</div>
		</UButton>
	</UCarousel>
	<PhotographyLightbox
		v-model="zoomed"
		:images="images"
	/>
	<!-- SSR-rendered hints so the static prerenderer discovers lightbox IPX variants.
		lazy prevents clients from eagerly fetching them (display:none defeats the
		IntersectionObserver, so they never load); useImagePrefetch warms them instead. -->
	<div
		hidden
		aria-hidden="true"
	>
		<NuxtImg
			v-for="image in images"
			:key="image.src"
			:src="image.src"
			preset="fullscreen"
			loading="lazy"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { PhotographyImage } from '~~/shared/types/content';

const props = defineProps<{
	images: PhotographyImage[];
}>();

// Container is max-w-3xl (768px): full-bleed below md, capped at 768px above.
const slideSizes = 'sm:100vw md:768px';

// First slide is the LCP on photography pages.
useImagePreload(props.images[0]?.src, { sizes: slideSizes });

// Warm the cache for the remaining slides and the fullscreen lightbox variants.
useImagePrefetch(() => [
	...props.images.slice(1).map(image => ({ src: image.src, sizes: slideSizes })),
	...props.images.map(image => ({ src: image.src, preset: 'fullscreen' })),
]);

type CarouselHandle = {
	emblaApi?: {
		scrollTo: (index: number, jump?: boolean) => void;
	};
};

const carousel = useTemplateRef<CarouselHandle>('carousel');
const zoomed = ref<number | null>(null);
const slideMaxHeightSvh = 70;
const carouselUi = {
	controls: 'flex items-center justify-center gap-2 mt-4',
	arrows: 'contents',
	prev: 'static translate-y-0',
	next: 'static translate-y-0 order-last',
	dots: 'static flex items-center gap-3',
	dot: 'w-6 h-1',
};
const defaultPhotoFrame = {
	aspectRatio: '3 / 2',
	aspectRatioValue: 3 / 2,
};

watch(zoomed, (index) => {
	if (index === null) return;
	carousel.value?.emblaApi?.scrollTo(index, true);
}, { flush: 'post' });

function getPhotoFrame(image: PhotographyImage) {
	if (!image.width || !image.height) {
		return defaultPhotoFrame;
	}

	return {
		aspectRatio: `${image.width} / ${image.height}`,
		aspectRatioValue: image.width / image.height,
	};
}

function getSlideFrameStyle(image: PhotographyImage) {
	const frame = getPhotoFrame(image);

	return {
		aspectRatio: frame.aspectRatio,
		maxWidth: `min(100%, ${slideMaxHeightSvh * frame.aspectRatioValue}svh)`,
	};
}
</script>
