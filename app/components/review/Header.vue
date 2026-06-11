<template>
	<div class="flex flex-col">
		<UPageHeader
			:title="displayTitle"
			:ui="{ root: 'pb-4' }"
		>
			<template #title>
				<div class="flex flex-col gap-2">
					<ProseH1 class="mb-0! text-3xl font-bold">
						{{ displayTitle }}
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
						<!-- Show (seasonal): display season number and episode count for this season only -->
						<template v-if="isSeason && seasonNumber">
							<span class="text-muted text-xs">•</span>
							<span class="text-lg text-muted">
								{{ $t('review.season', 1) }} {{ seasonNumber }}
							</span>
						</template>
						<template v-if="isSeason && seasonEpisodeCount">
							<span class="text-muted text-xs">•</span>
							<span class="text-lg text-muted">
								{{ seasonEpisodeCount }} {{ $t('review.episodes') }}
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

		<div
			v-if="content.tmdbData?.backdrop_path"
			class="aspect-12/5 w-full overflow-hidden"
		>
			<!-- Workaround for nuxt/image#1433: bare vw sizes produce 1w/2w srcsets, so
				every vw entry must carry a breakpoint prefix. -->
			<NuxtImg
				:src="content.tmdbData.backdrop_path"
				:alt="content.title"
				:placeholder="img(content.tmdbData.backdrop_path, { height: 10, blur: 2, quality: 50 })"
				:sizes="backdropSizes"
				loading="eager"
				fetchpriority="high"
				class="object-cover w-full h-full"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';
import { useReviewMetadata, isShowReview } from '~/composables/useReviewMetadata';
import { useRelatedSeasons } from '~/composables/useRelatedSeasons';

const img = useImage();

const props = defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();

// Container is max-w-4xl (896px); full-bleed below lg.
const backdropSizes = 'sm:100vw md:100vw lg:896px';

useImagePreload(props.content.tmdbData?.backdrop_path, { sizes: backdropSizes });

const {
	isMovie,
	isShow,
	isSeason,
	displayTitle,
	seasonNumber,
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
