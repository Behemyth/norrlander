import { defineContentConfig, defineCollection, z } from '@nuxt/content';

import { asSitemapCollection } from '@nuxtjs/sitemap/content';
import { TMDBMovieSchema, TMDBShowSchema } from './shared/types/tmdb';
/**
 * @brief A schema that should be applied to all pages. When using `queryCollection`
 * 	with a `keyof PageCollections`, the result will always contain this information
 * 	(except ContentSchema, which we have to assert for at its use)
 */
const PageSchema = z.object({
	title: z.string(),
	description: z.string(),
	published: z.boolean().optional().default(false),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
});

/**
 * @brief The base schema for all review types
 */
const ReviewMetadataSchema = z.object({
	...PageSchema.shape,
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	TMDB_ID: z.number().int(),
});

// --- Everything below here is a schema specifically for each collection ---

// Page collections schemas

const ReviewMovieSchema = z.object({
	...ReviewMetadataSchema.shape,
	tmdbData: TMDBMovieSchema,
});

const ReviewShowSchema = z.object({
	...ReviewMetadataSchema.shape,
	tmdbData: TMDBShowSchema,
});

const PhotographySchema = z.object({
	...PageSchema.shape,
	title: z.string(),
});

const BlogSchema = z.object({
	...PageSchema.shape,
	title: z.string(),
});

const ProjectSchema = z.object({
	...PageSchema.shape, // Required for server type handling
	title: z.string(),
	link: z.string().url(),
});

const JobSchema = z.object({
	...PageSchema.shape, // Required for server type handling
	title: z.string(),
	position: z.string(),
	location: z.string(),
	description: z.string(),
	tags: z.array(z.string()).optional().default([]),
	achievements: z.array(z.string()).optional().default([]),
	start_date: z.coerce.date(),
	end_date: z.coerce.date().optional(),
	link: z.string().url(),
});

const ContentSchema = z.object({
	title: z.string(),
	feed: z.string().optional(),
});

// Data collections schemas

const ContactSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
	description: z.string(),
});

const SocialSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
	description: z.string(),
});

const LocationSchema = z.object({
	location: z.string(),
	start_year: z.number().int().nonnegative(),
	end_year: z.number().int().nonnegative().optional(),
});

const CommunitySchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
	description: z.string(),
});

// Collection definitions

export default defineContentConfig({
	collections: {
		contact: defineCollection({
			type: 'data',
			source: 'data/contact/*.json',
			schema: ContactSchema,
		}),
		socials: defineCollection({
			type: 'data',
			source: 'data/socials/*.json',
			schema: SocialSchema,
		}),
		locations: defineCollection({
			type: 'data',
			source: 'data/locations/*.json',
			schema: LocationSchema,
		}),
		communities: defineCollection({
			type: 'data',
			source: 'data/community/*.json',
			schema: CommunitySchema,
		}),
		blog: defineCollection({
			type: 'page',
			source: 'blog/*.md',
			schema: BlogSchema,
		}),
		photography: defineCollection({
			type: 'page',
			source: 'photography/*.md',
			schema: PhotographySchema,
		}),
		career: defineCollection({
			type: 'page',
			source: 'portfolio/career/*.md',
			schema: JobSchema,
		}),
		project: defineCollection({
			type: 'page',
			source: 'portfolio/project/*.md',
			schema: ProjectSchema,
		}),
		movie: defineCollection({
			type: 'page',
			source: 'review/movie/*.md',
			schema: ReviewMovieSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: 'review/show/*.md',
			schema: ReviewShowSchema,
		}),
		content: defineCollection(
			asSitemapCollection({
				type: 'page',
				source:
				{
					include: '**/*.md',
					exclude: [
						'data/**',
						'blog/*.md',
						'photography/*.md',
						'portfolio/career/*.md',
						'portfolio/project/*.md',
						'review/movie/*.md',
						'review/show/*.md',
					],
				},
				schema: ContentSchema,
			}),
		),
	},
});
