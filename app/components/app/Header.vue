<template>
	<UHeader
		:title="$t('header.title')"
		mode="drawer"
		:menu="{ inset: true, title: $t('header.title'), description: '' }"
		:ui="{
			title: 'text-nowrap font-mono text-2xl md:text-3xl',
		}"
		:toggle="{ icon: 'i-mdi-hamburger-menu', size: 'lg' }"
		class="mb-2"
	>
		<UNavigationMenu
			content-orientation="vertical"
			color="neutral"
			variant="link"
			:items="items"
		/>
		<template #right>
			<AppSearch />
			<UColorModeButton>
				<template #fallback>
					<UButton
						loading
						variant="ghost"
						color="neutral"
					/>
				</template>
			</UColorModeButton>
		</template>
		<template #body>
			<UContentNavigation
				:navigation="translatedNavigation"
				color="neutral"
				variant="pill"
				highlight
				:ui="{
					list: '-mx-1',
					link: 'min-h-12 px-3 py-3 text-base',
					trigger: 'min-h-12',
					linkTitle: 'text-base whitespace-normal',
					listWithChildren: 'ms-4 border-s border-default',
				}"
			/>
		</template>
	</UHeader>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

const { t } = useI18n();

const navLabelMap: Record<string, string> = {
	'Blog': 'nav.blog',
	'Photography': 'nav.photography',
	'Portfolio': 'nav.portfolio',
	'Reviews': 'nav.reviews',
	'Movie Reviews': 'nav.movieReviews',
	'Show Reviews': 'nav.showReviews',
};

function translateContentNavigation(navItems: ContentNavigationItem[]): ContentNavigationItem[] {
	return navItems.map(item => ({
		...item,
		title: navLabelMap[item.title] ? t(navLabelMap[item.title]!) : item.title,
		children: Array.isArray(item.children) && item.children.length ? translateContentNavigation(item.children) : item.children,
	}));
}

const { data: navigation } = await useContentNavigation();

const translatedNavigation = computed(() =>
	translateContentNavigation(navigation.value ?? []),
);

const items = computed(() =>
	mapContentNavigation(translatedNavigation.value),
);
</script>
