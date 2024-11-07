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
	_path: z.string(),
	title: z.string(),
	description: z.string(),
	TMDB_ID: z.number().int(),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
  });

export type ReviewMetadata = z.infer<typeof ReviewMetadataSchema>;
