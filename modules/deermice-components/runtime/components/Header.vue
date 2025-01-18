<template>
	<header>
		<slot name="title" />
		<ULink
			:to="to"
			rel="author"
			class="text-nowrap p-4 text-xl md:text-4xl font-mono font-extrabold"
		> {{ title }}
		</ULink>
		<slot name="left" />
		<slot />
		<slot name="right" />
		<slot name="top" />
		<slot name="bottom" />
		<slot name="content" />
	</header>
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

export interface HeaderProps {
	title?: string;
	to?: string;
};

export interface HeaderSlots {
	title(props?: object): any;
	left(props?: object): any;
	default(props?: object): any;
	right(props?: object): any;
	top(props?: object): any;
	bottom(props?: object): any;
	content(props?: object): any;
}

const {
	title = 'TODO',
	to = '/',
}
	= defineProps<HeaderProps>();

defineSlots<HeaderSlots>();

const theme = tv({
	slots: {
		root: 'bg-[var(--ui-bg)]/75 backdrop-blur border-b border-[var(--ui-border)] sticky top-0 z-50',
		container: 'flex items-center justify-between gap-3 h-[var(--ui-header-height)]',
		left: 'lg:flex-1 flex items-center gap-1.5',
		center: 'hidden lg:flex',
		right: 'flex items-center justify-end lg:flex-1 gap-1.5',
		title: 'shrink-0 font-bold text-xl text-[var(--ui-text-highlighted)] flex items-end gap-1.5',
		toggle: 'lg:hidden',
		content: 'lg:hidden',
		overlay: 'lg:hidden',
		header: '',
		body: 'p-4 sm:p-6 overflow-y-auto',
	},
});

const ui = theme();
</script>
