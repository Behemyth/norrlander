<template>
	<main :class="ui.root()">
		<slot />
	</main>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const theme = tv({
	slots: {
		root: '',
	},
});

export interface MainSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineSlots<MainSlots>();

const ui = theme();
</script>
