<template>
	<div :class="theme.root()">
		<slot />
	</div>
</template>

<script lang="ts">
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		root: 'relative group flex rounded-[calc(var(--ui-radius)*2)]',
		container: 'relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6',
		wrapper: '',
		header: 'mb-4',
		body: '',
		footer: 'mt-4',
		title: 'text-base text-pretty font-semibold text-(--ui-text-highlighted)',
		description: 'text-[15px] text-pretty',
	},
	variants: {
		orientation: {
			horizontal: {
				container: 'lg:grid-cols-2 lg:items-center',
			},
			vertical: {
				container: '',
			},
		},
		reverse: {
			true: {
				wrapper: 'lg:order-last',
			},
		},
		title: {
			true: {
				description: 'mt-1',
			},
		},
	},
});

export interface CardProps {
	title?: string;
	description?: string;
	orientation: 'vertical' | 'horizontal';
	reverse?: boolean;
	ui?: PartialString<typeof baseTheme.slots>;
}

export interface CardSlots {
	header(props?: object): any;
	body(props?: object): any;
	title(props?: object): any;
	description(props?: object): any;
	footer(props?: object): any;
	default(props?: object): any;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<CardProps>(),
	{
		orientation: 'vertical',
		reverse: false,
	},
);
defineSlots<CardSlots>();

const theme = baseTheme();
</script>
