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

// Credits schemas for cast and crew
export const TMDBCastMemberSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	character: z.string(),
	profile_path: z.string().nullable().optional(),
	order: z.number().int(),
});

export type TMDBCastMember = z.infer<typeof TMDBCastMemberSchema>;

export const TMDBCrewMemberSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	job: z.string(),
	department: z.string(),
	profile_path: z.string().nullable().optional(),
});

export type TMDBCrewMember = z.infer<typeof TMDBCrewMemberSchema>;

export const TMDBCreditsSchema = z.object({
	cast: z.array(TMDBCastMemberSchema),
	crew: z.array(TMDBCrewMemberSchema),
});

export type TMDBCredits = z.infer<typeof TMDBCreditsSchema>;

// Show creator schema
export const TMDBCreatorSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	profile_path: z.string().nullable(),
});

export type TMDBCreator = z.infer<typeof TMDBCreatorSchema>;

export const TMDBMediaSchema = z.object({
	backdrop_path: z.string(),
	id: z.number().int(),
	media_type: TMDBMediaTypeSchema.optional(),
	genres: z.array(TMDBGenreSchema),
	poster_path: z.string(),
	credits: TMDBCreditsSchema.optional(),
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
	created_by: z.array(TMDBCreatorSchema).optional(),
	number_of_seasons: z.number().int().optional(),
	number_of_episodes: z.number().int().optional(),
});

export type TMDBShow = z.infer<typeof TMDBShowSchema>;

// Season-specific schema for when reviewing individual seasons
export const TMDBSeasonSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	overview: z.string().optional(),
	poster_path: z.string().nullable(),
	air_date: z.string().nullable(),
	season_number: z.number().int(),
	episode_count: z.number().int().optional(),
	vote_average: z.number().optional(),
});

export type TMDBSeason = z.infer<typeof TMDBSeasonSchema>;
