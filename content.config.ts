import { defineContentConfig, defineCollection, z } from '@nuxt/content';

import { TMDBMovieSchema, TMDBShowSchema } from './shared/types/tmdb';

/**
 * @brief A schema that should be applied to all pages. When using `queryCollection`
 * 	with a `keyof PageCollections`, the result will always contain this information
 */
const PageSchema = z.object({
	title: z.string(),
	description: z.string(),
	published: z.boolean().optional().default(false),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
});

/**
 * @brief A schema for all data feeds that will be used for RSS-like services
 */
const FeedSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.string(),
});

/**
 * @brief The base schema for all review types
 */
const ReviewMetadataSchema = PageSchema.extend({
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	TMDB_ID: z.number().int(),
});

// --- Everything below here is a schema specifically for each collection ---

// Page collections schemas

const ReviewMovieSchema = ReviewMetadataSchema.extend({
	tmdbData: TMDBMovieSchema,
});

const ReviewShowSchema = ReviewMetadataSchema.extend({
	tmdbData: TMDBShowSchema,
});

const PhotographySchema = PageSchema.extend({
	title: z.string(),
});

const BlogSchema = PageSchema.extend({
	title: z.string(),
});

const ProjectSchema = PageSchema.extend({
	title: z.string(),
	link: z.string().url(),
});

const JobSchema = PageSchema.extend({
	title: z.string(),
	link: z.string().url(),
});

const ContentSchema = PageSchema.extend({
	title: z.string(),
});

// Data collections schemas

const ContactSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
});

const SocialSchema = z.object({
	name: z.string(),
	icon: z.string(),
	link: z.string().url(),
});

// Collection definitions

export default defineContentConfig({
	collections: {
		feed: defineCollection({
			type: 'data',
			source: 'data/feed/*.json',
			schema: FeedSchema,
		}),
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
		content: defineCollection({
			type: 'page',
			source:
				{
					include: '**/*.md',
					exclude: [
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
	},
});
