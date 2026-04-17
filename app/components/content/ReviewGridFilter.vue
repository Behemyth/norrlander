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
			{{ $t('filter.showing', { filtered: filteredItems.length, total: items.length }) }}
		</p>

		<!-- Grid -->
		<div
			v-if="filteredItems.length"
			class="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
		>
			<LazyReviewCard
				v-for="review in filteredItems"
				:key="review.id"
				:title="review.title"
				:path="review.path"
				:rating="Number(review.rating)"
				:poster-path="review.poster_path ?? ''"
				:season-number="'season_number' in review ? review.season_number : undefined"
			/>
		</div>

		<!-- Empty state -->
		<div
			v-else-if="items?.length"
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
/**
 * Structural type for a review row after `.select()` narrowing. Covers both
 * movie and show shapes so filter/sort code can operate on the union without
 * re-widening to the full collection item types.
 */
type FilterableReview = {
	id: string;
	title: string;
	path: string;
	rating: number;
	poster_path?: string | null;
	date_published: string | Date;
	season_number?: number;
	tmdbData: {
		genres?: { id: number; name: string }[];
		release_date?: string;
		first_air_date?: string;
	};
	seasonTmdbData?: { air_date?: string } | null;
};

const { t } = useI18n();

const props = defineProps<{
	collection: 'movie' | 'show';
}>();

function getReleaseYear(review: FilterableReview): number | null {
	if (review.seasonTmdbData?.air_date) {
		return new Date(review.seasonTmdbData.air_date).getFullYear();
	}
	if (!review.tmdbData) return null;
	const dateStr = review.tmdbData.release_date ?? review.tmdbData.first_air_date;
	if (!dateStr) return null;
	return new Date(dateStr).getFullYear();
}

// --- Data ---

const { polite: announce } = useAnnouncer();

// Split the query per collection because `season_number` / `seasonTmdbData`
// are only valid on show reviews and the `.select()` signature narrows by
// literal collection type.
const { data: items } = await useAsyncData(`review-grid-filter-${props.collection}`, async (): Promise<FilterableReview[]> => {
	if (props.collection === 'show') {
		const rows = await queryCollection('show')
			.select('id', 'title', 'path', 'rating', 'poster_path', 'date_published', 'season_number', 'tmdbData', 'seasonTmdbData')
			.where('draft', '=', false)
			.order('date_published', 'DESC')
			.all();
		return rows as unknown as FilterableReview[];
	}
	const rows = await queryCollection('movie')
		.select('id', 'title', 'path', 'rating', 'poster_path', 'date_published', 'tmdbData')
		.where('draft', '=', false)
		.order('date_published', 'DESC')
		.all();
	return rows as unknown as FilterableReview[];
});

// --- Filter options derived from data ---

const availableGenres = computed(() => {
	if (!items.value) return [];
	const genres = new Set<string>();
	for (const item of items.value) {
		for (const genre of item.tmdbData?.genres ?? []) {
			genres.add(genre.name);
		}
	}
	return [...genres].sort();
});

const availableYears = computed(() => {
	if (!items.value) return [];
	const years = new Set<string>();
	for (const item of items.value) {
		const year = getReleaseYear(item);
		if (year) years.add(String(year));
	}
	return [...years].sort().reverse();
});

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

// --- Filter state ---

const selectedGenres = ref<string[]>([]);
const selectedYears = ref<string[]>([]);
const selectedMinRating = ref('');
const sortBy = ref('date');

const hasActiveFilters = computed(() =>
	selectedGenres.value.length > 0
	|| selectedYears.value.length > 0
	|| selectedMinRating.value !== '',
);

function clearFilters() {
	selectedGenres.value = [];
	selectedYears.value = [];
	selectedMinRating.value = '';
}

// --- Filtered + sorted items ---

const filteredItems = computed(() => {
	if (!items.value) return [];

	let result = items.value.filter((item) => {
		// Genre filter
		if (selectedGenres.value.length > 0) {
			const itemGenres = (item.tmdbData.genres ?? []).map(g => g.name);
			if (!selectedGenres.value.some(g => itemGenres.includes(g))) return false;
		}

		// Year filter
		if (selectedYears.value.length > 0) {
			const year = getReleaseYear(item);
			if (!year || !selectedYears.value.includes(String(year))) return false;
		}

		// Min rating filter
		const minRating = Number(selectedMinRating.value) || 0;
		if (minRating && item.rating < minRating) return false;

		return true;
	});

	// Sort
	const dir = sortBy.value;
	result = [...result].sort((a, b) => {
		switch (dir) {
			case 'rating':
				return b.rating - a.rating;
			case 'title':
				return a.title.localeCompare(b.title);
			case 'year': {
				const ya = getReleaseYear(a) ?? 0;
				const yb = getReleaseYear(b) ?? 0;
				return yb - ya;
			}
			default: // 'date' — already ordered by date_published DESC from query
				return 0;
		}
	});

	return result;
});

watch(filteredItems, (reviews) => {
	if (reviews) {
		announce(t('filter.announcerShowing', { count: reviews.length }));
	}
});
</script>
