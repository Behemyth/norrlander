<template>
	<main>
		<h3>{{ error.statusCode }}</h3>
		<h1>{{ error.message }}</h1>
		<UButton
			label="Home"
			:to="redirect"
			color="neutral"
		/>
	</main>
</template>

<script lang="ts">
import type { NuxtError } from '#app';

export interface ErrorProps {
	error: Partial<NuxtError<unknown> & { message: string }>;
	redirect?: string;
};

export interface ErrorSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
const {
	redirect = '/',
}
	= defineProps<ErrorProps>();

defineSlots<ErrorSlots>();
</script>
