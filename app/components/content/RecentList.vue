<template>
	<div class="not-prose grid grid-flow-row gap-2 grid-cols-1 md:gap-4 md:grid-cols-2">
		<ReviewPreview
			v-for="review in reviews"
			:key="review.title"
			:category="TransformMediaType(category)"
			:path="review.path"
			:rating="review.rating"
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

function TransformMediaType(reviewMediaType: ReviewMediaType): TMDBMediaType {
	switch (reviewMediaType) {
		case ReviewMediaType.Movie:
			return TMDBMediaType.Movie
		case ReviewMediaType.Show:
			return TMDBMediaType.Show
	}
}

function MapNuxtReview(value: ParsedContent): ReviewMetadata {

	const result = ReviewMetadataSchema.safeParse(value);

	if (!result.success) {
		throw new Error(`Failed to parse review metadata for "${value.title}" with error:
					${JSON.stringify(result.error.format())}`,
			)
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
