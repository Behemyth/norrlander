<template>
	<ULink
		:to="path"
		:title="title"
		class="flex grow"
	>
		<UCard
			:ui="
				{
					root: 'rounded-none',
					body: 'p-0 sm:p-0',
					footer: 'flex flex-col grow',
				}"
			class="flex flex-col w-full"
		>

			<NuxtPicture
				:src="posterPath"
				loading="lazy"
				:placeholder="img(posterPath, { h: 10, blur: 2, q: 50 })"
				:img-attrs="{ class: 'aspect-[2/3] w-full h-full' }"
			/>

			<template #footer>
				<ProseH4
					class="font-bold tracking-tighter grow"
				>{{ title }}</ProseH4>

				<USeparator class="my-2" />
				<ReviewStarRating
					:value="rating"
					:size="18"
				/>

			</template>
		</UCard>

	</ULink>
</template>

<script setup lang="ts">
const img = useImage();

defineProps({
	title: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	posterPath: {
		type: String,
		required: true,
	},
});
</script>
