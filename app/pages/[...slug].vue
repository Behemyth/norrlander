<template>
	<DPage v-if="page">
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

const { data: page } = await useAsyncData(route.path, () => {
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
