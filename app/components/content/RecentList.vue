<template>
	<div class="not-prose grid grid-flow-row gap-8 grid-cols-1 md:grid-cols-2">
		<ReviewPreview
			v-for="review in reviews"
			:key="review.title"
			:category="category"
			:path="review._path"
			:rating="review.rating"
			:title="review.title"
			:description="review.description"
			:tmdb-i-d="review.TMDB_ID" />
	</div>
	<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">These reviews uses the TMDB API but is not
		endorsed or certified by TMDB.</span>
</template>

<script setup lang="ts">

import type { ParsedContent } from '@nuxt/content';

const props = defineProps({
	size: {
		type: Number,
		required: true
	},
	category: {
		type: String as PropType<ReviewMediaType>,
		required: true
	},
	limit: {
		type: Number,
		default: 0
	}
})

function MapNuxtReview(value: ParsedContent): ReviewMetadata {
	const result = ReviewMetadataSchema.safeParse(value);

	if (!result.success) {

		const entries = Object.entries(result.error.flatten().fieldErrors)
		const errorString = entries.join('\n\t\t')

		console.error(`Failed to parse review metadata for "${value.title}":\n\t\t${errorString}`)

		throw new Error(`Failed to parse review metadata for "${value.title}"`)
	}

	return result.data
}

async function QueryReviews(mediaType:ReviewMediaType): Promise<ReviewMetadata[]> {
	return await queryContent('reviews', mediaType)
	.where({ layout: 'review' })
	.sort({ date_published: -1 }).limit(props.limit).find().then((values) => {
		return values.map(MapNuxtReview)
	})
}

const reviews = await QueryReviews(props.category)

</script>
