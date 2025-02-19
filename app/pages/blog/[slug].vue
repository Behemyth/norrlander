<template>
	<DPage
		v-if="page"
		class="max-w-4xl mx-auto w-full"
	>
		<DPageBody>
			<article>
				<ContentRenderer
					:value="page"
				/>
			</article>
		</DPageBody>
	</DPage>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('blog').path(route.path).first();
});

definePageMeta({
	layout: 'content',
});

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>
