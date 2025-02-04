<template>
	<NuxtLink
		:href="href"
		:target="target"
		:class="theme.base()"
	>
		<slot />
	</NuxtLink>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';

const baseTheme = tv({
	slots: {
		base: [
			'text-[var(--ui-primary)] border-b border-transparent',
			'hover:border-[var(--ui-primary)] font-medium',
			'focus-visible:outline-[var(--ui-primary)]',
			'[&>code]:border-dashed',
			'hover:[&>code]:border-[var(--ui-primary)]',
			'hover:[&>code]:text-[var(--ui-primary)]',
			'transition-colors [&>code]:transition-colors',
		],
	},
});

export interface ProseAProps {
	href: string;
	target?: string;
};

export interface ProseASlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ProseAProps>(),
	{
		href: '',
		target: undefined,
	},
);
defineSlots<ProseASlots>();

const theme = baseTheme();
</script>
