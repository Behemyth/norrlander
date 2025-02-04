<template>
	<h3
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
	</h3>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: [
			'text-xl text-[var(--ui-text-highlighted)]',
			'font-bold mt-8 mb-3',
			'scroll-mt-[calc(32px+45px+var(--ui-header-height))]',
			'lg:scroll-mt-[calc(32px+var(--ui-header-height))]',
			'[&>a]:focus-visible:outline-[var(--ui-primary)]',
			'[&>a>code]:border-dashed hover:[&>a>code]:border-[var(--ui-primary)]',
			'hover:[&>a>code]:text-[var(--ui-primary)]',
			'[&>a>code]:text-lg/6 [&>a>code]:font-bold',
			'[&>a>code]:transition-colors',
		],
		link: 'group lg:ps-2 lg:-ms-2',
	},
});

export interface ProseH3Props {
	id?: string;
};

export interface ProseH3Slots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<ProseH3Props>();
defineSlots<ProseH3Slots>();

const theme = baseTheme();
</script>
