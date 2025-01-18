import { defineContentConfig, defineCollection, z } from '@nuxt/content';

import { TMDBMovieSchema, TMDBShowSchema } from './shared/types/tmdb';

const ReviewMetadataSchema = z.object({
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	TMDB_ID: z.number().int(),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
});

const ReviewMovieSchema = ReviewMetadataSchema.extend({
	tmdbData: TMDBMovieSchema,
});

const ReviewShowSchema = ReviewMetadataSchema.extend({
	tmdbData: TMDBShowSchema,
});

const PhotographySchema = z.object({
	name: z.string(),
});

const BlogSchema = z.object({
	name: z.string(),
});

const ProjectSchema = z.object({
	name: z.string(),
	link: z.string().url(),
});

const JobSchema = z.object({
	name: z.string(),
	link: z.string().url(),
});

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

export default defineContentConfig({
	collections: {
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
		career: defineCollection({
			type: 'page',
			source: 'portfolio/career/**/*.md',
			schema: JobSchema,
		}),
		project: defineCollection({
			type: 'page',
			source: 'portfolio/project/**/*.md',
			schema: ProjectSchema,
		}),
		movie: defineCollection({
			type: 'page',
			source: 'review/movie/**/*.md',
			schema: ReviewMovieSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: 'review/show/**/*.md',
			schema: ReviewShowSchema,
		}),
		page: defineCollection({
			type: 'page',
			source: 'page/**/*.md',
		}),
	},
});
