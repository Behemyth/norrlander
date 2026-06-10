<template>
	<div class="flex flex-col gap-6">
		<!-- Filter bar -->
		<div class="flex flex-wrap items-end gap-3">
			<UFormField :label="$t('filter.genre')">
				<USelectMenu
					v-model="selectedGenres"
					:items="availableGenres"
					:placeholder="$t('filter.allGenres')"
					multiple
					:search-input="false"
					class="w-44"
				/>
			</UFormField>

			<UFormField :label="$t('filter.year')">
				<USelectMenu
					v-model="selectedYears"
					:items="availableYears"
					:placeholder="$t('filter.allYears')"
					multiple
					:search-input="false"
					class="w-36"
				/>
			</UFormField>

			<UFormField :label="$t('filter.person')">
				<USelectMenu
					v-model="selectedPeople"
					:items="availablePeople"
					:placeholder="$t('filter.allPeople')"
					multiple
					virtualize
					class="w-52"
				/>
			</UFormField>

			<UFormField :label="$t('filter.minRating')">
				<USelect
					v-model="selectedMinRating"
					:items="ratingOptions"
					:placeholder="$t('filter.any')"
					class="w-32"
				/>
			</UFormField>

			<UFormField :label="$t('filter.sortBy')">
				<USelect
					v-model="sortBy"
					:items="sortOptions"
					class="w-40"
				/>
			</UFormField>

			<UButton
				v-if="hasActiveFilters"
				variant="ghost"
				color="neutral"
				size="sm"
				icon="i-mdi-filter-off"
				@click="clearFilters"
			>
				{{ $t('filter.clearFilters') }}
			</UButton>
		</div>

		<!-- Result count -->
		<p
			v-if="items?.length"
			class="text-sm text-muted"
		>
			{{ $t('filter.showing', { filtered: visibleCount, total: items.length }) }}
		</p>

		<!-- Grid -->
		<!-- Cards stay mounted across filter changes; visibility is toggled via
			`v-show` so filtering/clearing is a style flip instead of remounting
			hundreds of components. -->
		<div
			v-show="visibleCount > 0"
			class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
		>
			<div
				v-for="review in sortedItems"
				v-show="visibleIds.has(review.id)"
				:key="review.id"
			>
				<LazyReviewCard
					:title="review.title"
					:path="review.path"
					:rating="Number(review.rating)"
					:poster-path="review.poster_path ?? ''"
					:season-number="'season_number' in review ? review.season_number : undefined"
				/>
			</div>
		</div>

		<!-- Empty state -->
		<div
			v-if="items?.length && visibleCount === 0"
			class="flex flex-col items-center gap-4 py-12"
		>
			<UIcon
				name="i-mdi-movie-filter-outline"
				class="text-muted size-12"
			/>
			<p class="text-muted text-center">
				{{ $t('filter.noMatch') }}
			</p>
			<UButton
				variant="outline"
				size="sm"
				icon="i-mdi-filter-off"
				@click="clearFilters"
			>
				{{ $t('filter.clearFilters') }}
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FilterableReview } from '~/composables/useReviewFilters';

const { t } = useI18n();

const props = defineProps<{
	collection: 'movie' | 'show';
}>();

// --- Data ---

const { polite: announce } = useAnnouncer();

// Split the query per collection because `season_number` is only valid on
// show reviews and the `.select()` signature narrows by literal collection type.
const { data: items } = await useAsyncData(`review-grid-filter-${props.collection}`, async (): Promise<FilterableReview[]> => {
	if (props.collection === 'show') {
		const rows = await queryCollection('show')
			.select('id', 'title', 'path', 'rating', 'poster_path', 'date_published', 'season_number', 'genres', 'people', 'release_year')
			.order('date_published', 'DESC')
			.all();
		return rows as unknown as FilterableReview[];
	}
	const rows = await queryCollection('movie')
		.select('id', 'title', 'path', 'rating', 'poster_path', 'date_published', 'genres', 'people', 'release_year')
		.order('date_published', 'DESC')
		.all();
	return rows as unknown as FilterableReview[];
});

// --- Filters (state, URL sync, filtering and sorting) ---

const {
	selectedGenres,
	selectedYears,
	selectedPeople,
	selectedMinRating,
	sortBy,
	availableGenres,
	availableYears,
	availablePeople,
	hasActiveFilters,
	clearFilters,
	sortedItems,
	visibleIds,
	visibleCount,
} = useReviewFilters(items);

// --- Select options ---

const ratingOptions = [
	{ label: '★★★★', value: '8' },
	{ label: '★★★½', value: '7' },
	{ label: '★★★', value: '6' },
	{ label: '★★½', value: '5' },
	{ label: '★★', value: '4' },
	{ label: '★½', value: '3' },
	{ label: '★', value: '2' },
	{ label: '½', value: '1' },
];

const sortOptions = computed(() => [
	{ label: t('filter.dateReviewed'), value: 'date' },
	{ label: t('filter.rating'), value: 'rating' },
	{ label: t('filter.title'), value: 'title' },
	{ label: t('filter.releaseYear'), value: 'year' },
]);

watch(visibleCount, (count) => {
	announce(t('filter.announcerShowing', { count }));
});
</script>
