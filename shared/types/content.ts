import { z } from 'zod';
import { TMDBMovieSchema, TMDBShowSchema, TMDBSeasonSchema } from './tmdb';

/**
 * @brief A schema that should be applied to all pages. When using `queryCollection`
 * 	with a `keyof PageCollections`, the result will always contain this information
 * 	(except ContentSchema, which we have to assert for at its use)
 */
export const PageSchema = z.object({
	title: z.string(),
	description: z.string(),
	draft: z.boolean().default(false),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
});

/**
 * @brief The base schema for all review types
 */
export const ReviewMetadataSchema = PageSchema.extend({
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	TMDB_ID: z.number().int(),
	poster_path: z.string().optional(),
	// Denormalized from TMDB at build time so `ReviewGridFilter` can
	// `.select()` tiny scalars instead of the full `tmdbData` / `seasonTmdbData`
	// objects.
	genres: z.array(z.string()).optional().default([]),
	release_year: z.number().int().optional(),
});

/**
 * @brief Base schema for data collections
 */
export const BaseDataSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
	description: z.string(),
});

// --- Everything below here is a schema specifically for each collection ---

// Page collections schemas

export const ReviewMovieSchema = ReviewMetadataSchema.extend({
	tmdbData: TMDBMovieSchema,
});

export const ReviewShowSchema = ReviewMetadataSchema.extend({
	season_number: z.number().int().optional(),
	tmdbData: TMDBShowSchema,
	seasonTmdbData: TMDBSeasonSchema.optional(),
});

export const PhotographySchema = PageSchema.extend({
	images: z.array(z.object({
		src: z.string(),
		alt: z.string().optional(),
		width: z.number().optional(),
		height: z.number().optional(),
		sizes: z.string().optional(),
		densities: z.string().optional(),
	})).default([]),
});

export const BlogSchema = PageSchema;

export const AcademicSchema = PageSchema.extend({
	degree: z.string(),
	location: z.string(),
	start_date: z.coerce.date(),
	end_date: z.coerce.date().optional(),
	link: z.string().url(),
});

export const ProjectSchema = PageSchema.extend({
	link: z.string().url(),
	image: z.string(),
});

export const JobSchema = PageSchema.extend({
	position: z.string(),
	location: z.string(),
	description: z.string(),
	tags: z.array(z.string()).default([]),
	achievements: z.array(z.string()).default([]),
	start_date: z.coerce.date(),
	end_date: z.coerce.date().optional(),
	link: z.string().url(),
});

export const LinkSchema = z.object({
	label: z.string(),
	icon: z.string().optional(),
	to: z.string().optional(),
	target: z.enum(['_self', '_blank', '_parent', '_top']).optional(),
	external: z.boolean().default(false),
});

export const ContentSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	headline: z.string().optional(),
	links: z.array(LinkSchema).default([]),
	feed: z.string().optional(),
});

// Data collections schemas

export const ContactSchema = BaseDataSchema;
export const SocialSchema = BaseDataSchema;
export const CommunitySchema = BaseDataSchema;

export const LocationSchema = z.object({
	location: z.string(),
	start_year: z.number().int().nonnegative(),
	end_year: z.number().int().nonnegative().optional(),
});

// TypeScript types derived from schemas

/**
 * Base interface for all review types
 */
export type BaseReview = z.infer<typeof ReviewMetadataSchema>;
