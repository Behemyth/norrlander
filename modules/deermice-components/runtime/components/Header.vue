<template>
	<div
		:class="ui.root()"
	>
		<header :class="ui.header()">
			<UContainer
				:class="ui.container()"
			>
				<span
					:class="ui.left()"
				>
					<slot
						name="left"
						:class="ui.left()"
					/>
				</span>
				<ULink
					:to="to"
					:class="ui.title()"
				>
					<slot
						name="title"
					>
						{{ title }}
					</slot>
				</ULink>
				<span
					:class="ui.center()"
				>
					<slot />
				</span>
				<span
					:class="ui.right()"
				>
					<slot
						name="right"
					/>
				</span>
			</UContainer>
		</header>
		<slot
			name="content"
			:class="ui.content()"
		/>
	</div>
</template>

<script lang="ts">
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const theme = tv({
	slots: {
		header: '',
		root: 'bg-[var(--ui-bg)]/75 backdrop-blur border-b border-[var(--ui-border)] sticky top-0 z-50',
		container: 'flex items-center justify-between gap-3 h-[var(--ui-header-height)]',
		left: 'lg:flex-1 flex items-center gap-1.5',
		center: 'hidden lg:flex',
		right: 'flex items-center justify-end lg:flex-1 gap-1.5',
		title: 'shrink-0 font-bold text-xl text-[var(--ui-text-highlighted)] flex items-end gap-1.5',
		content: 'lg:hidden',
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
