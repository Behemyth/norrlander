import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule, useRuntimeConfig } from '@nuxt/kit';

import { $fetch } from 'ofetch';

import type { TMDBMovie, TMDBShow, TMDBSeason } from '~~/shared/types/tmdb';

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		const config = useRuntimeConfig();

		// Skip TMDB fetching in test environment or when API credentials are not configured
		const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
		const hasApiCredentials = Boolean(config.apiSecret && config.public.apiBase);

		if (isTestEnv || !hasApiCredentials) {
			return;
		}

		nuxt.addHooks({ async 'content:file:afterParse'(ctx: FileAfterParseHook) {
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
					ctx.content.tmdbData = tmdbData;
					break;
				}
				case 'show':
				{
					const tmdbData = await $fetch<TMDBShow>(`/tv/${ctx.content.TMDB_ID}`, {
						baseURL: `${config.public.apiBase}`,
						params: {
							language: 'en-US',
							append_to_response: 'credits',
						},
						headers: {
							Authorization: `Bearer ${config.apiSecret}`,
						},
					});

					ctx.content.title = tmdbData.name;
					ctx.content.tmdbData = tmdbData;

					// Fetch season-specific data if this is a seasonal review
					if (ctx.content.season_number !== undefined) {
						const seasonTmdbData = await $fetch<TMDBSeason>(
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
						);

						ctx.content.seasonTmdbData = seasonTmdbData;
						// Append season number to title for clarity
						ctx.content.title = `${tmdbData.name}: Season ${ctx.content.season_number}`;
					}
					break;
				}
				default:
			}
		},
		});
	},
});
