<template>
	<ul
		:class="theme.base()"
	>
		<slot />
	</ul>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: 'list-disc ps-6 my-5 marker:text-[var(--ui-border-accented)]',
	},
});

export interface ProseUlSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<ProseUlSlots>();

const theme = baseTheme();
</script>
