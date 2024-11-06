<template>
	<ULink
		:to="path" :title="data?.title"
		class="not-prose h-32 flex w-full items-center bg-white border border-gray-200 rounded-lg shadow md:h-48 lg:h-64 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
		<NuxtPicture
			:src="imgURL" preload :img-attrs="{ class: 'rounded-s-lg' }"
			class="h-32 aspect-[2/3] md:h-48 lg:h-64" />
		<div class="flex flex-col justify-between p-4 leading-normal">
			<h5 class="prose dark:prose-invert mb-2 font-bold tracking-tight text-gray-900 md:text-l lg:text-xl dark:text-white">{{ data?.title
				}}</h5>
			<StarRating :value="rating" :size="16" />
			<p class="prose dark:prose-invert mb-3 font-normal text-gray-700 dark:text-gray-400">{{ description }}</p>
		</div>
	</ULink>
</template>

<script setup lang="ts">

const props = defineProps({
	category: {
		type: String as PropType<TMDBMediaType>,
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
	description: {
		type: String,
		required: true
	},
	tmdbID: {
		type: Number,
		required: true,
	}
})

const imgURL = computed(() => {
	return data.poster_path ? `/tmdb${data.poster_path}` : '/images/tmdb.svg'
})

async function QueryTMDB() {
	const { data } = await useFetch<TMDBMedia>(`/api/tmdb/media/${props.category}/${props.tmdbID}`)

	if(data.value === undefined) {
		throw new Error('TMDB data is undefined')
	}

	return data.value;
}

const data = await QueryTMDB()

</script>
