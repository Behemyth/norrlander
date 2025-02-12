<template>
	<p
		:class="theme.base()"
	>
		<slot />
	</p>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: 'my-5 leading-7 text-pretty',
	},
});

export interface ProsePSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<ProsePSlots>();

const theme = baseTheme();
</script>
