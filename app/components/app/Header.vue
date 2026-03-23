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
	Blog: 'nav.blog',
	Photography: 'nav.photography',
	Portfolio: 'nav.portfolio',
	Reviews: 'nav.reviews',
};

const { data: navigation } = await useContentNavigation();

const items = computed(() =>
	mapContentNavigation(navigation?.value ?? []).map(item => ({
		...item,
		label: navLabelMap[item.label] ? t(navLabelMap[item.label]) : item.label,
	})),
);
</script>
