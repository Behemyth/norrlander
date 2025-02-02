<template>
	<div :class="theme.root({ class: ui?.root })">
		<ProseH4 :class="theme.title({ class: ui?.title })">
			{{ toc.title }}
		</ProseH4>
		<nav :class="theme.container({ class: ui?.container })">
			<ul>
				<li
					v-for="section in toc.links"
					:key="section.id"
					@click="onClick(section.id)"
				>
					<ProseH4>{{ section.text }}</ProseH4>
					<ul>
						<li
							v-for="link in section.children"
							:key="link.id"
						>
							<ProseH4>{{ link.text }}</ProseH4>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<slot />
	</div>
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
		title: 'truncate',
	},
});

export interface ContentSectionListProps {
	toc: Toc;

	// The UI configuration overrides.
	ui?: PartialString<typeof baseTheme.slots>;
}
export interface ContentSectionListSlots {
	default(props?: object): any;
}
</script>

<script setup lang="ts">
const router = useRouter();

const onClick = (id: string) => {
	console.log('onClick', id);
	const element = document.getElementById(id);
	if (element) {
		router.push({ hash: `#${id}` });
		element.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
};

defineProps<ContentSectionListProps>();
defineSlots<ContentSectionListSlots>();

const theme = baseTheme();
</script>
