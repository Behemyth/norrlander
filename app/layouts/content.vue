<template>
	<UContainer>
		<UBreadcrumb
			:items="breadcrumb"
			class="mb-6"
		/>
		<AppContentLanguageAlert />
		<slot />
	</UContainer>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: navigation } = useContentNavigation();

const breadcrumb = computed(() => findBreadcrumb(navigation?.value, route.path));
</script>
