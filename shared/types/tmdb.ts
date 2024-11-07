import { z } from "zod"

export enum TMDBMediaType {
	Movie = 'movie',
	Show = 'tv'
}

export const TMDBMediaTypeSchema = z.nativeEnum(TMDBMediaType);


export const TMDBGenreSchema = z.object({
	id: z.number().int(),
	name: z.string()
  });

export type TMDBGenre = z.infer<typeof TMDBGenreSchema>;


export const TMDBMediaSchema = z.object({
	backdrop_path: z.string().url(),
	id: z.number().int(),
	title: z.string(),
	media_type: TMDBMediaTypeSchema.optional(),
	genres: z.array(TMDBGenreSchema),
	release_date: z.string().optional(),
	poster_path: z.string().url()
  });

export type TMDBMedia = z.infer<typeof TMDBMediaSchema>;
