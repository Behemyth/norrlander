<template>
	<div :class="theme.root()">
		<div :class="theme.left()">
			<slot name="left" />
		</div>
		<div :class="theme.center()">
			<slot />
		</div>
		<div :class="theme.right()">
			<slot name="right" />
		</div>
	</div>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		root: 'flex flex-col lg:grid lg:grid-cols-10 lg:gap-10',
		left: 'lg:col-span-2',
		center: 'lg:col-span-8',
		right: 'lg:col-span-2 order-first lg:order-last',
	},
});

export interface PageSlots {
	default(props?: object): any;
	left(props?: object): any;
	right(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<PageSlots>();

const theme = baseTheme();
</script>
