<template>
	<main :class="baseTheme()">
		<slot />
	</main>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	base: 'flex grow',
});

export interface MainSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<MainSlots>();
</script>
