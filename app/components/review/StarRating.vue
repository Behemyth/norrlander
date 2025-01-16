<template>
	<div class="flex flex-row relative">
		<UIcon
			v-for="index in fullStars"
			:key="index"
			name="i-mdi-star"
			:size="props.size.toString()"
			aria-hidden="true"
			color="neutral"
			variant="ghost"
		/>
		<UIcon
			v-for="index in halfStars"
			:key="index"
			name="i-mdi-star-half-full"
			:size="props.size.toString()"
			aria-hidden="true"
			color="neutral"
			variant="ghost"
		/>
		<UIcon
			v-for="index in noStars"
			:key="index"
			name="i-mdi-star-outline"
			:size="props.size.toString()"
			aria-hidden="true"
			color="neutral"
			variant="ghost"
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
