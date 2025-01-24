<template>
	<footer :class="theme.root({ class: ui?.root })">
		<UContainer :class="theme.top({ class: ui?.top })">
			<slot name="top" />
		</UContainer>
		<UContainer :class="theme.container({ class: ui?.container })">
			<div :class="theme.left()">
				<slot name="left" />
			</div>

			<div :class="theme.center({ class: ui?.center })">
				<slot />
			</div>

			<div :class="theme.right({ class: ui?.right })">
				<slot name="right" />
			</div>
		</UContainer>
		<UContainer :class="theme.bottom({ class: ui?.bottom })">
			<slot name="bottom" />
		</UContainer>
	</footer>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';

const baseTheme = tv({
	slots: {
		root: '',
		top: 'py-4',
		bottom: 'py-4',
		container: 'py-4 flex flex-wrap items-center justify-around gap-x-3 border-y border-[var(--ui-border)]',
		left: 'flex items-center gap-x-1.5 order-1',
		center: 'flex items-center order-2',
		right: 'flex items-center gap-x-1.5 order-3',
	},
});

export interface FooterProps {
	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
};

export interface FooterSlots {
	left(props?: object): any;
	default(props?: object): any;
	right(props?: object): any;
	top(props?: object): any;
	bottom(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<FooterProps>();

defineSlots<FooterSlots>();

const theme = baseTheme();
</script>
