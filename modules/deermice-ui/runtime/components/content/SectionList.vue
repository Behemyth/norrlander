<template>
	<div
		v-if="toc.title || toc.links.length"
		:class="theme.root({ class: ui?.root })"
	>
		<p
			v-if="toc.title"
			:class="theme.title({ class: ui?.title })"
		>
			{{ toc.title }}
		</p>
		<nav
			v-if="toc.links.length"
			:class="theme.container({ class: ui?.container })"
		>
			<div :class="theme.list({ class: ui?.list })">
				<div
					v-for="section in toc.links"
					:key="section.id"
					@click="onClick(section.id)"
				>
					<ULink :class="theme.link({ class: ui?.link })">
						{{ section.text }}
					</ULink>

					<div :class="theme.subList({ class: ui?.subList })">
						<ULink
							v-for="link in section.children"
							:key="link.id"
							:class="theme.link({ class: ui?.link })"
							@click.stop="onClick(link.id)"
						>
							{{ link.text }}
						</ULink>
					</div>
				</div>
			</div>
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
		root: [
			'sticky top-[calc(var(--ui-header-height)+1px)] bg-[var(--ui-bg)]/75',
			'backdrop-blur px-2 overflow-y-auto',
			'max-h-[calc(100vh-var(--ui-header-height))]',
		],
		container: 'py-2 flex flex-col',
		title: 'truncate',
		list: '',
		subList: 'ms-3',
		link: 'group text-sm block truncate cursor-pointer focus-visible:outline-[var(--ui-primary)] py-1',
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
