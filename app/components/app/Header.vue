<template>
	<UHeader
		:title="$t('header.title')"
		:ui="{
			title: 'text-nowrap font-mono text-2xl md:text-3xl',
		}"
		:content-toggle="{ icon: 'i-mdi-hamburger-menu', size: 'lg' }"
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
		<template #content>
			<UNavigationMenu
				orientation="vertical"
				color="neutral"
				variant="link"
				:items="items"
			/>
		</template>
	</UHeader>
</template>

<script setup lang="ts">
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

function translateNavItems(navItems: ReturnType<typeof mapContentNavigation>): ReturnType<typeof mapContentNavigation> {
	return navItems.map(item => ({
		...item,
		label: item.label && navLabelMap[item.label] ? t(navLabelMap[item.label]!) : item.label,
		children: Array.isArray(item.children) && item.children.length ? translateNavItems(item.children) : item.children,
	}));
}

const { data: navigation } = await useContentNavigation();

const items = computed(() =>
	translateNavItems(mapContentNavigation(navigation?.value ?? [])),
);
</script>
