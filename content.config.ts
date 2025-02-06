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

const ContentSchema = z.object({
	title: z.string(),
});

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
		blog: defineCollection({
			type: 'page',
			source: {
				include: 'blog/*.md',
				exclude: ['blog/index.md'],
			},
			schema: BlogSchema,
		}),
		photography: defineCollection({
			type: 'page',
			source: {
				include: 'photography/*.md',
				exclude: ['photography/index.md'],
			},
			schema: PhotographySchema,
		}),
		career: defineCollection({
			type: 'page',
			source: {
				include: 'portfolio/career/*.md',
				exclude: ['portfolio/career/index.md'],
			},
			schema: JobSchema,
		}),
		project: defineCollection({
			type: 'page',
			source: {
				include: 'portfolio/project/*.md',
				exclude: ['portfolio/project/index.md'],
			},
			schema: ProjectSchema,
		}),
		movie: defineCollection({
			type: 'page',
			source: {
				include: 'review/movie/*.md',
				exclude: ['review/movie/index.md'],
			},
			schema: ReviewMovieSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: {
				include: 'review/show/*.md',
				exclude: ['review/show/index.md'],
			},
			schema: ReviewShowSchema,
		}),
		content: defineCollection({
			type: 'page',
			source: [
				{
					include: '**/index.md',
				},
				{
					include: 'about.md',
				},
				{
					include: 'contact.md',
				},
			],
			schema: ContentSchema,
		}),
	},
});
