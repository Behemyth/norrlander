<template>
	<div class="flex flex-col">
		<UPageHeader
			:title="content.title"
			:ui="{ root: 'pb-4' }"
		>
			<template #title>
				<div class="flex flex-col gap-2">
					<ProseH1 class="!mb-0 text-3xl font-bold">
						{{ content.title }}
					</ProseH1>
					<div class="flex flex-row items-center flex-wrap gap-x-2">
						<ReviewStarRating
							:value="Number(content.rating)"
							:size="24"
						/>
						<span
							v-if="releaseYear"
							class="text-lg text-muted"
						>
							{{ releaseYear }}
						</span>
						<!-- Movie: show runtime -->
						<template v-if="isMovie && formattedRuntime">
							<span class="text-muted text-xs">•</span>
							<span class="text-lg text-muted">{{ formattedRuntime }}</span>
						</template>
						<!-- Show (non-seasonal): display seasons/episodes -->
						<template v-if="isShow && !isSeason && (numberOfSeasons || numberOfEpisodes)">
							<span class="text-muted text-xs">•</span>
							<span class="text-lg text-muted">
								<template v-if="numberOfSeasons">
									{{ numberOfSeasons }} {{ numberOfSeasons === 1 ? 'Season' : 'Seasons' }}
								</template>
								<template v-if="numberOfSeasons && numberOfEpisodes">
									<span class="text-xs"> • </span>
								</template>
								<template v-if="numberOfEpisodes">
									{{ numberOfEpisodes }} Episodes
								</template>
							</span>
						</template>
						<!-- Show (seasonal): display episode count for this season only -->
						<template v-if="isSeason && seasonEpisodeCount">
							<span class="text-muted text-xs">•</span>
							<span class="text-lg text-muted">
								{{ seasonEpisodeCount }} Episodes
							</span>
						</template>
					</div>
					<div
						v-if="genres.length > 0"
						class="flex flex-wrap gap-1.5"
					>
						<UBadge
							v-for="genre in genres"
							:key="genre.id"
							variant="subtle"
							size="sm"
						>
							{{ genre.name }}
						</UBadge>
					</div>
					<!-- Season switcher for multi-season shows -->
					<div
						v-if="hasMultipleSeasons"
						class="flex flex-wrap gap-1 mt-1"
					>
						<UButton
							v-for="season in seasonLinks"
							:key="season.path"
							:to="season.path"
							:variant="season.isCurrent ? 'solid' : 'outline'"
							size="xs"
						>
							{{ season.label }}
						</UButton>
					</div>
				</div>
			</template>

			<template #description>
				<div class="flex flex-row flex-wrap items-center gap-x-2 mt-2">
					<span class="text-base">Asher Norland</span>
					<template v-if="formattedPublishedDate">
						<span class="text-muted text-xs">•</span>
						<span class="text-base text-muted">{{ formattedPublishedDate }}</span>
					</template>
				</div>
			</template>
		</UPageHeader>

		<NuxtImg
			:src="`tmdb/${content.tmdbData.backdrop_path}`"
			:alt="content.title"
			:placeholder="img(`tmdb/${content.tmdbData.backdrop_path}`, { height: 10, blur: 2, quality: 50 })"
			:img-attrs="{ class: 'object-cover w-full aspect-[12/5]' }"
		/>
	</div>
</template>

<script setup lang="ts">
const img = useImage();
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';
import { useReviewMetadata, isShowReview } from '~/composables/useReviewMetadata';
import { useRelatedSeasons } from '~/composables/useRelatedSeasons';

const props = defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();

const {
	isMovie,
	isShow,
	isSeason,
	releaseYear,
	genres,
	formattedRuntime,
	numberOfSeasons,
	numberOfEpisodes,
	seasonEpisodeCount,
	formattedPublishedDate,
} = useReviewMetadata(props.content);

// Season navigation for shows
const { seasonLinks, hasMultipleSeasons } = isShowReview(props.content)
	? await useRelatedSeasons(props.content)
	: { seasonLinks: ref([]), hasMultipleSeasons: ref(false) };
</script>
