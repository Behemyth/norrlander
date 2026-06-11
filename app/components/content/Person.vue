<template>
	<ULink
		:to="personLink"
		class="font-medium text-highlighted hover:text-primary transition-colors"
	>
		<slot>{{ name }}</slot>
	</ULink>
</template>

<script setup lang="ts">
const props = defineProps<{
	name: string;
	category?: 'movie' | 'show';
}>();

const route = useRoute();

const reviewCategory = computed(() => {
	if (props.category) return props.category;
	return route.path.startsWith('/review/show') ? 'show' : 'movie';
});

const personLink = computed(() => ({
	path: `/review/${reviewCategory.value}`,
	query: { person: personFilterValue(props.name) },
}));
</script>
