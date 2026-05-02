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
		<UModal
			:open="zoomed !== null"
			fullscreen
			:ui="{ content: 'bg-black/95', body: 'p-0 h-full' }"
			@update:open="(value) => { if (!value) zoomed = null; }"
		>
			<template #content>
				<div class="relative h-full w-full flex items-center justify-center">
					<UButton
						icon="i-lucide-x"
						color="neutral"
						variant="solid"
						size="lg"
						class="absolute top-4 right-4 z-10"
						:aria-label="$t('photography.closeFullSize')"
						@click="zoomed = null"
					/>
					<NuxtPicture
						v-if="zoomed"
						:src="zoomed.src"
						:alt="zoomed.alt"
						:img-attrs="{ class: 'max-w-full max-h-full w-auto h-auto object-contain' }"
					/>
				</div>
			</template>
		</UModal>
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

type PhotoImage = NonNullable<typeof page.value>['images'][number];
const zoomed = ref<PhotoImage | null>(null);
</script>
