import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule, useRuntimeConfig } from '@nuxt/kit';

import { $fetch } from 'ofetch';

export default defineNuxtModule({
	setup(resolvedOptions, nuxt) {
		const config = useRuntimeConfig();

		nuxt.addHooks({ async 'content:file:afterParse'(ctx: FileAfterParseHook) {
			switch (ctx.collection.name) {
				case 'movie':
				{
					const tmdbData = await $fetch<TMDBMovie>(`/movie/${ctx.content.TMDB_ID}`, {
						baseURL: `${config.public.apiBase}`,
						params: {
							language: 'en-US',
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
						},
						headers: {
							Authorization: `Bearer ${config.apiSecret}`,
						},
					});

					ctx.content.title = tmdbData.name;
					ctx.content.tmdbData = tmdbData;
					break;
				}
				default:
			}
		},
		});
	},
});
