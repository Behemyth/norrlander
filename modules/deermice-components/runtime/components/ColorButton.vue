<template>
	<ClientOnly>
		<UButton
			:icon="colorMode.preference === 'dark' ? darkIcon : lightIcon"
			color="neutral"
			variant="ghost"
			aria-label="Color Toggle"
			size="lg"
			@click="onClick"
		/>
		<template #fallback>
			<slot
				name="fallback"
			>
				<UButton
					loading
					color="neutral"
					variant="ghost"
				/>
			</slot>
		</template>
	</ClientOnly>
</template>

<script lang="ts">
export interface ColorButtonProps {
	lightIcon: string;
	darkIcon: string;
};

export interface ColorButtonSlots {
	fallback(props?: object): any;
}
</script>

<script setup lang="ts">
const colorMode = useColorMode();
const onClick = () => {
	const values = ['light', 'dark'];
	const index = values.indexOf(colorMode.value);
	const next = (index + 1) % values.length;

	colorMode.preference = values[next]!;
};

defineProps<ColorButtonProps>();
defineSlots<ColorButtonSlots>();
</script>
