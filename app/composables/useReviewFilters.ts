/**
 * Structural type for a review row after `.select()` narrowing. Only the
 * scalar fields used by the filter UI — `genres`, `people` and `release_year`
 * are denormalized at build time in `modules/content.ts` so we never have to
 * ship the full `tmdbData` / `seasonTmdbData` objects to the client.
 */
export type FilterableReview = {
	id: string;
	title: string;
	path: string;
	rating: number;
	poster_path?: string | null;
	date_published: string | Date;
	season_number?: number;
	genres: string[];
	people: string[];
	release_year?: number;
};

/**
 * Pre-indexed lookup structures built once per dataset so filtering doesn't
 * rebuild set/year lookups on every selection change.
 */
export type ReviewIndex = {
	genreSet: Map<string, Set<string>>; // id -> Set<genreName>
	personSet: Map<string, Set<string>>; // id -> Set<personName>
	yearById: Map<string, number | null>;
};

export type ReviewFilterSelections = {
	genres: readonly string[];
	years: readonly string[];
	people: readonly string[];
	minRating: number;
};

export function buildReviewIndex(items: readonly FilterableReview[]): ReviewIndex {
	const genreSet = new Map<string, Set<string>>();
	const personSet = new Map<string, Set<string>>();
	const yearById = new Map<string, number | null>();
	for (const item of items) {
		genreSet.set(item.id, new Set(item.genres ?? []));
		personSet.set(item.id, new Set(item.people ?? []));
		yearById.set(item.id, item.release_year ?? null);
	}
	return { genreSet, personSet, yearById };
}

/**
 * Resolve the set of review ids matching the current selections. Matching is
 * additive (OR) within a facet and intersects (AND) across facets.
 */
export function filterReviewIds(
	items: readonly FilterableReview[],
	index: ReviewIndex,
	selections: ReviewFilterSelections,
): Set<string> {
	const ids = new Set<string>();
	const yearSet = new Set(selections.years);

	for (const item of items) {
		if (selections.genres.length > 0) {
			const itemGenres = index.genreSet.get(item.id);
			if (!itemGenres || !selections.genres.some(g => itemGenres.has(g))) continue;
		}

		if (selections.people.length > 0) {
			const itemPeople = index.personSet.get(item.id);
			if (!itemPeople || !selections.people.some(name => itemPeople.has(name))) continue;
		}

		if (yearSet.size > 0) {
			const year = index.yearById.get(item.id);
			if (!year || !yearSet.has(String(year))) continue;
		}

		if (selections.minRating && item.rating < selections.minRating) continue;

		ids.add(item.id);
	}

	return ids;
}

/**
 * Order reviews for display. Returns the input array untouched for the
 * default date sort so `v-for` node identity stays stable.
 */
export function sortReviews(
	items: FilterableReview[],
	sortBy: string,
	index: ReviewIndex,
): FilterableReview[] {
	if (sortBy === 'date') return items; // already ordered by query

	return [...items].sort((a, b) => {
		switch (sortBy) {
			case 'rating':
				return b.rating - a.rating;
			case 'title':
				return a.title.localeCompare(b.title);
			case 'year': {
				const ya = index.yearById.get(a.id) ?? 0;
				const yb = index.yearById.get(b.id) ?? 0;
				return yb - ya;
			}
			default:
				return 0;
		}
	});
}

/**
 * Normalize a route query value (string | string[] | undefined) to a clean
 * string array.
 */
export function queryValues(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
	}
	return typeof value === 'string' && value.length > 0 ? [value] : [];
}

function firstQueryValue(value: unknown): string {
	return queryValues(value)[0] ?? '';
}

function arraysEqual(a: readonly string[], b: readonly string[]): boolean {
	return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Assign only when the value actually changed. Keeping ref identities stable
 * makes the state→URL→state round-trip terminate as a no-op instead of
 * re-rendering the (large) select lists and grid a second time per click.
 */
function assignArray(target: Ref<string[]>, values: string[]) {
	if (!arraysEqual(target.value, values)) {
		target.value = values;
	}
}

function assignScalar(target: Ref<string>, value: string) {
	if (target.value !== value) {
		target.value = value;
	}
}

/**
 * Filter and sort state for the review grids, synced two-way with the URL
 * query params (`genre`, `year`, `person`, `rating`, `sort`) so footer and
 * inline person links — and shared URLs — land pre-filtered.
 */
export function useReviewFilters(items: Ref<FilterableReview[] | null | undefined>) {
	const route = useRoute();
	const router = useRouter();

	// --- Pre-indexed filter structures ---

	const reviewIndex = computed(() => buildReviewIndex(items.value ?? []));

	// --- Filter options derived from data ---

	const availableGenres = computed(() => {
		const genres = new Set<string>();
		for (const item of items.value ?? []) {
			for (const name of item.genres ?? []) {
				genres.add(name);
			}
		}
		return [...genres].sort();
	});

	const availableYears = computed(() => {
		const years = new Set<string>();
		for (const item of items.value ?? []) {
			if (item.release_year) years.add(String(item.release_year));
		}
		return [...years].sort().reverse();
	});

	const availablePeople = computed(() => {
		const people = new Set<string>();
		for (const item of items.value ?? []) {
			for (const name of item.people ?? []) {
				people.add(name);
			}
		}
		return [...people].sort();
	});

	// Maps URL slugs (and exact names) back to display names so deep links
	// like `?person=ari-aster` select "Ari Aster".
	const personByFilterValue = computed(() => {
		const people = new Map<string, string>();
		for (const name of availablePeople.value) {
			people.set(personFilterValue(name), name);
			people.set(name, name);
		}
		return people;
	});

	// --- Filter state ---

	const selectedGenres = ref<string[]>([]);
	const selectedYears = ref<string[]>([]);
	const selectedPeople = ref<string[]>([]);
	const selectedMinRating = ref('');
	const sortBy = ref('date');
	const filtersReady = ref(false);

	const hasActiveFilters = computed(() =>
		selectedGenres.value.length > 0
		|| selectedYears.value.length > 0
		|| selectedPeople.value.length > 0
		|| selectedMinRating.value !== '',
	);

	function clearFilters() {
		selectedGenres.value = [];
		selectedYears.value = [];
		selectedPeople.value = [];
		selectedMinRating.value = '';
		sortBy.value = 'date';
	}

	// --- URL sync ---

	function applyQueryToFilters() {
		assignArray(selectedGenres, queryValues(route.query.genre));
		assignArray(selectedYears, queryValues(route.query.year));
		assignArray(selectedPeople, queryValues(route.query.person).map(value => personByFilterValue.value.get(value) ?? value));
		assignScalar(selectedMinRating, firstQueryValue(route.query.rating));
		assignScalar(sortBy, firstQueryValue(route.query.sort) || 'date');
		filtersReady.value = true;
	}

	function replaceFilterQuery() {
		const query = { ...route.query };
		delete query.genre;
		delete query.year;
		delete query.person;
		delete query.rating;
		delete query.sort;

		if (selectedGenres.value.length > 0) query.genre = selectedGenres.value;
		if (selectedYears.value.length > 0) query.year = selectedYears.value;
		if (selectedPeople.value.length > 0) query.person = selectedPeople.value.map(personFilterValue);
		if (selectedMinRating.value) query.rating = selectedMinRating.value;
		if (sortBy.value !== 'date') query.sort = sortBy.value;

		// Skip the navigation entirely when nothing changed — router.replace is
		// not free even for same-route query updates.
		if (JSON.stringify(query) === JSON.stringify(route.query)) return;

		router.replace({ query });
	}

	onMounted(applyQueryToFilters);

	watch(() => route.query, () => {
		if (filtersReady.value) applyQueryToFilters();
	});

	watch([selectedGenres, selectedYears, selectedPeople, selectedMinRating, sortBy], () => {
		if (!filtersReady.value) return;
		replaceFilterQuery();
	});

	// --- Filtered + sorted items ---

	// Sorting and filtering are deliberately separate computeds: the sorted
	// list (which drives v-for order and node identity) only changes when the
	// sort changes, while filter clicks merely produce a new `visibleIds` Set
	// that flips `v-show` flags — no card unmount/remount churn.
	const sortedItems = computed(() => sortReviews(items.value ?? [], sortBy.value, reviewIndex.value));

	const visibleIds = computed(() => filterReviewIds(items.value ?? [], reviewIndex.value, {
		genres: selectedGenres.value,
		years: selectedYears.value,
		people: selectedPeople.value,
		minRating: Number(selectedMinRating.value) || 0,
	}));

	const visibleCount = computed(() => visibleIds.value.size);

	return {
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
	};
}
