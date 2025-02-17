import { defineContentConfig, defineCollection, z } from '@nuxt/content';

import { TMDBMovieSchema, TMDBShowSchema } from './shared/types/tmdb';

const PageSchema = z.object({
	title: z.string(),
	publish: z.boolean().optional().default(false),
});

const FeedSchema = z.object({
	title: z.string(),
	description: z.string(),
});

const ReviewMetadataSchema = PageSchema.extend({
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

const PhotographySchema = PageSchema.extend({
	name: z.string(),
});

const BlogSchema = PageSchema.extend({
	name: z.string(),
});

const ProjectSchema = PageSchema.extend({
	name: z.string(),
	link: z.string().url(),
});

const JobSchema = PageSchema.extend({
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
