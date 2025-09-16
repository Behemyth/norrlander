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
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

const route = useRoute();
const { data: navigation } = useContentNavigation();

const breadcrumb = computed(() => {
	const chain = findPageBreadcrumb(navigation?.value, route.path, { indexAsChild: true });
	const items = mapContentNavigation(chain).map(({ icon, ...link }: any) => link);
	items.unshift({ label: 'Home', to: '/' });
	return items;
});
</script>
