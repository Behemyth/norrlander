<template>
	<h4
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
	</h4>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: [
			'text-lg text-[var(--ui-text-highlighted)]',
			'font-bold mt-6 mb-2',
			'scroll-mt-[calc(24px+45px+var(--ui-header-height))]',
			'lg:scroll-mt-[calc(24px+var(--ui-header-height))]',
			'[&>a]:focus-visible:outline-[var(--ui-primary)]',
		],
		link: '',
	},
});

export interface ProseH4Props {
	id?: string;
};

export interface ProseH4Slots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<ProseH4Props>();
defineSlots<ProseH4Slots>();

const theme = baseTheme();
</script>
