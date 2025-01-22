<template>
	<div
		:class="theme.root({ class: ui?.root })"
	>
		<div
			v-if="leftEnabled"
			:class="theme.left({ class: ui?.left })"
		>
			<slot name="left" />
		</div>
		<div :class="theme.center({ class: ui?.center })">
			<slot />
		</div>
		<div
			v-if="rightEnabled"
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
	default(props?: object): any;
	left(props?: object): any;
	right(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<PageProps>();
const slots = defineSlots<PageSlots>();

const rightEnabled = computed(() => !!slots.right);
const leftEnabled = computed(() => !!slots.left);

const theme = computed(() => baseTheme({
	right: rightEnabled.value, left: leftEnabled.value,
}));
</script>
