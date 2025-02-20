import { z } from 'zod';

export enum TMDBMediaType {
	Movie = 'movie',
	Show = 'tv',
}

export const TMDBMediaTypeSchema = z.nativeEnum(TMDBMediaType);

export const TMDBGenreSchema = z.object({
	id: z.number().int(),
	name: z.string(),
});

export type TMDBGenre = z.infer<typeof TMDBGenreSchema>;

export const TMDBMediaSchema = z.object({
	backdrop_path: z.string(),
	id: z.number().int(),
	media_type: TMDBMediaTypeSchema.optional(),
	genres: z.array(TMDBGenreSchema),
	poster_path: z.string(),
});

export type TMDBMedia = z.infer<typeof TMDBMediaSchema>;

export const TMDBMovieSchema = TMDBMediaSchema.extend({
	title: z.string(),
	runtime: z.number().int().optional(),
	release_date: z.string().optional(),

});

export type TMDBMovie = z.infer<typeof TMDBMovieSchema>;

export const TMDBShowSchema = TMDBMediaSchema.extend({
	name: z.string(),
	first_air_date: z.string().optional(),
});

export type TMDBShow = z.infer<typeof TMDBShowSchema>;
