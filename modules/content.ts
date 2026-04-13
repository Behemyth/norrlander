import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule, useRuntimeConfig } from '@nuxt/kit';

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

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		const config = useRuntimeConfig();

		// Skip TMDB fetching in test environment or when API credentials are not configured
		const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
		const hasApiCredentials = Boolean(config.apiSecret && config.public.apiBase);

		if (isTestEnv) {
			return;
		}

		nuxt.hook('content:file:afterParse' as any, async (ctx: FileAfterParseHook) => {
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
						break;
					default:
				}
				return;
			}

			switch (ctx.collection.name) {
				case 'movie':
				{
					const tmdbData = await $fetch<TMDBMovie>(`/movie/${ctx.content.TMDB_ID}`, {
						baseURL: `${config.public.apiBase}`,
						params: {
							language: 'en-US',
							append_to_response: 'credits',
						},
						headers: {
							Authorization: `Bearer ${config.apiSecret}`,
						},

					});

					ctx.content.title = tmdbData.title;
					if (tmdbData.credits) {
						tmdbData.credits = trimCredits(tmdbData.credits);
					}
					tmdbData.poster_path = toImageSrc(tmdbData.poster_path);
					tmdbData.backdrop_path = toImageSrc(tmdbData.backdrop_path);
					ctx.content.tmdbData = tmdbData;
					ctx.content.poster_path = tmdbData.poster_path;
					break;
				}
				case 'show':
				{
					const [tmdbData, seasonTmdbData] = await Promise.all([
						$fetch<TMDBShow>(`/tv/${ctx.content.TMDB_ID}`, {
							baseURL: `${config.public.apiBase}`,
							params: {
								language: 'en-US',
								append_to_response: 'credits',
							},
							headers: {
								Authorization: `Bearer ${config.apiSecret}`,
							},
						}),
						ctx.content.season_number !== undefined
							? $fetch<TMDBSeason>(
									`/tv/${ctx.content.TMDB_ID}/season/${ctx.content.season_number}`,
									{
										baseURL: `${config.public.apiBase}`,
										params: {
											language: 'en-US',
										},
										headers: {
											Authorization: `Bearer ${config.apiSecret}`,
										},
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

					if (seasonTmdbData) {
						if (seasonTmdbData.poster_path) {
							seasonTmdbData.poster_path = toImageSrc(seasonTmdbData.poster_path);
						}
						ctx.content.seasonTmdbData = seasonTmdbData;
						ctx.content.title = `${tmdbData.name}: Season ${ctx.content.season_number}`;
						ctx.content.poster_path = seasonTmdbData.poster_path ?? tmdbData.poster_path;
					}
					else {
						ctx.content.poster_path = tmdbData.poster_path;
					}
					break;
				}
				default:
			}
		});
	},
});
