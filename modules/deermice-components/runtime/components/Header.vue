<template>
	<div
		:class="ui.root()"
	>
		<header :class="ui.header()">
			<UContainer
				:class="ui.container()"
			>
				<UContainer
					:class="ui.left()"
				>
					<slot
						name="left"
						:class="ui.left()"
					/>

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
				</UContainer>
				<UContainer
					:class="ui.center()"
				>
					<slot />
				</UContainer>
				<UContainer
					:class="ui.right()"
				>
					<slot
						name="right"
					/>
				</UContainer>
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
		// Root of the component
		root: 'bg-[var(--ui-bg)]/75 backdrop-blur border-b border-[var(--ui-border)] sticky top-0 z-50',

		// HTML header element. Wraps the container but not the content
		header: '',

		// Container for the header, constraining the width
		container: 'flex items-center justify-between gap-3 h-[var(--ui-header-height)]',

		// The left side of the header containing the wrapping link and title
		left: 'md:flex-1 flex items-center gap-1.5',

		// Title of the website
		title: 'shrink-0 font-bold text-xl md:text-2xl text-[var(--ui-text-highlighted)] flex items-end gap-1.5',

		// Center of the header, typically used for navigation when available on a larger screen
		center: 'hidden md:flex',

		// Right side of the header, typically used for actions
		right: 'flex items-center justify-end md:flex-1 gap-1.5',

		// The content shown within the 'modal' component on smaller screens
		content: 'md:hidden',
	},
});

export interface HeaderProps {
	// The title of the website to be displayed.
	title?: string;

	// The link to navigate to when the '#left' slot is clicked.
	to?: string;

	// The UI configuration overrides.
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
