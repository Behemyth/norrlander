<template>
	<ClientOnly>
		<UButton
			:icon="colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
			color="gray"
			variant="ghost"
			aria-label="Color Mode"
			@click="onClick"
		/>
		<template #fallback>
			<div class="w-8 h-8" />
		</template>
	</ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const onClick = () => {
	const values = ['light', 'dark'];
	const index = values.indexOf(colorMode.value);
	const next = (index + 1) % values.length;

	colorMode.preference = values[next]!;
};
</script>
