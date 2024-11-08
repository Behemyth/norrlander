<template>
	<ULink
		:to="path" :title="title"
		class="not-prose w-full h-32 flex items-center bg-white border border-gray-200 rounded-lg shadow md:h-48 lg:h-64 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
		<NuxtPicture
			:src="`/tmdb/${data.poster_path}`" loading="lazy" :img-attrs="{ class: 'rounded-s-lg' }"
			class="aspect-[2/3] h-full" />


		<div class="flex flex-col justify-between p-4 leading-normal">
			<h5 class="prose dark:prose-invert mb-2 font-bold tracking-tight text-gray-900 md:text-l lg:text-xl dark:text-white">{{ title
				}}</h5>
			<StarRating :value="rating" :size="16" />
			<p class="prose dark:prose-invert mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
		</div>

	</ULink>
</template>

<script setup lang="ts">

const props = defineProps({
	category: {
		type: String as PropType<ReviewMediaType>,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tmdbID: {
		type: Number,
		required: true,
	}
})

function TransformMediaType(reviewMediaType: ReviewMediaType): TMDBMediaType {
	switch (reviewMediaType) {
		case ReviewMediaType.Movie:
			return TMDBMediaType.Movie
		case ReviewMediaType.Show:
			return TMDBMediaType.Show
	}
}

const category = computed(() =>
	 TransformMediaType(props.category))

const url = computed(() => `/api/tmdb/media/${category.value}/${props.tmdbID}`)

const data = await useFetch<TMDBMovie | TMDBShow>(url).then((value) => {

	const result = TMDBMediaSchema.passthrough().safeParse(value.data.value)

	if (!result.success) {

		const entries = Object.entries(result.error.flatten().fieldErrors)
		const errorString = entries.join('\n\t\t')

		console.error(`Failed to parse TMDB metadata for "${url.value}":\n\t\t${errorString}`)

		throw new Error(`Failed to parse TMDB metadata for "${url.value}"`)
	}

	return result.data
})


</script>
