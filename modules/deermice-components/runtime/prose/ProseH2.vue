<template>
	<h2
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
	</h2>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: [
			'text-2xl text-[var(--ui-text-highlighted)]',
			'font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))]',
			'lg:scroll-mt-[calc(48px+var(--ui-header-height))]',
			'[&>a]:focus-visible:outline-[var(--ui-primary)]',
			'[&>a>code]:border-dashed hover:[&>a>code]:border-[var(--ui-primary)]',
			'hover:[&>a>code]:text-[var(--ui-primary)] [&>a>code]:text-xl/7 [&>a>code]:font-bold',
			'[&>a>code]:transition-colors',
		],
		link: 'group lg:ps-2 lg:-ms-2',
	},
});

export interface ProseH2Props {
	id?: string;
};

export interface ProseH2Slots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<ProseH2Props>();
defineSlots<ProseH2Slots>();

const theme = baseTheme();
</script>
