<template>
	<header :class="ui.root()">
		<div
			:class="ui.container()"
		>
			<slot
				name="left"
				:class="ui.left()"
			/>
			<ULink
				:to="to"
				rel="author"
			>
				<slot
					name="title"
				>
					<h1 :class="ui.title()">{{ title }} </h1>
				</slot>
			</ULink>
			<slot />
			<div
				:class="ui.center()"
			/>
			<slot
				name="right"
				:class="ui.right()"
			/>
			<div />
		</div>
		<slot
			name="content"
			:class="ui.content()"
		>
			<slot
				name="content"
				:class="ui.content()"
			/>
		</slot>
	</header>
</template>

<script lang="ts">
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const theme = tv({
	slots: {
		root: 'bg-[var(--ui-bg)]/75 backdrop-blur border-b border-[var(--ui-border)] sticky top-0 z-50',
		container: 'flex items-center justify-between gap-3 h-[var(--ui-header-height)]',
		left: 'lg:flex-1 flex items-center gap-1.5',
		center: 'hidden lg:flex',
		right: 'flex items-center justify-end lg:flex-1 gap-1.5',
		title: 'shrink-0 font-bold text-xl text-[var(--ui-text-highlighted)] flex items-end gap-1.5',
		content: 'lg:hidden',
		body: 'p-4 sm:p-6 overflow-y-auto',
	},
});

export interface HeaderProps {
	title?: string;
	to?: string;
	ui?: PartialString<typeof theme.slots>;
};

export interface HeaderSlots {
	title(props?: object): any;
	left(props?: object): any;
	default(props?: object): any;
	right(props?: object): any;
	content(props?: object): any;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<HeaderProps>(), {
	title: 'Your Title',
	to: '/',
});

defineSlots<HeaderSlots>();

const ui = theme(props.ui);
</script>
