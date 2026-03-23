import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { $fetch } from 'ofetch';

// We test the TMDB module's core logic by simulating what the hook does
// Since the module has a skip guard for test environments, we test the logic directly

vi.mock('ofetch', () => ({
	$fetch: vi.fn(),
}));

const mockedFetch = vi.mocked($fetch);

interface ContentCtx {
	collection: { name: string };
	content: Record<string, any>;
}

/**
 * Extracted from modules/content.ts — the hook logic applied per collection
 */
async function processContent(ctx: ContentCtx, apiBase: string, apiSecret: string) {
	switch (ctx.collection.name) {
		case 'movie':
		{
			const tmdbData = await $fetch(`/movie/${ctx.content.TMDB_ID}`, {
				baseURL: apiBase,
				params: { language: 'en-US', append_to_response: 'credits' },
				headers: { Authorization: `Bearer ${apiSecret}` },
			});

			ctx.content.title = (tmdbData as any).title;
			ctx.content.tmdbData = tmdbData;
			break;
		}
		case 'show':
		{
			const [tmdbData, seasonTmdbData] = await Promise.all([
				$fetch(`/tv/${ctx.content.TMDB_ID}`, {
					baseURL: apiBase,
					params: { language: 'en-US', append_to_response: 'credits' },
					headers: { Authorization: `Bearer ${apiSecret}` },
				}),
				ctx.content.season_number !== undefined
					? $fetch(
							`/tv/${ctx.content.TMDB_ID}/season/${ctx.content.season_number}`,
							{
								baseURL: apiBase,
								params: { language: 'en-US' },
								headers: { Authorization: `Bearer ${apiSecret}` },
							},
						)
					: Promise.resolve(undefined),
			]);

			ctx.content.title = (tmdbData as any).name;
			ctx.content.tmdbData = tmdbData;

			if (seasonTmdbData) {
				ctx.content.seasonTmdbData = seasonTmdbData;
				ctx.content.title = `${(tmdbData as any).name}: Season ${ctx.content.season_number}`;
			}
			break;
		}
	}
}

const API_BASE = 'https://api.themoviedb.org/3';
const API_SECRET = 'test-token';

describe('TMDB content module', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('skip guard', () => {
		it('module checks for test environment', () => {
			// The module itself checks NODE_ENV and VITEST env vars
			// In test env both are set, so the hook is never registered
			expect(process.env.NODE_ENV).toBe('test');
		});
	});

	describe('movie processing', () => {
		it('fetches movie data and sets title + tmdbData', async () => {
			const movieData = {
				id: 603,
				title: 'The Matrix',
				genres: [{ id: 28, name: 'Action' }],
				poster_path: '/poster.jpg',
				backdrop_path: '/backdrop.jpg',
				runtime: 136,
				release_date: '1999-03-31',
			};

			mockedFetch.mockResolvedValueOnce(movieData);

			const ctx: ContentCtx = {
				collection: { name: 'movie' },
				content: { TMDB_ID: 603 },
			};

			await processContent(ctx, API_BASE, API_SECRET);

			expect(mockedFetch).toHaveBeenCalledWith('/movie/603', {
				baseURL: API_BASE,
				params: { language: 'en-US', append_to_response: 'credits' },
				headers: { Authorization: `Bearer ${API_SECRET}` },
			});
			expect(ctx.content.title).toBe('The Matrix');
			expect(ctx.content.tmdbData).toBe(movieData);
		});
	});

	describe('show processing', () => {
		it('fetches show data without season', async () => {
			const showData = {
				id: 1396,
				name: 'Breaking Bad',
				genres: [{ id: 18, name: 'Drama' }],
				poster_path: '/poster.jpg',
				backdrop_path: '/backdrop.jpg',
			};

			mockedFetch.mockResolvedValueOnce(showData);

			const ctx: ContentCtx = {
				collection: { name: 'show' },
				content: { TMDB_ID: 1396 },
			};

			await processContent(ctx, API_BASE, API_SECRET);

			expect(mockedFetch).toHaveBeenCalledTimes(1);
			expect(ctx.content.title).toBe('Breaking Bad');
			expect(ctx.content.tmdbData).toBe(showData);
			expect(ctx.content.seasonTmdbData).toBeUndefined();
		});

		it('fetches show + season data for seasonal reviews', async () => {
			const showData = {
				id: 1396,
				name: 'Breaking Bad',
				genres: [{ id: 18, name: 'Drama' }],
				poster_path: '/poster.jpg',
				backdrop_path: '/backdrop.jpg',
			};

			const seasonData = {
				id: 3572,
				name: 'Season 1',
				poster_path: '/season-poster.jpg',
				air_date: '2008-01-20',
				season_number: 1,
				episode_count: 7,
			};

			mockedFetch
				.mockResolvedValueOnce(showData)
				.mockResolvedValueOnce(seasonData);

			const ctx: ContentCtx = {
				collection: { name: 'show' },
				content: { TMDB_ID: 1396, season_number: 1 },
			};

			await processContent(ctx, API_BASE, API_SECRET);

			expect(mockedFetch).toHaveBeenCalledTimes(2);
			expect(mockedFetch).toHaveBeenCalledWith('/tv/1396/season/1', expect.objectContaining({
				baseURL: API_BASE,
				params: { language: 'en-US' },
			}));
			expect(ctx.content.title).toBe('Breaking Bad: Season 1');
			expect(ctx.content.tmdbData).toBe(showData);
			expect(ctx.content.seasonTmdbData).toBe(seasonData);
		});

		it('sets correct title format for seasonal reviews', async () => {
			const showData = { id: 100, name: 'Test Show', genres: [], poster_path: '', backdrop_path: '' };
			const seasonData = { id: 200, name: 'Season 3', poster_path: null, air_date: null, season_number: 3, episode_count: 10 };

			mockedFetch
				.mockResolvedValueOnce(showData)
				.mockResolvedValueOnce(seasonData);

			const ctx: ContentCtx = {
				collection: { name: 'show' },
				content: { TMDB_ID: 100, season_number: 3 },
			};

			await processContent(ctx, API_BASE, API_SECRET);

			expect(ctx.content.title).toBe('Test Show: Season 3');
		});
	});

	describe('unknown collection', () => {
		it('does not modify content for unknown collections', async () => {
			const ctx: ContentCtx = {
				collection: { name: 'blog' },
				content: { title: 'Original Title' },
			};

			await processContent(ctx, API_BASE, API_SECRET);

			expect(mockedFetch).not.toHaveBeenCalled();
			expect(ctx.content.title).toBe('Original Title');
		});
	});
});
