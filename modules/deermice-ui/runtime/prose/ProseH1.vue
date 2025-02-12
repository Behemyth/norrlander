<template>
	<h1
		:id="id"
		:class="theme.base()"
	>
		<a
			v-if="id"
			:href="`#${id}`"
			:class="theme.link()"
		>
			<slot />
		</a>
		<slot v-else />
	</h1>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: [
			'text-4xl',
			'text-[var(--ui-text-highlighted)]',
			'font-bold',
			'mb-8',
			'scroll-mt-[calc(45px+var(--ui-header-height))]',
			'lg:scroll-mt-[var(--ui-header-height)]',
		],
		link: 'inline-flex items-center gap-2',
	},
});

export interface ProseH1Props {
	id?: string;
};

export interface ProseH1Slots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<ProseH1Props>();
defineSlots<ProseH1Slots>();

const theme = baseTheme();
</script>
