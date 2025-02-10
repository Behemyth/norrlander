<template>
	<div
		v-if="renderTop || renderDefault || renderBottom"
		:class="theme.root({ class: ui?.root })"
	>
		<slot
			name="top"
		/>
		<slot />
		<slot
			name="bottom"
		/>
	</div>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';

const baseTheme = tv({
	slots: {
		root: [
			'hidden overflow-y-auto lg:block',
			'lg:max-h-[calc(100vh-var(--ui-header-height))]',
			'lg:sticky lg:top-[var(--ui-header-height)]',
			'py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5',
		],
	},
});

export interface PageAsideProps {
	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
}
export interface PageAsideSlots {
	top(props?: object): any;
	default(props?: object): any;
	bottom(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<PageAsideProps>();
const slots = defineSlots<PageAsideSlots>();

const renderTop = computed(() => !!slots.top);
const renderDefault = computed(() => !!slots.default);
const renderBottom = computed(() => !!slots.bottom);

console.log('slots', slots);

const theme = baseTheme();
</script>
