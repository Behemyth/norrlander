<template>
	<UContainer>
		<DPage>
			<DPageHeader v-bind="route">
				<template #headline>
					<UBreadcrumb :items="breadcrumb" />
				</template>
			</DPageHeader>
			<slot />
		</DPage>
	</UContainer>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'));

// The content sub-category is not a part of the page navigation query. As a result we only add the navigational
//	breadcrumbs. For example '/review/movie' instead of '/review/movie/<movie>'.
const breadcrumb = computed(() => mapContentBreadcrumbs(navigation?.value, route.path));
</script>
