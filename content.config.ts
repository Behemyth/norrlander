import { defineContentConfig, defineCollection } from '@nuxt/content';

import { ReviewMetadataSchema } from './shared/types/review';

export default defineContentConfig({
	collections: {

		contact: defineCollection({
			type: 'data',
			source: 'data/contact/*.json',
			schema: ,
		}),
		socials: defineCollection({
			type: 'data',
			source: 'data/socials/*.json',
			schema: ,
		}),
		navigation: defineCollection({
			type: 'data',
			source: 'data/navigation/*.json',
			schema: ,
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
