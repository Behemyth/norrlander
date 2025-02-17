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

export interface CardProps {
	description?: string;
}

export interface CardSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<CardProps>();
defineSlots<CardSlots>();

const theme = baseTheme();
</script>
