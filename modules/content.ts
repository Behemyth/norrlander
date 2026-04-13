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

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		const config = useRuntimeConfig();

		// Skip TMDB fetching in test environment or when API credentials are not configured
		const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
		const hasApiCredentials = Boolean(config.apiSecret && config.public.apiBase);

		if (isTestEnv || !hasApiCredentials) {
			return;
		}

		nuxt.hook('content:file:afterParse' as any, async (ctx: FileAfterParseHook) => {
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
					ctx.content.tmdbData = tmdbData;
					break;
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
					ctx.content.tmdbData = tmdbData;

					if (seasonTmdbData) {
						ctx.content.seasonTmdbData = seasonTmdbData;
						ctx.content.title = `${tmdbData.name}: Season ${ctx.content.season_number}`;
					}
					break;
				}
				default:
			}
		});
	},
});
