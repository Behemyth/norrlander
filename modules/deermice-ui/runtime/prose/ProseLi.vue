<template>
	<li
		:class="theme.base()"
	>
		<slot />
	</li>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: 'my-1.5 ps-1.5 leading-7 [&>ul]:my-0',
	},
});

export interface ProseLiSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<ProseLiSlots>();

const theme = baseTheme();
</script>
