<template>
	<div :class="theme.root({ class: ui?.root })">
		<ProseH4 :class="theme.title({ class: ui?.title })">
			{{ toc.title }}
		</ProseH4>
		<nav :class="theme.container({ class: ui?.container })">
			<ul :class="theme.list({ class: ui?.list })">
				<li
					v-for="section in toc.links"
					:key="section.id"
					@click="onClick(section.id)"
				>
					<ProseH4 :class="theme.link({ class: ui?.link })">
						{{ section.text }}
					</ProseH4>
					<ul>
						<li
							v-for="link in section.children"
							:key="link.id"
							@click.stop="onClick(link.id)"
						>
							<ProseH4 :class="theme.link({ class: ui?.link })">
								{{ link.text }}
							</ProseH4>
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
		root: '',
		container: `pt-4 sm:pt-6 pb-2.5 sm:pb-4.5 lg:py-8 border-b
			border-dashed border-[var(--ui-border)] lg:border-0 flex flex-col`,
		title: 'truncate',
		list: '',
		listWithChildren: 'ms-3',
		item: '',
		itemWithChildren: '',
		link: 'group text-sm block truncate focus-visible:outline-[var(--ui-primary)] py-1',
	},
	variants: {
		color: {
			primary: '',
			neutral: '',
		},
		active: {
			false: {
				link: [
					'text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]',
					'transition-colors',
				],
			},
		},
	},
	compoundVariants: [
		{
			color: 'primary',
			active: true,
			class: {
				link: 'text-[var(--ui-primary)]',
			},
		},
		{
			color: 'neutral',
			active: true,
			class: {
				link: 'text-[var(--ui-text-highlighted)]',
			},
		},
	],
	defaultVariants: {
		color: 'primary',
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
