import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const ReviewMetadataSchema = z.object({
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

export default defineContentConfig({
	collections: {
		contact: defineCollection({
			type: 'data',
			source: 'data/contact/*.json',
			schema: z.object({
				name: z.string(),
				icon: z.string(),
				link: z.string().url(),
			}),
		}),
		socials: defineCollection({
			type: 'data',
			source: 'data/socials/*.json',
			schema: z.object({
				name: z.string(),
				icon: z.string(),
				link: z.string().url(),
			}),
		}),
		movie: defineCollection({
			type: 'page',
			source: 'review/movie/**/*.md',
			schema: ReviewMetadataSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: 'review/show/**/*.md',
			schema: ReviewMetadataSchema,
		}),
	},
});
