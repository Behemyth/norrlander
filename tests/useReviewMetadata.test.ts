import { describe, it, expect } from 'vitest';
import { isMovieReview, isShowReview, isSeasonReview } from '../app/composables/useReviewMetadata';

// Test the type guard functions which are pure and don't need Nuxt context

function makeMovieReview(overrides = {}) {
	return {
		id: 'movie-1',
		title: 'The Matrix',
		description: '',
		draft: false,
		path: '/review/movie/the-matrix',
		date_published: '2024-01-01',
		date_modified: '2024-01-01',
		intRating: 7,
		entRating: 8,
		rating: 7,
		TMDB_ID: 603,
		tmdbData: {
			id: 603,
			title: 'The Matrix',
			backdrop_path: '/backdrop.jpg',
			poster_path: '/poster.jpg',
			genres: [{ id: 28, name: 'Action' }, { id: 878, name: 'Science Fiction' }],
			runtime: 136,
			release_date: '1999-03-31',
			credits: {
				cast: [{ id: 1, name: 'Keanu Reeves', character: 'Neo', profile_path: null, order: 0 }],
				crew: [{ id: 2, name: 'Lana Wachowski', job: 'Director', department: 'Directing', profile_path: null }],
			},
		},
		...overrides,
	};
}

function makeShowReview(overrides = {}) {
	return {
		id: 'show-1',
		title: 'Breaking Bad',
		description: '',
		draft: false,
		path: '/review/show/breaking-bad',
		date_published: '2024-01-01',
		date_modified: '2024-01-01',
		intRating: 8,
		entRating: 8,
		rating: 8,
		TMDB_ID: 1396,
		season_number: undefined,
		seasonTmdbData: undefined,
		tmdbData: {
			id: 1396,
			name: 'Breaking Bad',
			backdrop_path: '/backdrop.jpg',
			poster_path: '/poster.jpg',
			genres: [{ id: 18, name: 'Drama' }],
			first_air_date: '2008-01-20',
			number_of_seasons: 5,
			number_of_episodes: 62,
			created_by: [{ id: 66633, name: 'Vince Gilligan', profile_path: null }],
			credits: {
				cast: [{ id: 3, name: 'Bryan Cranston', character: 'Walter White', profile_path: null, order: 0 }],
				crew: [],
			},
		},
		...overrides,
	};
}

function makeSeasonReview(overrides = {}) {
	return {
		...makeShowReview(),
		title: 'Breaking Bad: Season 1',
		season_number: 1,
		seasonTmdbData: {
			id: 3572,
			name: 'Season 1',
			overview: 'First season',
			poster_path: '/season-poster.jpg',
			air_date: '2008-01-20',
			season_number: 1,
			episode_count: 7,
			vote_average: 8.2,
		},
		...overrides,
	};
}

describe('useReviewMetadata type guards', () => {
	describe('isMovieReview', () => {
		it('returns true for movie reviews', () => {
			const movie = makeMovieReview();
			expect(isMovieReview(movie as any)).toBe(true);
		});

		it('returns false for show reviews', () => {
			const show = makeShowReview();
			expect(isShowReview(show as any)).toBe(true);
			// movie has 'title', show has 'name' in tmdbData
			expect(isMovieReview(show as any)).toBe(false);
		});
	});

	describe('isShowReview', () => {
		it('returns true for show reviews', () => {
			const show = makeShowReview();
			expect(isShowReview(show as any)).toBe(true);
		});

		it('returns false for movie reviews', () => {
			const movie = makeMovieReview();
			expect(isShowReview(movie as any)).toBe(false);
		});
	});

	describe('isSeasonReview', () => {
		it('returns true for seasonal show reviews', () => {
			const season = makeSeasonReview();
			expect(isSeasonReview(season as any)).toBe(true);
		});

		it('returns false for non-seasonal show reviews', () => {
			const show = makeShowReview();
			expect(isSeasonReview(show as any)).toBe(false);
		});

		it('returns false for movie reviews', () => {
			const movie = makeMovieReview();
			expect(isSeasonReview(movie as any)).toBe(false);
		});

		it('returns false when season_number exists but seasonTmdbData is undefined', () => {
			const incomplete = makeShowReview({ season_number: 1, seasonTmdbData: undefined });
			expect(isSeasonReview(incomplete as any)).toBe(false);
		});
	});
});
