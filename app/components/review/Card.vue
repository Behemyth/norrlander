<template>
	<DCard
		:title="title"
		reverse
		:to="path"
		class="flex grow"
	>
		<NuxtPicture
			:src="posterPath"
			loading="lazy"
			:placeholder="img(posterPath, { h: 10, blur: 2, q: 50 })"
			:img-attrs="{ class: 'aspect-[2/3] w-full h-full' }"
			class="flex grow"
		/>

		<template #description>
			<USeparator class="my-2" />
			<ReviewStarRating
				:value="rating"
				:size="18"
			/>
		</template>
	</DCard>
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
