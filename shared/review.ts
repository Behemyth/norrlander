import { z } from "zod"

export enum MediaType {
	Movie = 'movie',
	Show = 'show'
}

export interface ReviewMetadata {
	intRating: number,
	entRating: number,
	rating: number
	path: string
	title: string
	description: string
	TMDB_ID: number
	date_published: string
	date_modified: string
}


export const MetaDataSchema = z.object({
	socials: z.array(SocialSchema),
	contacts: z.array(SocialSchema)
  });

export type MetaData = z.infer<typeof SocialSchema>;

