import { defineContentConfig, defineCollection, z } from '@nuxt/content';

const ReviewMetadataSchema = z.object({
	intRating: z.number().int().nonnegative().lte(8),
	entRating: z.number().int().nonnegative().lte(8),
	rating: z.number().int().nonnegative().lte(8),
	description: z.string(),
	TMDB_ID: z.number().int(),
	date_published: z.coerce.date(),
	date_modified: z.coerce.date(),
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
		all: defineCollection({
			type: 'page',
			source: '**',
			exclude: 'data',
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
			schema: ReviewMetadataSchema,
		}),
		show: defineCollection({
			type: 'page',
			source: 'review/show/**/*.md',
			schema: ReviewMetadataSchema,
		}),
	},
});
