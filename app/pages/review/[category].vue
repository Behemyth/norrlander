<template>
	<DPage>
		<DPageHeader />
		<DPageBody />
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

if (route.params.category !== 'movie' && route.params.category !== 'show') {
	throw createError('Invalid review category');
}
const category = computed(() => route.params.category as 'movie' | 'show');

const capitalizedCategory = computed(() => {
	return category.value.charAt(0).toUpperCase() + category.value.slice(1);
});

const title = computed(() => `${capitalizedCategory.value} Reviews`);

useSeoMeta({
	title: title,
});
</script>
