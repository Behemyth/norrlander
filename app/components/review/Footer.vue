<template>
	<div class="grid grid-flow-row gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
		<!-- Left: Title and metadata -->
		<div class="my-auto">
			<ProseH2 class="!my-0 !mb-2">
				{{ content.title }}
			</ProseH2>
			<div class="flex flex-wrap items-center gap-x-2 text-sm text-muted mb-2">
				<span v-if="releaseYear">{{ releaseYear }}</span>
				<template v-if="isMovie && formattedRuntime">
					<span class="text-xs">•</span>
					<span>{{ formattedRuntime }}</span>
				</template>
				<template v-if="isShow && numberOfSeasons">
					<span class="text-xs">•</span>
					<span>{{ numberOfSeasons }} {{ $t('review.season', numberOfSeasons) }}</span>
				</template>
			</div>
			<div
				v-if="genres.length > 0"
				class="flex flex-wrap gap-1"
			>
				<UBadge
					v-for="genre in genres"
					:key="genre.id"
					variant="subtle"
					size="xs"
				>
					{{ genre.name }}
				</UBadge>
			</div>
		</div>

		<!-- Poster -->
		<NuxtImg
			v-if="content.tmdbData?.poster_path"
			:src="`tmdb/${content.tmdbData.poster_path}`"
			:alt="content.title"
			:placeholder="img(`tmdb/${content.tmdbData.poster_path}`, { height: 10, blur: 2, quality: 50 })"
			:img-attrs="{
				class: 'aspect-[2/3]',
			}"
			:style="{ viewTransitionName: `review-poster${content.path.replaceAll('/', '-')}` }"
			sizes="100vw sm:50vw md:25vw"
			loading="lazy"
		/>

		<!-- Cast -->
		<div class="my-auto">
			<ProseH3 class="!mt-0 !mb-2">
				{{ $t('review.cast') }}
			</ProseH3>
			<ul
				v-if="topCast.length > 0"
				class="space-y-0.5"
			>
				<li
					v-for="member in topCast"
					:key="member.id"
					class="text-xs"
				>
					<span class="font-medium">{{ member.name }}</span>
					<span class="text-muted">{{ $t('review.as') }}{{ member.character }}</span>
				</li>
			</ul>
			<p
				v-else
				class="text-xs text-muted"
			>
				{{ $t('review.noCast') }}
			</p>
		</div>

		<!-- Director/Creators -->
		<div class="my-auto">
			<!-- Movie: Director/Screenplay -->
			<template v-if="isMovie">
				<div
					v-if="directors.length > 0"
					class="mb-3"
				>
					<ProseH3 class="!mt-0 !mb-1">
						{{ $t('review.director', directors.length) }}
					</ProseH3>
					<ProseP class="!my-0">
						{{ directors.map(d => d.name).join(', ') }}
					</ProseP>
				</div>
				<div v-if="uniqueWriterNames.length > 0">
					<ProseH3 class="!mt-0 !mb-1">
						{{ $t('review.screenplay') }}
					</ProseH3>
					<ProseP class="!my-0">
						{{ uniqueWriterNames.join(', ') }}
					</ProseP>
				</div>
			</template>
			<!-- Show: Creators -->
			<template v-else>
				<div v-if="creators.length > 0">
					<ProseH3 class="!mt-0 !mb-1">
						{{ creators.length === 1 ? $t('review.creator') : $t('review.createdBy') }}
					</ProseH3>
					<ProseP class="!my-0">
						{{ creators.map(c => c.name).join(', ') }}
					</ProseP>
				</div>
				<div
					v-else-if="directors.length > 0"
					class="mb-3"
				>
					<ProseH3 class="!mt-0 !mb-1">
						{{ $t('review.director', directors.length) }}
					</ProseH3>
					<ProseP class="!my-0">
						{{ directors.map(d => d.name).join(', ') }}
					</ProseP>
				</div>
				<ProseP
					v-else
					class="!my-0 text-gray-500"
				>
					{{ $t('review.noCreator') }}
				</ProseP>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { MovieCollectionItem, ShowCollectionItem } from '@nuxt/content';
import { useReviewMetadata } from '~/composables/useReviewMetadata';

const img = useImage();

const props = defineProps<{
	content: MovieCollectionItem | ShowCollectionItem;
}>();

const {
	isMovie,
	isShow,
	releaseYear,
	formattedRuntime,
	numberOfSeasons,
	genres,
	getTopCast,
	directors,
	creators,
	uniqueWriterNames,
} = useReviewMetadata(props.content);

const topCast = getTopCast(5);
</script>
