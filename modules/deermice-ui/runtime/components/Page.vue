<template>
	<div
		:class="theme.root({ class: ui?.root })"
	>
		<div
			v-if="!!$slots.left"
			:class="theme.left({ class: ui?.left })"
		>
			<slot name="left" />
		</div>
		<div :class="theme.center({ class: ui?.center })">
			<slot />
		</div>
		<div
			v-if="!!$slots.right"
			:class="theme.right({ class: ui?.right })"
		>
			<slot name="right" />
		</div>
	</div>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';

const baseTheme = tv({
	slots: {
		root: 'flex flex-row grow',
		left: 'hidden lg:inline lg:w-1/5',
		center: 'flex flex-col grow lg:w-4/5',
		right: 'hidden lg:inline lg:w-1/5',
	},
	variants: {
		left: {
			true: '',
		},
		right: {
			true: '',
		},
	},
	compoundVariants: [
		{
			left: true,
			right: true,
			class: {
				center: 'lg:w-3/5',
			},
		},
		{
			left: false,
			right: false,
			class: {
				center: 'lg:w-full',
			},
		},
	],
});
export interface PageProps {
	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
}
export interface PageSlots {
	left(props?: object): any;
	default(props?: object): any;
	right(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<PageProps>();
const slots = defineSlots<PageSlots>();

const theme = computed(() => baseTheme({
	left: Boolean(slots.left), right: Boolean(slots.right),
}));
</script>
