<template>
	<footer :class="ui.root()">
		<UContainer :class="ui.top()">
			<slot name="top" />
		</UContainer>
		<UContainer :class="ui.container()">
			<div :class="ui.left()">
				<slot name="left" />
			</div>

			<div :class="ui.center()">
				<slot />
			</div>

			<div :class="ui.right()">
				<slot name="right" />
			</div>
		</UContainer>
		<UContainer :class="ui.bottom()">
			<slot name="bottom" />
		</UContainer>
	</footer>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';

const theme = tv({
	slots: {
		root: '',
		top: 'pt-4',
		bottom: 'pb-4',
		container: 'py-4 flex flex-wrap items-center justify-between gap-x-3',
		left: 'flex flex-1 items-center justify-center gap-x-1.5 order-1',
		center: 'flex items-center justify-center order-2',
		right: 'flex flex-1 items-center justify-center gap-x-1.5 order-3',
	},
});

export interface FooterProps {
	// The UI configuration overrides.
	ui?: PartialString<typeof theme.slots>;
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
const props = defineProps<FooterProps>();

defineSlots<FooterSlots>();

const ui = theme(props.ui);
</script>
