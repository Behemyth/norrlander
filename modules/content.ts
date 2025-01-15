import type { FileAfterParseHook } from '@nuxt/content';

import { defineNuxtModule } from '@nuxt/kit';

import { useFetch } from '#app/composables/fetch';

export default defineNuxtModule({
	hooks: {
		async 'content:file:afterParse'(ctx: FileAfterParseHook) {
			switch (ctx.collection.name) {
				case 'movie':
				{
					const { data: tmdbData } = await useFetch<TMDBMovie>(`/api/tmdb/media/movie/${ctx.content.TMDB_ID}`);
					ctx.content.title = tmdbData.value?.title;
					ctx.content.tmdbData = tmdbData;
					break;
				}
				case 'show':
				{
					const { data: tmdbData } = await useFetch<TMDBShow>(`/api/tmdb/media/tv/${ctx.content.TMDB_ID}`);
					ctx.content.title = tmdbData.value?.name;
					ctx.content.tmdbData = tmdbData;
					break;
				}
				default:
			}
		},
	},
});
