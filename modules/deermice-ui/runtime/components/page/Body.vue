<template>
	<div :class="theme.base()">
		<slot />
	</div>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: 'mt-8 pb-24 space-y-12',
	},
});

export interface PageBodySlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<PageBodySlots>();

const theme = baseTheme();
</script>
