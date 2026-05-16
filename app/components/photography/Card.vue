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
			<NuxtImg
				:src="leadImage.src"
				:alt="leadImage.alt"
				sizes="100vw sm:50vw lg:320px"
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
