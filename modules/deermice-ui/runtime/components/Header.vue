<template>
	<div :class="theme.root({ class: ui?.root })">
		<header :class="theme.header({ class: ui?.header })">
			<UContainer :class="theme.container({ class: ui?.container })">
				<div :class="theme.left({ class: ui?.left })">
					<slot name="left" />
					<ULink
						:to="to"
						:class="theme.title({ class: ui?.title })"
					>
						<slot name="title">
							{{ title }}
						</slot>
					</ULink>
				</div>
				<div :class="theme.center({ class: ui?.center })">
					<slot />
				</div>
				<div :class="theme.right({ class: ui?.right })">
					<slot name="right" />
					<UButton
						color="neutral"
						variant="ghost"
						:class="theme.contentToggle({ class: ui?.contentToggle })"
						v-bind="contentToggle"
						@click="open = true"
					/>
				</div>
			</UContainer>
		</header>
		<UModal
			v-model:open="open"
			:class="theme.content({ class: ui?.content })"
		>
			<template #title>
				<ULink
					:to="to"
					:class="theme.title({ class: ui?.title })"
					@click="open = false"
				>
					<slot name="title">
						{{ title }}
					</slot>
				</ULink>
			</template>
			<template #body>
				<div :class="theme.contentBody({ class: ui?.contentBody })">
					<slot name="content" />
				</div>
			</template>
		</UModal>
	</div>
</template>

<script lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		// Root of the component
		root: 'bg-[var(--ui-bg)]/75 backdrop-blur sticky top-0 z-50',

		// HTML header element. Wraps the container but not the content
		header: '',

		// Container for the header, constraining the width
		container: 'flex items-center justify-between gap-3 h-[var(--ui-header-height)] border-b border-[var(--ui-border)]',

		// The left side of the header containing the wrapping link and title
		left: 'md:flex-1 flex items-center gap-1.5',

		// Title of the website
		title: 'shrink-0 font-bold text-xl md:text-2xl text-[var(--ui-text-highlighted)] flex items-end gap-1.5',

		// Center of the header, typically used for navigation when available on a larger screen
		center: 'hidden md:flex',

		// Right side of the header, typically used for actions
		right: 'flex items-center justify-end md:flex-1 gap-1.5',

		// The attributes of the toggle button used to show the content
		contentToggle: 'md:hidden',

		// Body slot for the underlying `model`
		contentBody: 'p-4 sm:p-6 overflow-y-auto',

		// The content shown within the 'modal' component on smaller screens
		content: 'md:hidden',
	},
});

export interface HeaderProps {
	// The title of the website to be displayed.
	title?: string;

	// The link to navigate to when the '#left' slot is clicked.
	to?: string;

	// The attributes of the toggle button used to show the content.
	contentToggle: ButtonProps;

	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
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
const open = ref(false);
const router = useRouter();

// Close the `modal` when the route changes
router.afterEach(() => {
	open.value = false;
});

withDefaults(defineProps<HeaderProps>(), {
	title: 'Your Title',
	to: '/',
});

defineSlots<HeaderSlots>();

const theme = baseTheme();
</script>
