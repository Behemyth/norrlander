<template>
	<UPageSection
		:title="sectionTitle"
		:description="sectionDescription"
	/>
</template>

<script setup lang="ts">
const props = defineProps<{
	collection: 'blog' | 'photography';
	title?: string;
}>();

const { t } = useI18n();

const { data: total } = await useAsyncData(`content-section-${props.collection}`, () =>
	queryCollection(props.collection).count(),
);

const sectionTitle = computed(() => {
	if (props.title) {
		return props.title;
	}

	return props.collection === 'blog'
		? t('contentSection.blogTitle')
		: t('contentSection.photographyTitle');
});

const sectionDescription = computed(() =>
	t('contentSection.publishedPosts', total.value ?? 0),
);
</script>
