import { z } from 'zod';
import { TMDBMovieSchema, TMDBShowSchema } from './tmdb';

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
	tmdbData: TMDBShowSchema,
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

export const ContentSchema = z.object({
	title: z.string(),
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
