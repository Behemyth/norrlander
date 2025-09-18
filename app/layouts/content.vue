<template>
	<UContainer>
		<UPage>
			<UPageHeader v-bind="route">
				<template #headline>
					<UBreadcrumb :items="breadcrumb" />
				</template>
			</UPageHeader>
			<div :class="{ 'max-w-4xl mx-auto w-full': !tocLinks || !tocLinks.length }">
				<slot />
			</div>
			<template
				v-if="tocLinks && tocLinks.length"
				#left
			>
				<UPageAside>
					<UContentToc
						title="Contents"
						highlight
						highlight-color="neutral"
						color="neutral"
						:links="tocLinks"
					/>
				</UPageAside>
			</template>
		</UPage>
	</UContainer>
</template>

<script setup lang="ts">
import { findPageBreadcrumb } from '@nuxt/content/utils';
import { mapContentNavigation } from '@nuxt/ui/utils/content';

interface Props {
	tocLinks?: Array<any>;
}

defineProps<Props>();

const route = useRoute();
const { data: navigation } = useContentNavigation();

const breadcrumb = computed(() => {
	const chain = findPageBreadcrumb(navigation?.value, route.path, { indexAsChild: true });
	const items = mapContentNavigation(chain).map(({ icon, ...link }: any) => link);
	items.unshift({ label: 'Home', to: '/' });
	return items;
});
</script>
