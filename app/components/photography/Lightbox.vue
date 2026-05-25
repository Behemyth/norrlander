<template>
	<UModal
		:open="modelValue !== null"
		:title="$t('photography.viewFullSize')"
		:description="currentImageDescription"
		fullscreen
		:transition="false"
		:content="modalContent"
		:ui="{ content: 'bg-black/95' }"
		@update:open="handleOpenChange"
	>
		<template #content>
			<div
				ref="lightbox"
				class="relative isolate h-full w-full overflow-hidden bg-black/95"
				@focusin="revealControls"
				@keydown.capture="handleKeydown"
				@pointerdown="revealControls"
				@pointermove="revealControls"
			>
				<UButton
					icon="i-lucide-x"
					color="neutral"
					variant="solid"
					size="lg"
					:class="closeButtonClass"
					:aria-label="$t('photography.closeFullSize')"
					@click="close"
				/>
				<UCarousel
					v-if="modelValue !== null"
					ref="carousel"
					v-slot="{ item }"
					arrows
					dots
					loop
					wheel-gestures
					:items="images"
					:prev="carouselButtonProps"
					:next="carouselButtonProps"
					:start-index="modelValue"
					:ui="carouselUi"
					class="h-svh w-svw"
					@select="emit('update:modelValue', $event)"
				>
					<div
						class="flex h-svh w-svw cursor-zoom-out items-center justify-center"
						@click.self="close"
					>
						<NuxtImg
							:src="item.src"
							:alt="item.alt"
							preset="fullscreen"
							:style="getMediaStyle(item)"
							class="max-h-svh max-w-svw cursor-grab object-contain active:cursor-grabbing"
							draggable="false"
						/>
					</div>
				</UCarousel>
			</div>
		</template>
	</UModal>
</template>

<script lang="ts" setup>
import type { PhotographyImage } from '~~/shared/types/content';

const props = defineProps<{
	modelValue: number | null;
	images: PhotographyImage[];
}>();

const emit = defineEmits<{
	'update:modelValue': [value: number | null];
}>();

type CarouselHandle = {
	emblaApi?: {
		scrollNext: () => void;
		scrollPrev: () => void;
	};
};

const lightbox = useTemplateRef<HTMLDivElement>('lightbox');
const carousel = useTemplateRef<CarouselHandle>('carousel');
const defaultAspectRatio = 3 / 2;
const controlsIdleDelay = 2400;
const controlsVisible = ref(false);
let controlsFadeTimeout: ReturnType<typeof setTimeout> | undefined;
const currentImageDescription = computed(() => props.modelValue === null
	? undefined
	: props.images[props.modelValue]?.alt);
const modalContent = {
	onCloseAutoFocus: handleCloseAutoFocus,
};
const carouselButtonProps = {
	color: 'neutral',
	variant: 'solid',
	size: 'lg',
} as const;
const controlButtonClass = 'shadow-lg ring ring-default/60';
const controlVisibilityClass = computed(() => controlsVisible.value
	? 'opacity-100'
	: 'opacity-0');
const controlInteractivityClass = computed(() => controlsVisible.value
	? 'pointer-events-auto'
	: 'pointer-events-none');
const closeButtonClass = computed(() => [
	'absolute end-4 top-4 z-50 cursor-pointer rounded-full transition-opacity duration-500 ease-out',
	controlButtonClass,
	controlVisibilityClass.value,
	controlInteractivityClass.value,
]);
const carouselUi = computed(() => ({
	controls: `pointer-events-none absolute inset-0 z-40 transition-opacity duration-500 ease-out ${controlVisibilityClass.value}`,
	arrows: 'contents',
	prev: `sm:start-4 ${controlButtonClass} ${controlInteractivityClass.value}`,
	next: `sm:end-4 ${controlButtonClass} ${controlInteractivityClass.value}`,
	dots: `bottom-4 ${controlInteractivityClass.value}`,
	dot: 'size-2.5 bg-white/50 data-[state=active]:bg-white',
}));

watch(() => props.modelValue, async (value, previousValue) => {
	if (value === null) {
		clearControlsFadeTimeout();
		controlsVisible.value = false;
		return;
	}

	if (previousValue === null) {
		clearControlsFadeTimeout();
		controlsVisible.value = true;
		await nextTick();
		lightbox.value?.querySelector<HTMLElement>('[aria-roledescription="carousel"]')?.focus();
		scheduleControlsFade();
		return;
	}

	revealControls();
}, { flush: 'post' });

onBeforeUnmount(clearControlsFadeTimeout);

function close() {
	emit('update:modelValue', null);
}

function handleOpenChange(value: boolean) {
	if (!value) close();
}

function handleCloseAutoFocus(event: Event) {
	event.preventDefault();
}

function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape') {
		event.stopPropagation();
		close();
		return;
	}

	const scrollDirection = getKeyboardScrollDirection(event.key);
	if (!scrollDirection) return;

	revealControls();
	event.preventDefault();
	event.stopPropagation();
	if (scrollDirection === 'previous') {
		carousel.value?.emblaApi?.scrollPrev();
		return;
	}

	carousel.value?.emblaApi?.scrollNext();
}

function getKeyboardScrollDirection(key: string) {
	const isRtl = import.meta.client && document.documentElement.dir === 'rtl';

	if (key === 'ArrowLeft') return isRtl ? 'next' : 'previous';
	if (key === 'ArrowRight') return isRtl ? 'previous' : 'next';
	return undefined;
}

function getAspectRatio(image?: PhotographyImage) {
	if (!image?.width || !image.height) return defaultAspectRatio;
	return image.width / image.height;
}

function getMediaStyle(image?: PhotographyImage) {
	const aspectRatio = getAspectRatio(image);

	return {
		width: `min(100svw, ${aspectRatio * 100}svh)`,
		height: `min(100svh, ${(100 / aspectRatio)}svw)`,
	};
}

function clearControlsFadeTimeout() {
	if (!controlsFadeTimeout) return;
	clearTimeout(controlsFadeTimeout);
	controlsFadeTimeout = undefined;
}

function showControls() {
	clearControlsFadeTimeout();
	controlsVisible.value = true;
}

function revealControls() {
	showControls();
	scheduleControlsFade();
}

function scheduleControlsFade() {
	clearControlsFadeTimeout();
	controlsFadeTimeout = setTimeout(() => {
		controlsVisible.value = false;
	}, controlsIdleDelay);
}
</script>
