<template>
	<UModal
		:open="modelValue !== null"
		fullscreen
		:ui="{ content: 'bg-black/95', body: 'p-0 h-full' }"
		@update:open="(value) => { if (!value) emit('update:modelValue', null); }"
	>
		<template #content>
			<div
				class="relative h-full w-full flex items-center justify-center cursor-zoom-out"
				@click.self="emit('update:modelValue', null)"
			>
				<UButton
					icon="i-lucide-x"
					color="neutral"
					variant="solid"
					size="lg"
					class="absolute top-4 right-4 z-10 cursor-pointer"
					:aria-label="$t('photography.closeFullSize')"
					@click="emit('update:modelValue', null)"
				/>
				<NuxtImg
					v-if="modelValue"
					:src="modelValue.src"
					:alt="modelValue.alt"
					preset="fullscreen"
					class="max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-out"
					@click="emit('update:modelValue', null)"
				/>
			</div>
		</template>
	</UModal>
</template>

<script lang="ts" setup>
import type { PhotographyImage } from '~~/shared/types/content';

defineProps<{
	modelValue: PhotographyImage | null;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: PhotographyImage | null];
}>();
</script>
