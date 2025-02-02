<template>
	<main :class="ui.root()">
		<ProseH3 :class="ui.statusCode()">
			{{ error.statusCode }}
		</ProseH3>
		<ProseH1 :class="ui.statusMessage()">
			{{ error.message }}
		</ProseH1>
		<UButton
			label="Home"
			:to="redirect"
			color="neutral"
		/>
	</main>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { NuxtError } from '#app';

const theme = tv({
	slots: {
		root: 'flex flex-col grow items-center justify-center text-center',
		statusCode: 'text-base font-semibold text-[var(--ui-primary)]',
		statusMessage: 'mt-2 text-4xl sm:text-5xl font-bold text-[var(--ui-text-highlighted)] text-balance',
	},
});
export interface ErrorProps {
	error: Partial<NuxtError<unknown> & { message: string }>;
	redirect?: string;
};

export interface ErrorSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ErrorProps>(), {
	redirect: '/',
});

defineSlots<ErrorSlots>();

const ui = theme();
</script>
