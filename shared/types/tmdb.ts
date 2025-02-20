import { z } from '@nuxt/content';

export enum TMDBMediaType {
	Movie = 'movie',
	Show = 'tv',
}

export const TMDBMediaTypeSchema = z.nativeEnum(TMDBMediaType);

export const TMDBGenreSchema = z.object({
	id: z.number().int(),
	name: z.string(),
});

export const TMDBMediaSchema = z.object({
	backdrop_path: z.string(),
	id: z.number().int(),
	media_type: TMDBMediaTypeSchema.optional(),
	genres: z.array(TMDBGenreSchema),
	poster_path: z.string(),
});

export const TMDBMovieSchema = TMDBMediaSchema.extend({
	title: z.string(),
	runtime: z.number().int().optional(),
	release_date: z.string().optional(),
});

export const TMDBShowSchema = TMDBMediaSchema.extend({
	name: z.string(),
	first_air_date: z.string().optional(),
});
