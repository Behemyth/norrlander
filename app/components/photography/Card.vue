<template>
	<UPageCard
		:title="photo.title"
		:description="photo.description"
		:to="photo.path"
		variant="outline"
	>
		<div
			v-if="leadImage"
			class="relative aspect-3/2 w-full overflow-hidden rounded-md bg-elevated"
			:style="{ viewTransitionName: `photo${photo.path.replaceAll('/', '-')}` }"
		>
			<!-- Workaround for nuxt/image#1433: every vw entry needs a breakpoint prefix
				(no bare values, and no xs: — it's not in the default screens). -->
			<NuxtImg
				:src="leadImage.src"
				:alt="leadImage.alt"
				sizes="sm:100vw md:50vw lg:320px"
				loading="lazy"
				class="h-full w-full object-cover"
			/>
		</div>
	</UPageCard>
</template>

<script setup lang="ts">
import type { PhotographyCollectionItem } from '@nuxt/content';

const props = defineProps<{
	photo: PhotographyCollectionItem;
}>();

const leadImage = computed(() => props.photo.images?.[0]);
</script>
