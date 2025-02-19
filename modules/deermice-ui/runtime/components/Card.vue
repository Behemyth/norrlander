<template>
	<div :class="theme.root({ class: ui?.root })">
		<div :class="theme.container({ class: ui?.container })">
			<div :class="theme.header({ class: ui?.header })">
				<slot name="title">
					<p :class="theme.title({ class: ui?.title })">
						{{ title }}
					</p>
				</slot>
				<slot name="description">
					<p :class="theme.description({ class: ui?.description })">
						{{ description }}
					</p>
				</slot>
			</div>
			<div :class="theme.default({ class: ui?.default })">
				<slot />
			</div>
		</div>
		<div
			v-if="!!$slots.footer"
			:class="theme.footer({ class: ui?.footer })"
		>
			<slot name="footer" />
		</div>
		<NuxtLink
			v-if="to"
			:to="to"
		>
			<span
				class="absolute inset-0"
			/>
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from 'vue-router';

const baseTheme = tv({
	slots: {
		root: 'relative group flex bg-(--ui-bg) ring ring-(--ui-border) divide-y divide-(--ui-border)',
		container: 'relative flex flex-col flex-1 lg:grid gap-2 p-2',
		header: 'mb-2',
		default: '',
		footer: 'mt-2',
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
				header: 'order-last',
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
	orientation?: 'vertical' | 'horizontal';
	reverse?: boolean;
	to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
	ui?: PartialString<typeof baseTheme.slots>;
}

export interface CardSlots {
	title(props?: object): any;
	description(props?: object): any;
	default(props?: object): any;
	footer(props?: object): any;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<CardProps>(),
	{
		orientation: 'vertical',
		reverse: false,
	},
);
defineSlots<CardSlots>();

const theme = baseTheme({
	orientation: props.orientation,
	reverse: props.reverse,
	title: !!props.title,
});
</script>
