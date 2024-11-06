import { z } from "zod"

export enum ReviewMediaType {
	Movie = 'movie',
	Show = 'show'
}

export const ReviewMediaTypeSchema = z.nativeEnum(ReviewMediaType);

export const ReviewMetadataSchema = z.object({
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	path: z.string().url(),
	title: z.string(),
	description: z.string(),
	TMDB_ID: z.number().int(),
	date_published: z.string().date(),
	date_modified: z.string().date(),
  });

export type ReviewMetadata = z.infer<typeof ReviewMetadataSchema>;
