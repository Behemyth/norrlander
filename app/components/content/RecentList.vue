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

import type { ReviewMetadata } from '~~/shared/review'
import {  MediaType as ReviewMediaType } from '~~/shared/review'
import {  MediaType as TMDBMediaType } from '~~/shared/tmdb'

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

// Validates the review data
function MapNuxtReview(review: NuxtContentReview): ReviewMetadata {
	if(	!review._path)
	{
		throw new Error('Review path is missing for' + review.title)
	}

	if(	!review.description)
	{
		throw new Error('Review description is missing for' + review.title)
	}

	if(	!review.TMDB_ID)
	{
		throw new Error('Review TMDB_ID is missing for' + review.title)
	}

	if(	!review.title)
	{
		throw new Error('Review title is missing for' + review.title)
	}

	if(	!review.intRating)
	{
		throw new Error('Review intRating is missing for' + review.title)
	}

	if(	!review.entRating)
	{
		throw new Error('Review entRating is missing for' + review.title)
	}

	if(	!review.rating)
	{
		throw new Error('Review rating is missing')
	}

	if(	!review.date_published)
	{
		throw new Error('Review date_published is missing')
	}

	if(	!review.date_modified)
	{
		throw new Error('Review date_modified is missing')
	}

	return {
				path: review._path,
				description: review.description,
				TMDB_ID: review.TMDB_ID,
				title: review.title,
				intRating: review.intRating,
				entRating: review.entRating,
				rating: review.rating,
				date_published: review.date_published,
				date_modified: review.date_modified
			}
}

async function QueryReviews(mediaType:ReviewMediaType): Promise<ReviewMetadata[]> {
	return await queryContent<NuxtContentReview>('reviews', mediaType)
	.where({ layout: 'review' })
	.sort({ date_published: -1 }).limit(props.limit).find().then((value: NuxtContentReview[]) => {
		return value.map(MapNuxtReview)
	})
}

const reviews = await QueryReviews(props.category)

</script>
