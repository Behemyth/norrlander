import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule } from '@nuxt/kit';

import { $fetch } from 'ofetch';

import type { TMDBMovie, TMDBShow, TMDBSeason, TMDBCredits } from '~~/shared/types/tmdb';

const KEPT_CREW_JOBS = ['Director', 'Screenplay', 'Writer', 'Story'];

/**
 * Trim credits to only the data the UI needs:
 * - Top 10 cast by billing order, without profile_path
 * - Only Director/Writer/Screenplay/Story crew, without profile_path
 */
function trimCredits(credits: TMDBCredits): TMDBCredits {
	return {
		cast: credits.cast
			.sort((a, b) => a.order - b.order)
			.slice(0, 10)
			.map(({ profile_path: _, ...rest }) => rest),
		crew: credits.crew
			.filter(m => KEPT_CREW_JOBS.includes(m.job))
			.map(({ profile_path: _, ...rest }) => rest),
	};
}

/**
 * Prefix a TMDB image path so NuxtImg resolves it via the `tmdb` alias.
 */
function toImageSrc(path: string): string {
	return `tmdb${path}`;
}

/**
 * Extract the 4-digit year from a TMDB date string (YYYY-MM-DD). Returns
 * `undefined` when the date is missing or malformed so the consumer can omit
 * the field entirely.
 */
function yearFromTmdbDate(dateStr: string | undefined | null): number | undefined {
	if (!dateStr) return undefined;
	const d = new Date(dateStr);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.getFullYear();
}

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		// Skip TMDB fetching in test environment
		const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

		if (isTestEnv) {
			return;
		}

		nuxt.hook('content:file:afterParse' as any, async (ctx: FileAfterParseHook) => {
			// Read env at hook-invocation time
			const apiSecret = process.env.NUXT_API_SECRET ?? '';
			const apiBase = process.env.NUXT_PUBLIC_API_BASE ?? '';
			const hasApiCredentials = Boolean(apiSecret && apiBase);
			if (!hasApiCredentials) {
				// Stub minimal data so the layout renders with placeholders
				switch (ctx.collection.name) {
					case 'movie':
						ctx.content.tmdbData = {
							backdrop_path: '/images/placeholder-backdrop.svg',
							id: Number(ctx.content.TMDB_ID),
							genres: [],
							poster_path: '/images/placeholder-poster.svg',
							title: String(ctx.content.title || `Movie ${ctx.content.TMDB_ID}`),
						} satisfies TMDBMovie;
						ctx.content.poster_path = '/images/placeholder-poster.svg';
						ctx.content.backdrop_path = '/images/placeholder-backdrop.svg';
						ctx.content.genres = [];
						break;
					case 'show':
						ctx.content.tmdbData = {
							backdrop_path: '/images/placeholder-backdrop.svg',
							id: Number(ctx.content.TMDB_ID),
							genres: [],
							poster_path: '/images/placeholder-poster.svg',
							name: String(ctx.content.title || `Show ${ctx.content.TMDB_ID}`),
						} satisfies TMDBShow;
						ctx.content.poster_path = '/images/placeholder-poster.svg';
						ctx.content.backdrop_path = '/images/placeholder-backdrop.svg';
						ctx.content.genres = [];
						break;
					default:
				}
				return;
			}

			switch (ctx.collection.name) {
				case 'movie':
				{
					const tmdbData = await $fetch<TMDBMovie>(`/movie/${ctx.content.TMDB_ID}`, {
						baseURL: `${apiBase}`,
						params: {
							language: 'en-US',
							append_to_response: 'credits',
						},
						headers: {
							Authorization: `Bearer ${apiSecret}`,
						},
						retry: 5,
						retryDelay: 500,
						retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
					});

					ctx.content.title = tmdbData.title;
					if (tmdbData.credits) {
						tmdbData.credits = trimCredits(tmdbData.credits);
					}
					tmdbData.poster_path = toImageSrc(tmdbData.poster_path);
					tmdbData.backdrop_path = toImageSrc(tmdbData.backdrop_path);
					ctx.content.tmdbData = tmdbData;
					ctx.content.poster_path = tmdbData.poster_path;
					ctx.content.backdrop_path = tmdbData.backdrop_path;
					ctx.content.genres = (tmdbData.genres ?? []).map(g => g.name);
					const movieYear = yearFromTmdbDate(tmdbData.release_date);
					if (movieYear !== undefined) ctx.content.release_year = movieYear;
					break;
				}
				case 'show':
				{
					const [tmdbData, seasonTmdbData] = await Promise.all([
						$fetch<TMDBShow>(`/tv/${ctx.content.TMDB_ID}`, {
							baseURL: `${apiBase}`,
							params: {
								language: 'en-US',
								append_to_response: 'credits',
							},
							headers: {
								Authorization: `Bearer ${apiSecret}`,
							},
							retry: 5,
							retryDelay: 500,
							retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
						}),
						ctx.content.season_number !== undefined
							? $fetch<TMDBSeason>(
									`/tv/${ctx.content.TMDB_ID}/season/${ctx.content.season_number}`,
									{
										baseURL: `${apiBase}`,
										params: {
											language: 'en-US',
										},
										headers: {
											Authorization: `Bearer ${apiSecret}`,
										},
										retry: 5,
										retryDelay: 500,
										retryStatusCodes: [408, 425, 429, 500, 502, 503, 504],
									},
								)
							: Promise.resolve(undefined),
					]);

					ctx.content.title = tmdbData.name;
					if (tmdbData.credits) {
						tmdbData.credits = trimCredits(tmdbData.credits);
					}
					tmdbData.poster_path = toImageSrc(tmdbData.poster_path);
					tmdbData.backdrop_path = toImageSrc(tmdbData.backdrop_path);
					ctx.content.tmdbData = tmdbData;
					ctx.content.backdrop_path = tmdbData.backdrop_path;
					ctx.content.genres = (tmdbData.genres ?? []).map(g => g.name);

					if (seasonTmdbData) {
						if (seasonTmdbData.poster_path) {
							seasonTmdbData.poster_path = toImageSrc(seasonTmdbData.poster_path);
						}
						ctx.content.seasonTmdbData = seasonTmdbData;
						ctx.content.title = `${tmdbData.name}: Season ${ctx.content.season_number}`;
						ctx.content.poster_path = seasonTmdbData.poster_path ?? tmdbData.poster_path;
						const seasonYear = yearFromTmdbDate(seasonTmdbData.air_date);
						if (seasonYear !== undefined) ctx.content.release_year = seasonYear;
					}
					else {
						ctx.content.poster_path = tmdbData.poster_path;
					}
					if (ctx.content.release_year === undefined) {
						const showYear = yearFromTmdbDate(tmdbData.first_air_date);
						if (showYear !== undefined) ctx.content.release_year = showYear;
					}
					break;
				}
				default:
			}
		});
	},
});
