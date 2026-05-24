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
		<button
			type="button"
			class="block w-full cursor-zoom-in"
			:aria-label="$t('photography.viewFullSize')"
			@click="openLightbox(index, $event)"
		>
			<div
				class="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-sm bg-elevated"
				:style="getSlideFrameStyle(item)"
			>
				<NuxtImg
					:src="item.src"
					:alt="item.alt"
					sizes="100vw md:768px"
					loading="lazy"
					class="h-full w-full object-contain"
				/>
			</div>
		</button>
	</UCarousel>
	<PhotographyLightbox
		v-model="zoomed"
		:images="images"
		:return-focus="returnFocusElement"
	/>
	<!-- SSR-rendered hints so the static prerenderer discovers lightbox IPX variants -->
	<div
		hidden
		aria-hidden="true"
	>
		<NuxtImg
			v-for="image in images"
			:key="image.src"
			:src="image.src"
			preset="fullscreen"
		/>
	</div>
</template>

<script lang="ts" setup>
import type { PhotographyImage } from '~~/shared/types/content';

defineProps<{
	images: PhotographyImage[];
}>();

type CarouselHandle = {
	emblaApi?: {
		scrollTo: (index: number, jump?: boolean) => void;
	};
};

const carousel = useTemplateRef<CarouselHandle>('carousel');
const zoomed = ref<number | null>(null);
const returnFocusElement = shallowRef<HTMLElement | null>(null);
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

function openLightbox(index: number, event: MouseEvent) {
	returnFocusElement.value = event.currentTarget as HTMLElement;
	zoomed.value = index;
}

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
