<template>
	<Giscus
		id="comments"
		repo="Behemyth/norrlander"
		repo-id="R_kgDOGNxb4w"
		:category="props.category"
		category-id="DIC_kwDOGNxb484Chz_u"
		mapping="title"
		strict="1"
		reactions-enabled="1"
		emit-metadata="1"
		input-position="top"
		:theme="theme"
		lang="en"
		:term="discussionTerm"
	/>
</template>

<script setup lang="ts">
const Giscus = defineAsyncComponent(() => import('@giscus/vue'));

const colorMode = useColorMode();

const theme = computed(() => colorMode.preference === 'dark' ? 'dark' : 'light');

const props = defineProps({
	category: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		default: '',
	},
	seasonNumber: {
		type: Number,
		default: null,
	},
});

// Generate unique discussion term for seasonal reviews
const discussionTerm = computed(() => {
	if (props.title && props.seasonNumber) {
		return `${props.title} - Season ${props.seasonNumber}`;
	}
	return props.title || undefined;
});
</script>
