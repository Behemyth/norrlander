<template>
	<DPage v-if="page">
		<ContentRenderer
			:value="page.body"
		/>

		<template #left>
			<DPageAside>
				<DContentSectionList
					:toc="page.body.toc!"
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

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>
