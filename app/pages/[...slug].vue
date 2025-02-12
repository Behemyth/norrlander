<template>
	<DPage v-if="page">
		<DPageHeader v-bind="page">
			<template #headline>
				<UBreadcrumb :items="breadcrumb" />
			</template>
		</DPageHeader>

		<DPageBody>
			<ContentRenderer
				:value="page.body"
			/>
		</DPageBody>

		<template
			v-if="page.body.toc && page.body.toc.links.length"
			#left
		>
			<DPageAside>
				<DContentSectionList
					:toc="page.body.toc"
				/>
			</DPageAside>
		</template>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(() => {
	return queryCollection('content').path(route.path).first();
});

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('content'));

const breadcrumb = computed(() => mapContentBreadcrumbs(navigation?.value, route.path));

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>
