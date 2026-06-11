import { describe, it, expect } from 'vitest';
import type { FilterableReview } from '../app/composables/useReviewFilters';
import { buildReviewIndex, filterReviewIds, sortReviews, queryValues } from '../app/composables/useReviewFilters';

// Test the pure filter-engine functions which don't need Nuxt context

function makeReview(overrides: Partial<FilterableReview> & { id: string }): FilterableReview {
	return {
		title: overrides.id,
		path: `/review/movie/${overrides.id}`,
		rating: 6,
		date_published: '2024-01-01',
		genres: [],
		people: [],
		...overrides,
	};
}

const reviews: FilterableReview[] = [
	makeReview({ id: 'beau', title: 'Beau Is Afraid', rating: 8, genres: ['Horror', 'Comedy'], people: ['Ari Aster', 'Joaquin Phoenix'], release_year: 2023 }),
	makeReview({ id: 'hereditary', title: 'Hereditary', rating: 7, genres: ['Horror'], people: ['Ari Aster', 'Toni Collette'], release_year: 2018 }),
	makeReview({ id: 'her', title: 'Her', rating: 6, genres: ['Romance', 'Science Fiction'], people: ['Spike Jonze', 'Joaquin Phoenix'], release_year: 2013 }),
];

const index = buildReviewIndex(reviews);

function visibleIds(selections: Partial<Parameters<typeof filterReviewIds>[2]>) {
	return filterReviewIds(reviews, index, {
		genres: [],
		years: [],
		people: [],
		minRating: 0,
		...selections,
	});
}

describe('filterReviewIds', () => {
	it('matches everything with no selections', () => {
		expect(visibleIds({})).toEqual(new Set(['beau', 'hereditary', 'her']));
	});

	it('is additive (OR) within the person facet', () => {
		expect(visibleIds({ people: ['Ari Aster', 'Spike Jonze'] }))
			.toEqual(new Set(['beau', 'hereditary', 'her']));
	});

	it('intersects (AND) across facets', () => {
		expect(visibleIds({ people: ['Joaquin Phoenix'], genres: ['Horror'] }))
			.toEqual(new Set(['beau']));
	});

	it('filters by year and minimum rating', () => {
		expect(visibleIds({ years: ['2018', '2013'] })).toEqual(new Set(['hereditary', 'her']));
		expect(visibleIds({ minRating: 7 })).toEqual(new Set(['beau', 'hereditary']));
	});

	it('returns an empty set for an unknown person', () => {
		expect(visibleIds({ people: ['Typo Aster'] })).toEqual(new Set());
	});
});

describe('sortReviews', () => {
	it('returns the same array instance for the default date sort', () => {
		expect(sortReviews(reviews, 'date', index)).toBe(reviews);
	});

	it('sorts by rating, title and release year without mutating input', () => {
		expect(sortReviews(reviews, 'rating', index).map(r => r.id)).toEqual(['beau', 'hereditary', 'her']);
		expect(sortReviews(reviews, 'title', index).map(r => r.id)).toEqual(['beau', 'her', 'hereditary']);
		expect(sortReviews(reviews, 'year', index).map(r => r.id)).toEqual(['beau', 'hereditary', 'her']);
		expect(reviews.map(r => r.id)).toEqual(['beau', 'hereditary', 'her']);
	});
});

describe('queryValues', () => {
	it('normalizes scalar, array and missing query values', () => {
		expect(queryValues('ari-aster')).toEqual(['ari-aster']);
		expect(queryValues(['a', 'b'])).toEqual(['a', 'b']);
		expect(queryValues(undefined)).toEqual([]);
		expect(queryValues(['a', '', null])).toEqual(['a']);
	});
});
