<template>
	<div class="not-prose relative w-16 aspect-[9/2]">
		<UIcon
			v-for="index in fullStars"
			:key="index"
			name="i-mdi-star"
			:size="props.size.toString()"
			aria-hidden="true"
		/>
		<UIcon
			v-for="index in halfStars"
			:key="index"
			name="i-mdi-star-half-full"
			:size="props.size.toString()"
			aria-hidden="true"
		/>
		<UIcon
			v-for="index in noStars"
			:key="index"
			name="i-mdi-star-outline"
			:size="props.size.toString()"
			aria-hidden="true"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	value: {
		type: Number,
		default: 0,
	},
	size: {
		type: Number,
		required: true,
	},
});

const fullStars = computed(() => (
	Math.floor(props.value / 2)
));

const halfStars = computed(() => (
	props.value % 2
));

const noStars = computed(() => (
	4 - fullStars.value - halfStars.value
));
</script>
