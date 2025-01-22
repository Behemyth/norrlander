<template>
	<nav :class="theme.root({ class: ui?.root })">
		<p>{{ title }}</p>
		<div :class="theme.container({ class: ui?.container })">
			<ul>
				<li
					v-for="section in toc.links"
					:key="section.id"
				>
					<p>{{ section.id }}</p>
					<ul>
						<li
							v-for="link in section.children"
							:key="link.id"
						>
							<p>{{ link.id }}</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<slot />
	</nav>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants';
import type { PartialString } from '@nuxt/ui/runtime/types/utils.js';
import type { Toc } from '@nuxt/content';

const baseTheme = tv({
	slots: {
		root: `sticky top-[calc(var(--ui-header-height)+1px)]
			bg-[var(--ui-bg)]/75 backdrop-blur -mx-4 px-4 sm:px-6 sm:-mx-6
		 	overflow-y-auto max-h-[calc(100vh-var(--ui-header-height))]`,
		container: `pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b
			border-dashed border-[var(--ui-border)] lg:border-0 flex flex-col`,
	},
});

export interface ContentSectionListProps {

	title?: string;

	toc: Toc;

	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
}
export interface ContentSectionListSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
defineProps<ContentSectionListProps>();
defineSlots<ContentSectionListSlots>();

const theme = baseTheme();
</script>
