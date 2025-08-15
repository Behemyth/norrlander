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
const route = useRoute();

// Don't await in wrapper/layout
const { data: navigation } = useContentNavigation();

// The content sub-category is not a part of the page navigation query. As a result we only add the navigational
//	breadcrumbs. For example '/review/movie' instead of '/review/movie/<movie>'.
const breadcrumb = computed(() => mapContentBreadcrumbs(navigation?.value, route.path));
</script>
