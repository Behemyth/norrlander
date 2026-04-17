<template>
	<NuxtLink
		:to="path"
		class="group flex flex-col gap-2"
	>
		<div
			class="relative aspect-2/3 overflow-hidden rounded-sm"
			:style="{ viewTransitionName: `review-poster${path.replaceAll('/', '-')}` }"
		>
			<NuxtImg
				:src="posterPath"
				loading="lazy"
				:placeholder="img(posterPath, { height: 10, blur: 2, quality: 50 })"
				sizes="50vw md:33vw lg:16vw"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
			<!-- Season badge for seasonal reviews -->
			<UBadge
				v-if="seasonNumber"
				variant="solid"
				size="xs"
				class="absolute top-2 right-2"
			>
				S{{ seasonNumber }}
			</UBadge>
		</div>

		<div class="flex flex-col gap-1">
			<p class="line-clamp-2 text-sm font-semibold text-highlighted">
				{{ title }}
			</p>
			<ReviewStarRating
				:value="rating"
				:size="14"
			/>
		</div>
	</NuxtLink>
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
	seasonNumber: {
		type: Number,
		default: undefined,
	},
});
</script>
