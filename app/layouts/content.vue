<template>
	<UContainer>
		<UPage>
			<UPageHeader v-bind="route">
				<template #headline>
					<UBreadcrumb :items="breadcrumb" />
				</template>
			</UPageHeader>
			<slot />
		</UPage>
	</UContainer>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

const route = useRoute();
const { data: navigation } = useContentNavigation();

const breadcrumb = computed(() => {
	const nav = navigation?.value as ContentNavigationItem[] | undefined;
	if (!nav) return [];
	// findPageBreadcrumb expects (navigation, currentPath, options?)
	const chain = findPageBreadcrumb(nav, route.path, { indexAsChild: true });
	// mapContentNavigation transforms to objects with icon + label + to; we then strip icon for UBreadcrumb items
	const items = mapContentNavigation(chain).map(({ icon, ...link }: any) => link);
	items.unshift({ label: 'Home', to: '/' });
	return items;
});
</script>
