<template>
	<div
		v-if="!!$slots.headline || !!$slots.default"
		:class="theme.root({ class: ui?.root })"
	>
		<div :class="theme.container({ class: ui?.container })">
			<slot
				v-if="!!$slots.headline"
				name="headline"
				:class="theme.headline()"
			/>
			<div
				v-if="!!$slots.default"
				:class="theme.wrapper({ class: ui?.wrapper })"
			>
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		root: 'relative border-b border-(--ui-border) py-4',
		container: '',
		wrapper: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4',
		headline: 'mb-2 text-sm font-semibold text-(--ui-primary) flex items-center gap-2',
	},
});

export interface PageHeaderProps {
	headline?: string;
	ui?: PartialString<typeof baseTheme.slots>;
}

export interface PageHeaderSlots {
	headline(props?: object): any;
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<PageHeaderProps>();
defineSlots<PageHeaderSlots>();

const theme = baseTheme();
</script>
