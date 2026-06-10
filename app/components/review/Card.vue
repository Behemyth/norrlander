<template>
	<NuxtLink
		:to="path"
		class="group flex flex-col gap-2"
	>
		<div
			class="relative aspect-2/3 overflow-hidden rounded-sm"
			:style="{ viewTransitionName: `review-poster${path.replaceAll('/', '-')}` }"
		>
			<!-- Workaround for nuxt/image#1433: every vw entry needs a breakpoint prefix
				(no bare values, and no xs: — it's not in the default screens).
				Grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-6. -->
			<NuxtImg
				:src="posterPath"
				:placeholder="img(posterPath, { height: 10, blur: 2, quality: 50 })"
				sizes="sm:50vw md:33vw lg:16vw"
				class="h-full w-full object-cover"
				loading="lazy"
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
